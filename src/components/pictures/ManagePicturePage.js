import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import toastr from 'toastr';
import moment from 'moment';

import * as pictureActions from '../../actions/pictureActions';
import PictureForm from './PictureForm';


export class ManagePicturePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      picture: Object.assign({}, this.props.picture),
      errors: {},
      saving: false
    };
 
    this.savePicture = this.savePicture.bind(this);
    this.updatePictureState = this.updatePictureState.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.picture.pictureId != nextProps.picture.pictureId) {
      // Necessary to populate form when existing picture is loaded directly.
      this.setState({picture: Object.assign({}, nextProps.picture)});
    }
  }

  updatePictureState(event) {
    // TODO TZ - remove debugging code.
    toastr.success('updatePictureState');
    
    const field = event.target.name;
    let picture = this.state.picture;
    picture[field] = event.target.value;
    return this.setState({picture: picture});
  }

  pictureFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.picture.name.length < 5) {
      errors.name = 'Name must be at least 5 characters.';
      formIsValid = false;
    }

    if (!(moment(this.state.picture.dateTime, 'MM/DD/YYYY', true).isValid()))
    {
      // TODO TZ do we need better name than 'DateTime'  (PictureDate?)?!?
      errors.dateTime = 'DateTime is not valid.';
      formIsValid = false;
    }
    this.setState({errors: errors});
    return formIsValid;
  }

  savePicture(event) {
    event.preventDefault();
    if (!this.pictureFormIsValid()) {
      return;
    }

    this.setState({saving: true});
    this.props.actions.savePicture(this.state.picture)
      .then(() => { 
        this.redirect();
      })
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

  redirect() {
    this.setState({saving: false});
    toastr.success('Picture saved.');
    this.context.router.push('/tripview/1');
  }

  render() {
    return (
      <PictureForm
        picture={this.state.picture}
        onChange={this.updatePictureState}
        onSave={this.savePicture}
        errors={this.state.errors}
        saving={this.state.saving}
      />
    );
  }
}

ManagePicturePage.propTypes = {
  picture: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router.
ManagePicturePage.contextTypes = {
  router: PropTypes.object
};

function getPictureById(pictures, pictureId) {
  const picture = pictures.filter(picture => picture.pictureId == pictureId);
  if (picture) return picture[0]; //since filter returns an array, have to grab the first.
  return null;
}

function mapStateToProps(state, ownProps) {
  const pictureId = ownProps.params.id; // from the path `/picture/:id`

  let picture = {id: '', title: '' };

  if (pictureId && state.pictures.length > 0) {
    picture = getPictureById(state.pictures, pictureId);
  }

  return {
    picture: picture
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(pictureActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagePicturePage);