import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

class ScoreForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      needName: false,
      nameTooLong: false,
    }
  }

  // Function to handle inputs into the name field
  handleNameInput (event) {
    this.setState({name: event.target.value, nameTooLong: false, needName: false});
  }

  // Function to handle form submission
  handleSubmit (event) {
    event.preventDefault();
    if (this.state.name.length === 0) {
      this.setState({needName: true});
    } else if (this.state.name.length > 15) {
      this.setState({nameTooLong: false});
    } else {
      axios.post('./newScore', { name: this.state.name, score: props.score, time: props.time })
        .then(() => {

        })
        .catch((error) => {
          console.log('Something went wrong when trying to upload your new score. Error:', error);
        });
    }
  }

  render () {
    return (
      <Form onSubmit={this.handleSubmit.bind(this)} >
        {this.state.needName && <NameWarning>You need to input your name.</NameWarning>}
        {this.state.nameTooLong && <NameWarning>Your name is too long.</NameWarning>}
        <LabelSpan>Input your name:</LabelSpan>
        <NameInput type="text" value={this.state.name} onChange={this.handleNameInput.bind(this)} />
        <LabelSpan>Score:</LabelSpan>
        <StatSpan>{this.props.score}</StatSpan>
        <LabelSpan>Time:</LabelSpan>
        <StatSpan>{this.props.time}</StatSpan>
      </Form>
    );
  }
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: gray;
`;
const NameInput = styled.input`

`;
const NameWarning = styled.span`
  position: absolute;
  top: 20vh;
  transform: translateX(35%);
  background-color: #fe8972;
  color: #a11d02;
  border: solid 2px;
  border-color: #a11d02;
  padding: 20px 40px;
`;
const LabelSpan = styled.span`

`;
const StatSpan = styled.span`

`;

export default ScoreForm;