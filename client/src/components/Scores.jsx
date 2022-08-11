import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

class Scores extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: []
    };
  }

  // On component mount, get top 10 high scores
  componentDidMount () {
    console.log('mounting');
    axios.get('./ketchup/highscores')
      .then((results) => {
        console.log('mounting results');
        this.setState({scores: results.data});
      })
      .catch((error) => {
        console.log('There was an error in getting the highscores from the server.', error)
      })
  }

  render () {
    return (
      <div>
        <TableHeader>Name</TableHeader>
        <TableHeader>Score</TableHeader>
        <TableHeader>Time</TableHeader>
        {this.state.scores.map((score, index) => {
          return (
            <div>
              <DataDiv key={`name${index}`} >{score.name}</DataDiv>
              <DataDiv key={`score${index}`} >{score.score}</DataDiv>
              <DataDiv key={`time${index}`} >{score.time}</DataDiv>
            </div>
          );
        })}
      </div>
    );
  }
}

const Table = styled.div`
  width: 402px;
  height: 585px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;
const TableHeader = styled.div`
  width: 40px;
  height: 58px;
  font-weight: bold;
`;
const DataDiv = styled.div`
  width: 40px;
  height: 58px;
`;

export default Scores;