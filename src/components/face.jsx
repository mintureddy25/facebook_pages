// App.js
import React from 'react';
import FacebookSdk from './facebook';
import FacebookLogin from 'react-facebook-login';

const Face = () => {
  const appId = '908299747781305'; // Replace with your actual Facebook App ID

  const responseFacebook = (response) => {
    console.log(response);

    

    // Handle response here (e.g., access token, user data)
  };


  return (
    <div>
      <FacebookSdk appId={appId} />
      <h1>React Facebook Login</h1>
      <FacebookLogin
        appId={appId}
        autoLoad={false}
        fields="name,email,picture"
        onClick={() => console.log('Login button clicked')}
        callback={responseFacebook}
        icon="fa-facebook"
      />
    </div>
  );
};

export default Face;
