import React from 'react';
import GoogleCaptcha from './Captchas/GoogleCaptcha.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render () {
    return (
      <div>Hello!
        <GoogleCaptcha />
      </div>
    );
  }
}

export default App;