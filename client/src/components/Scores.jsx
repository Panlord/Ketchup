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
      <Table>
        <RowWrapper>
          <TableHeader>Name</TableHeader>
          <TableHeader>Score</TableHeader>
          <TableHeader>Time</TableHeader>
        </RowWrapper>
        {this.state.scores.map((score, index) => {
          return (
            <RowWrapper key={`row${index}`}>
              <DataDiv key={`name${index}`} >{score.name}</DataDiv>
              <DataDiv key={`score${index}`} >{score.score}</DataDiv>
              <DataDiv key={`time${index}`} >{score.time}</DataDiv>
            </RowWrapper>
          );
        })}
      </Table>
    );
  }
}

const Table = styled.div`
  border: solid 2px;
  padding: 50px;
`;
const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
// TableHeader should match Datadiv
const TableHeader = styled.div`
  width: 40px;
  height: 58px;
  font-weight: bold;
  padding: 10px
`;
const DataDiv = styled.div`
  width: 40px;
  height: 40px;
  padding: 10px;
`;

export default Scores;