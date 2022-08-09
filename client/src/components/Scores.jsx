import React from 'react';
import styled from 'styled-components';

class Scores extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: []
    };
  }

  // On component mount, get top 10 high scores

  render () {
    return (
      <div>
        High scores go here
      </div>
    );
  }
}

export default Scores;