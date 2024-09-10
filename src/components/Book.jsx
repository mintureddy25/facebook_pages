import React, { useEffect } from 'react';

const FacebookLoginButton = () => {
  useEffect(() => {
    // Load the Facebook SDK
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);

      js.onload = () => {
        window.fbAsyncInit = function() {
          window.FB.init({
            appId      : '876951454364357', // Your Facebook App ID
            cookie     : true,
            xfbml      : true,
            version    : 'v20.0'
          });
          window.FB.AppEvents.logPageView();
        };
      };
    })(document, 'script', 'facebook-jssdk');

    // Cleanup function to remove the script
    return () => {
      const script = document.getElementById('facebook-jssdk');
      if (script) script.remove();
    };
  }, []);

  const handleFBLogin = () => {
    if (window.FB) {
      window.FB.login(response => {
        if (response.authResponse) {
          console.log('Welcome!  Fetching your information.... ');
          window.FB.api('/me', function(response) {
            console.log('Good to see you, ' + response.name + '.');
          });
        } else {
          console.log('User cancelled login or failed.'+response);
        }
      }, {scope: 'public_profile,email'});
    } else {
      console.error('Facebook SDK is not loaded.');
    }
  };

  return (
    <div>
      <button onClick={handleFBLogin}>Login with Facebook</button>
    </div>
  );
};

export default FacebookLoginButton;
