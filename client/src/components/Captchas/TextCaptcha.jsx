import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

class TextCaptcha extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      captchaImgSrc: '',
      answer: '',
    };
  }

  // Function to handle submitting the captcha answer

  // On component mounting, randomly initialize states
  componentDidMount () {
    // Get random text captcha from the server
    axios.get('./ketchup/textCaptcha')
      .then((results) => {
        console.log(results);
        this.setState({captchaImgSrc: results.data.url, answer: results.data.answer})
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render () {
    return (
      <div>
        Text Captcha Goes here.
        <img src={this.state.captchaImgSrc} />
      </div>
    );
  }
}

export default TextCaptcha;