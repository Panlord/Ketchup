import React from 'react';
import styled from 'styled-components';

var msg = new SpeechSynthesisUtterance();
var voices = [];
setTimeout(() => {window.speechSynthesis.getVoices();}, 50);
var selectedVoices = [0, 10, 37, 41, 49, 50, 51, 58];
msg.volume = 1;
msg.rate = 1;
var wordBank = ['ligma', 'deez nutz', 'anthony', 'banana', 'apple', 'frog', 'table', 'god', 'water', 'squish', 'bottom', 'butter', 'red', 'purple', 'flower', 'dandelion', 'sidewalk', 'lightpost', 'cat', 'base', 'picture', 'hood', 'car', 'tree', 'bike', 'donkey', 'dog', 'dinosaur', 'tyrannosaurus', 'camel', 'beer', 'pikachu', 'bug', 'mosquito', 'apricot', 'hammer', 'mountain', 'coffee', 'pen', 'paper', 'shelf', 'boobies', 'jacket'];

class SoundCaptcha extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: '',
      voice: 0,
      pitch: 1,
    };
  }

  // Function to handle clicking the audio button
  handlePlay (event) {
    event.preventDefault();
    msg.voice = window.speechSynthesis.getVoices()[this.state.voice];
    msg.text = this.state.answer;
    msg.pitch = this.state.pitch;
    speechSynthesis.speak(msg);
    console.log(msg);
  }

  // Function to handle submitting the captcha answer

  // Function to reset/randomize this captcha
  refreshComponent () {
    console.log(voices);
    this.setState({
      answer: wordBank[Math.floor(Math.random() * wordBank.length)],
      voice: selectedVoices[Math.floor(Math.random() * selectedVoices.length)], // voice from specifically selected voices
      pitch: Math.random() * 2,
    });
  }

  // On component mounting, check if the browser supports speech synthesis
  componentDidMount () {
    if ('speechSynthesis' in window && selectedVoices.length > 0) {
      console.log('Great! Speech synthesis is supported in your browser.');
      this.refreshComponent();
    } else {
      alert('Your browser does not support speech synthesis. Skipping this captcha.');
    }
  }

  render () {
    return (
      <div>
        Sound Captcha Goes here.
        <button onClick={this.handlePlay.bind(this)}>Speak</button>
      </div>
    );
  }
}

export default SoundCaptcha;