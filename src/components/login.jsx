import React from 'react';
import {LoginSocialFacebook} from 'reactjs-social-login';
import { FacebookLoginButton } from 'react-social-login-buttons';

function Login() {
  return (
    <div>
        <LoginSocialFacebook
        appId="908299747781305"
        onResolve={(response) => {
            console.log(response);
        }}
        onReject={(error)=>{
            console.log(error);
        }}
        >
            <FacebookLoginButton/>


        </LoginSocialFacebook>
      
    </div>
  )
}

export default Login
