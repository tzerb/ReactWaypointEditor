import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as trackActions from '../../actions/trackActions';
import toastr from 'toastr';

export class ManageTrackPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    alert(this.props.track);

    this.state = {
      track: Object.assign({}, this.props.track),
      errors: {},
      saving: false
    };
 
    this.saveTrack = this.saveTrack.bind(this);
    this.updateTrackState = this.updateTrackState.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.track.trackId != nextProps.track.trackId) {
      // Necessary to populate form when existing track is loaded directly.
      this.setState({track: Object.assign({}, nextProps.track)});
    }
  }

  updateTrackState(event) {
    const field = event.target.name;
    let track = this.state.track;
    track[field] = event.target.value;
    return this.setState({track: track});
  }

  trackFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.track.title.length < 5) {
      errors.title = 'Title must be at least 5 characters.';
      formIsValid = false;
    }

    this.setState({errors: errors});
    return formIsValid;
  }

  saveTrack(event) {
    event.preventDefault();
    if (!this.trackFormIsValid()) {
      return;
    }

    this.setState({saving: true});
    this.props.actions.saveTrack(this.state.track)
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
    toastr.success('Track saved.');
    this.context.router.push('/tracks');
  }

  render() {
    return (
        <div>ManageTrackPage {this.track.trackId}</div>
    );
  }
}

ManageTrackPage.propTypes = {
  track: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router.
ManageTrackPage.contextTypes = {
  router: PropTypes.object
};

function getTrackById(tracks, trackId) {
  const track = tracks.filter(track => track.trackId == trackId);
  if (track) return track[0]; //since filter returns an array, have to grab the first.
  return null;
}

function mapStateToProps(state, ownProps) {
  const trackId = ownProps.params.id; // from the path `/track/:id`

  let track = {id: '', title: '' };

  if (trackId && state.tracks.length > 0) {
    track = getTrackById(state.tracks, trackId);
  }

  return {
    track: track
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(trackActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageTrackPage);