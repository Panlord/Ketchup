import React from 'react';
import styled from 'styled-components';

class ImageCaptchaThumbnail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      value: props.value
    }
  }

  // Function to handle what happens when clicking an image
  handleClick (event) {
    let isSelected = this.state.selected;
    // Show that the image has been clicked by rendering some stuff
    this.setState({selected: !isSelected});
    // Invoke the parent function
    this.props.handleSelect(this.state.value);
  }

  render () {
    let image;
    if (this.state.selected) {
      image = <SelectedCaptchaImageWrapper>
          <SelectedCaptchaImage src={this.props.imgUrl} alt="" onClick={this.handleClick.bind(this)} />
        </SelectedCaptchaImageWrapper>;
    } else {
      image = <CaptchaImage src={this.props.imgUrl} alt="" onClick={this.handleClick.bind(this)} />;
    }

    return (
      <div>
        {image}
      </div>
    );
  }
}

const CaptchaImageWrapper = styled.div`
  width: 126px;
  height: 126px;
  position: relative;
`;
const SelectionIndicator = styled.div`
  position: absolute;
`;
const CaptchaImage = styled.img`
  width: 126px;
  height: 126px;
  object-fit: cover;
`;
const SelectedCaptchaImageWrapper = styled.div`
  width: 126px;
  height: 126px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SelectedCaptchaImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

export default ImageCaptchaThumbnail;