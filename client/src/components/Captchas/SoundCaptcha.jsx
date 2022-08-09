import React from 'react';
import styled from 'styled-components';

class SoundCaptcha extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      captcha: '',
      answer: '',
    };
  }

  // Function to handle submitting the captcha answer

  render () {
    return (
      <div>
        Sound Captcha Goes here.
      </div>
    );
  }
}

export default SoundCaptcha;