import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import IncorrectMessage from '../IncorrectCaptchaMessage.jsx';

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
      // Increase the score by 1
      this.props.increaseScore(1);
      // First 5 points are all from text captchas
      if (this.props.currentScore < 5) {
        // Refresh the text component with new data
        this.refreshComponent();
      // After scoring the 5th point, proceed to stage 2
      } else if (this.props.currentScore === 5) {
        this.props.changeStage(2);
      // After 15 points, change stage to 2, 3, or 4
      } else if (this.props.currentScore > 15) {
        let nextStage = Math.ceil(Math.random() * 3);
        if (nextStage === 1) {
          this.refreshComponent();
        } else {
          this.props.changeStage(nextStage);
        }
      }
      // this.setState({gotWrong: false});
    } else {
      this.setState({gotWrong: true});
    }
  }

  // Function to refresh the component with new data
  refreshComponent () {
    // Get random text captcha from the server
    axios.get('./ketchup/textCaptcha')
      .then((results) => {
        console.log(results);
        this.setState({captchaImgSrc: results.data.url, answer: results.data.answer, value: '', gotWrong: false})
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // On component mounting, randomly initialize states
  componentDidMount () {
   this.refreshComponent();
  }

  render () {
    return (
      <TextCaptchaContainer>
        {this.state.gotWrong && <IncorrectMessage />}
        <CaptchaImage src={this.state.captchaImgSrc} />
        <BottomContainer>
          <AnswerInputContainer>
            <AnswerInputLabel>Type the characters you see in the picture:</AnswerInputLabel>
            <AnswerInputField type="text" value={this.state.value} onChange={this.handleChange.bind(this)} />
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