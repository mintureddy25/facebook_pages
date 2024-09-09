import React from 'react';
import FacebookLogin from 'react-facebook-login';

const FacebookLoginButton = () => {
    console.log("mintu consoled");
  // Callback function to handle the response from Facebook
  const responseFacebook = (response) => {
    console.log(response);
    // Handle the response from Facebook here
    // For example, you can send the response to your server for further processing
  };

  return (
    <div>
      <FacebookLogin
        appId="908299747781305" // Replace with your Facebook App ID
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
        icon="fa-facebook"
      />
    </div>
  );
};

export default FacebookLoginButton;
