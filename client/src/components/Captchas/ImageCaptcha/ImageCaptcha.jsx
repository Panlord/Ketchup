import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ImageCaptchaThumbnail from './ImageCaptchaThumbnail.jsx';
import IncorrectMessage from '../../IncorrectCaptchaMessage.jsx';

/* APIs to get images from
    Cats: https://cataas.com/cat?wi=[#]&he=[#] || https://placekitten.com/[width]/[height]
    Dogs: https://dog.ceo/api/breeds/image/random/[#] || https://place.dog/[width]/[height]
    Bears: https://placebear.com/[width]/[height]
    Ducks: https://random-d.uk/api/[#].jpg
    Waifus: https://api.waifu.pics/sfw/waifu
    Keanu: https://placekeanu.com/[width]/[height] <img src="https://placekeanu.com/[width]/[height]/y" alt="">
*/

var categories = ["animals", "Keanu"]; // 75% to get animals, 25% to get Keanu
var animals = ["cats", "dogs", "bears", "ducks", "waifus"]
// Load a bunch of waifus at once so we don't overload the API
var waifus = [];
axios.post('https://api.waifu.pics/many/sfw/waifu', { exclude: [] })
  .then((results) => {
    console.log("Waifus collected.");
    waifus = results.data.files
  })
  .catch((error) => {
    console.log("Something wrong happened when collecting the waifus.");
  });
// Load the Keanu lookalikes
var fakeKeanu = ["/assets/KeanuLookalikes/AdamDriver.jpeg", "/assets/KeanuLookalikes/Markiplier1.jpeg", "/assets/KeanuLookalikes/Markiplier2.jpeg", "/assets/KeanuLookalikes/moistcr1tikal.jpeg", "/assets/KeanuLookalikes/PaulMounet.jpeg"];

class ImageCaptcha extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [], // An array of image objects (each image object: { url: String, name: String})
      category: '',
      answers: [], // An array of the correct image objects
      selected: [], // An array of the selected objects
      gotWrong: false,
    };
  }

  // Function to randomize the image/API selections
  refreshComponent () {
    let category = (Math.random() > 0.75) ? categories[1] : categories[2];
    if (category === "Keanu") {
      // Populate images state array with Keanus and Keanu lookalikes
      let images = [];
      let answers = [];
      let indexFakeKeanu = 0;
      for (let i = 0; i < 9; i++) {
        if (Math.random() > 0.5 && indexFakeKeanu < fakeKeanu.length) {
          let selection = {
            url: fakeKeanu[indexFakeKeanu],
            correct: false
          }
          images.push(selection);
          indexFakeKeanu++;
        } else {
          let selection = {
            url: `https://placekeanu.com/${Math.ceil(Math.random() * 126) + 126}/${Math.ceil(Math.random() * 126) + 126}`,
            correct: true
          }
          images.push(selection);
          answers.push(selection);
        }
        this.setState({answers: answers, images: images, category: "Keanu Reeves", selected: [], gotWrong: false});
      }
    } else {
      // Prepare to update the states
      let images = [];
      let answers = [];
      // Select a random animal category that is the answer
      category = animals[Math.floor(Math.random() * 5)];
      // Now select another random animal category that will be the rest
      let otherCategory = category;
      while (otherCategory === category) {
        otherCategory = animals[Math.floor(Math.random() * 5)];
      };
      // For 9 slots, either add a correct animal or a wrong one
      for (let i = 0; i < 9; i++) {
        if (Math.random() < 0.5) {
          let selection = {
            url: this.generateAnimalImage(category),
            correct: true
          }
          images.push(selection);
          answers.push(selection);
        } else {
          let selection = {
            url: this.generateAnimalImage(otherCategory),
            correct: false
          }
          images.push(selection);
        }
      }
      // Now actually update the states
      this.setState({answers: answers, images: images, category: category, selected: [], gotWrong: false});
    }
  }

  // Function to generate a random image given an ANIMAL category
  generateAnimalImage (category) {
    let dimension = Math.ceil(Math.random() * 126) + 126;
    switch (category) {
      case "cats":
        return (`https://placekitten.com/${dimension}/${dimension}`);
        // return (<CaptchaImage src="https://placekitten.com/126/126" alt="" />);
      case "dogs":
        return (`https://place.dog/${dimension}/${dimension}`);
        // return (<CaptchaImage src="https://place.dog/126/126" alt="" />);
      case "bears":
        return (`https://placebear.com/${dimension}/${dimension}`);
        // return (<CaptchaImage src="https://placebear.com/126/126" alt="" />);
      case "ducks":
        return (`https://random-d.uk/api/${Math.ceil(Math.random() * 100)}.jpg`);
        // return (<CaptchaImage src={`https://random-d.uk/api/${Math.ceil(Math.random() * 100)}.jpg`} alt="" />);
      case "waifus":
        return (waifus[Math.floor(Math.random() * 30)]);
        // return (<CaptchaImage src={waifus[Math.floor(Math.random() * 30)]} alt="" />);
    }
  }

  // Function to handle clicking an image
  handleSelect (object) {
    event.preventDefault();
    let selected = this.state.selected;
    if (this.hasItem(selected, object)) {
      this.removeItem(selected, object);
    } else {
      selected.push(object);
    }
    this.setState({selected: selected});
  }

  // Helper function to check if input array has input image object
  hasItem (array, object) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].url === object.url) {
        return true;
      }
    }
    return false;
  }

  // Helper function to remove image object from input array
  removeItem (array, object) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].url === object.url) {
        array[i] = array[array.length - 1];
        array.pop();
      }
    }
  }

  // Helper function to check if the whole selection is the correct answer
  checkAnswer () {
    if (this.state.answers.length !== this.state.selected.length) {
      return false;
    }
    for (let i = 0; i < this.state.answers.length; i++) {
      if (!this.state.answers[i].correct) {
        return false;
      }
    }
    return true;
  }

  // Function to handle submitting the captcha answer
  handleSubmit (event) {
    event.preventDefault();
    if (this.checkAnswer()) {
      // Increase the score by 1
      this.props.increaseScore(1);
      // First 6-10 points are all from text captchas
      if (this.props.currentScore < 10) {
        // Refresh the text component with new data
        this.refreshComponent();
      // After scoring the 10th point, proceed to stage 3
      } else if (this.props.currentScore === 10) {
        this.props.changeStage(2);
      // After 15 points, change stage to 1, 3, or 4
      } else if (this.props.currentScore > 15 && this.props.currentScore < 100) {
        let nextStage = Math.ceil(Math.random() * 4);
        if (nextStage === 2) {
          this.refreshComponent();
        } else {
          this.props.changeStage(nextStage);
        }
      }
    } else {
      this.setState({gotWrong: true});
    }
  }

  // On component mounting, get its data
  componentDidMount () {
    this.refreshComponent();
  }

  render () {
    return (
      <div>
        {this.state.gotWrong && <IncorrectMessage />}
        <CaptchaContainer>
          <CaptchaInstructions>
            Select all images of {this.state.category}.
          </CaptchaInstructions>
          <CaptchaImageContainer>
            {this.state.images.map((image) => {
              return <ImageCaptchaThumbnail imgUrl={image.url} handleSelect={this.handleSelect.bind(this)} value={image} />
            })}
          </CaptchaImageContainer>
          <SubmitButton onClick={this.handleSubmit.bind(this)} >Submit</SubmitButton>
        </CaptchaContainer>
      </div>
    );
  }
}

const CaptchaContainer = styled.div`
  width: 402px;
  height: 585px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CaptchaInstructions = styled.div`
  width: 386px;
  height: 114px;
  background-color: cyan;
  justify-content: center;
`;
const CaptchaImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;
const SubmitButton = styled.button`
  width: 100px;
  height: 42px;
`;

export default ImageCaptcha;