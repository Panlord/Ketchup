import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import styled from 'styled-components';
import axios from 'axios';

const GoogleCaptcha = (props) => {

  const recaptchaRef = React.createRef();

  // Function to handle successful reCaptcha validation
  function onChange(value) {
    console.log('Google captcha complete. Sending valid token to the server.');
    axios.post('./ketchup/validateToken', { captchaValue: value })
      .then((results) => {
        console.log(results.data.success);
        if (results.data.success) {
          setTimeout(() => {props.changeStage(1);}, 500);
        } else {
          // Failure
        }
      })
      .catch((error) => {
        console.log('An error occurred with sending valid token to Google.');
      })
  }
  // Function to handle errored reCaptcha validation
  function onError(value) {
    console.log('Error occurred when validating Google reCaptcha. Are you a bot???');
    // Maybe do something here
  }

  return (
    <GoogleCaptchaDiv className="googleCaptcha">
      <ReCAPTCHA
        sitekey="6LdV7VshAAAAAEnaxo-SyPnQtqvO2wvAqXtnXZCO"
        ref={recaptchaRef}
        onChange={onChange}
        onErrored={onError}
        onExpired={() => {console.log('EXPIRED')}}
      />
    </GoogleCaptchaDiv>
  );
}

const GoogleCaptchaDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default GoogleCaptcha;