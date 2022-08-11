import React from 'react';
import styled from 'styled-components';
import IncorrectMessage from '../IncorrectCaptchaMessage.jsx';

var msg = new SpeechSynthesisUtterance();
var voices = [];
setTimeout(() => {window.speechSynthesis.getVoices();}, 50);
var selectedVoices = [0, 10, 37, 41, 49, 50, 51, 58];
msg.volume = 0.6;
msg.rate = 1;
var wordBank = ['ligma', 'deez nutz', 'anthony', 'banana', 'apple', 'frog', 'table', 'god', 'water', 'squish', 'bottom', 'butter', 'purple', 'flower', 'dandelion', 'sidewalk', 'lightpost', 'cat', 'base', 'picture', 'hood', 'car', 'tree', 'bike', 'donkey', 'dog', 'dinosaur', 'tyrannosaurus', 'camel', 'beer', 'pikachu', 'bug', 'mosquito', 'apricot', 'hammer', 'mountain', 'coffee', 'pen', 'paper', 'shelf', 'jacket', 'spicy', 'honey', 'salty'];

class SoundCaptcha extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: '',
      voice: 0,
      pitch: 1,
      input: '',
      gotWrong: false,
    };
  }

  // Function to handle clicking the audio button
  handlePlay (event) {
    event.preventDefault();
    msg.voice = window.speechSynthesis.getVoices()[this.state.voice];
    msg.text = this.state.answer;
    msg.pitch = this.state.pitch;
    speechSynthesis.speak(msg);
  }

  // Function to handle inputs to text input field
  handleInput (event) {
    this.setState({input: event.target.value})
  }

  // Function to handle submitting the captcha answer
  handleSubmit (event) {
    event.preventDefault();
    if (this.state.answer === this.state.input) {
      this.props.increaseScore(2);
      // First 10-15 points are all from text captchas
      if (this.props.currentScore < 15) {
        // Refresh the text component with new data
        this.refreshComponent();
      // This feature is in development:
      // // After scoring the 15th point, proceed to stage 4(?)
      // } else if (this.props.currentScore === 15) {
      //   this.props.changeStage(4);
      // After 15 points, change to any stage
      } else if (this.props.currentScore > 15) {
        let nextStage = Math.ceil(Math.random() * 3);
        if (nextStage === 3) {
          this.refreshComponent();
        } else {
          this.props.changeStage(nextStage);
        }
      }
    } else {
      this.setState({gotWrong: true});
    }
  }

  // Function to reset/randomize this captcha
  refreshComponent () {
    this.setState({
      answer: wordBank[Math.floor(Math.random() * wordBank.length)],
      voice: selectedVoices[Math.floor(Math.random() * selectedVoices.length)], // voice from specifically selected voices
      pitch: Math.random() * 2,
      input: '',
      gotWrong: false,
    });
  }

  // On component mounting, check if the browser supports speech synthesis
  componentDidMount () {
    if ('speechSynthesis' in window && selectedVoices.length > 0) {
      console.log('Great! Speech synthesis is supported in your browser.');
      this.refreshComponent();
    } else {
      alert('Your browser does not support speech synthesis. Skipping this captcha.');
      this.props.changeStage(1);
    }
  }

  render () {
    return (
      <SoundCaptchaWrapper onSubmit={this.handleSubmit.bind(this)} >
        {this.state.gotWrong && <IncorrectMessage />}
        Play the audio and enter the word.
        <AudioPlay type="button" onClick={this.handlePlay.bind(this)}>Speak</AudioPlay>
        <TextInput type="text" value={this.state.input} onChange={this.handleInput.bind(this)} />
        <SubmitButton type="submit">Submit</SubmitButton>
      </SoundCaptchaWrapper>
    );
  }
}

const SoundCaptchaWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 164px;
`;
const AudioPlay = styled.button`
  background-color: #009ff5;
  color: white;
`;
const TextInput = styled.input`
  width: 200px;
  height: 20px;
`;
const SubmitButton = styled.button`

`;

export default SoundCaptcha;