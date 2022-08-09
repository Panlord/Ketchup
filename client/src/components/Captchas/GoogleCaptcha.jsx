import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const GoogleCaptcha = () => {
  function onChange(value) {
    console.log('Captcha value:', value);
  }

  return (
    <div className="googleCaptcha">
      <ReCAPTCHA
        sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
        onChange={onChange}
      />
    </div>
  );
}

export default GoogleCaptcha;