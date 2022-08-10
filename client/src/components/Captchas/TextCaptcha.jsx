import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

class TextCaptcha extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      captchaImgSrc: '',
      answer: '',
      value: '',
      gotWrong: false,
    };
  }

  // Function to handle user input into answer field of text captcha
  handleChange (event) {
    this.setState({value: event.target.value});
  }

  // Function to handle submitting the captcha answer
  handleSubmit (event) {
    event.preventDefault();
    if (this.state.value === this.state.answer) {
      // this.setState({gotWrong: false});
    } else {
      this.setState({gotWrong: true});
    }
  }

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
      <TextCaptchaContainer>
        <CaptchaImage src={this.state.captchaImgSrc} />
        <BottomContainer>
          <AnswerInputContainer>
            <AnswerInputLabel>Type the characters you see in the picture:</AnswerInputLabel>
            <AnswerInputField type="text" onChange={this.handleChange.bind(this)} />
          </AnswerInputContainer>
          <SubmitButton onClick={this.handleSubmit.bind(this)}>Submit</SubmitButton>
        </BottomContainer>
      </TextCaptchaContainer>
    );
  }
}

// Styled components
const TextCaptchaContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #8c030a;
  padding: 5px;
  width: 402px;
  border-radius: 8px;
`;
const CaptchaImage = styled.img`
  border-radius: 4px;
`;
const BottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 2px;
`;
const AnswerInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #e6d375;
  border-radius: 4px;
  padding: 4px;
  margin: 2px;
`;
const AnswerInputLabel = styled.span`

`;
const AnswerInputField = styled.input`
  border-radius: 2px;
`;
const SubmitButton = styled.button`
  border-radius: 4px;
  &:hover {
    opacity: 0.8;
  }
`;

export default TextCaptcha;