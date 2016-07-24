import React from 'react';
import { Link } from 'react-router';


export class DeepLinkingIsNotEnabled extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
        <div>Deep linking is not enabled. <br/><Link to={'/'}>Click here to start over.</Link> </div>
    );
  }
}

export default DeepLinkingIsNotEnabled;