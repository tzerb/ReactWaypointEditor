// Since the about page needs no data or actions, this doesn't
// contain the usual Redux container boilerplate
// for mapState and mapDispatch.
import React from 'react';
import  Modal from 'react-modal';
import AboutPopTest from './AboutPopTest';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
class AboutPage extends React.Component {
    constructor(props, context)
    {
        super(props, context);
    }

    render() {
        return (
            <div>
                <h1>About</h1>
                <p>This application uses React, Redux, React Router and a variety of other helpful libraries.</p>
                <AboutPopTest/>
            </div>
        );
    }
}

export default AboutPage;
