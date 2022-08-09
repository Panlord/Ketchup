import React from 'react';
import styled from 'styled-components';

class ImageCaptcha extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      answer: [],
      selected: [],
    };
  }

  // Function to handle submitting the captcha answer

  render () {
    return (
      <div>
        Image Captcha Goes here.
      </div>
    );
  }
}

export default ImageCaptcha;