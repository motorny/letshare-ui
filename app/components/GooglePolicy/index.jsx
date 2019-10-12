import React from 'react';

import './index.css';

const GooglePolicy = () => {
    return (
      <div className="google-policy">
          <span>This site is protected by reCAPTCHA and the Google </span>
          <a href="https://policies.google.com/privacy"
             className="google-policy__a"
             target="_blank">
              Privacy Policy</a>
          <span> and </span>
          <a href="https://policies.google.com/terms"
             className="google-policy__a"
             target="_blank">
              Terms of Service</a> apply.
      </div>
    );
};

export default GooglePolicy;
