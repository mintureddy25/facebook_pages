import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const FacebookLoginButton = () => {
  const [accessToken, setAccessToken] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Load the Facebook SDK
    const loadFacebookSDK = () => {
      if (document.getElementById('facebook-jssdk')) return;

      const js = document.createElement('script');
      js.id = 'facebook-jssdk';
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      js.onload = () => {
        window.FB.init({
          appId: '908299747781305', // Your updated Facebook App ID
          cookie: true,
          xfbml: true,
          version: 'v20.0'
        });

        window.FB.AppEvents.logPageView();
        
        // Check login status on load
        window.FB.getLoginStatus(response => {
          statusChangeCallback(response);
        });
      };

      document.body.appendChild(js);
    };

    loadFacebookSDK();

    // Cleanup function
    return () => {
      const script = document.getElementById('facebook-jssdk');
      if (script) script.remove();
    };
  }, []);

  const statusChangeCallback = (response) => {
    if (response.status === 'connected') {
      setAccessToken(response.authResponse.accessToken);
    } else {
      setAccessToken(null);
    }
  };

  useEffect(() => {
    // Ensure checkLoginState is defined globally
    window.checkLoginState = () => {
      if (window.FB) {
        window.FB.getLoginStatus(response => {
          statusChangeCallback(response);
        });
      }
    };

    // Navigate to dashboard if accessToken is available
    if (accessToken) {
      navigate(`/Dashboard?accessToken=${accessToken}`);
    }
  }, [accessToken, navigate]);

  return (
    <div>
      <div
        className="fb-login-button"
        data-width=""
        data-size="large"
        data-button-type="login_with"
        data-layout="default"
        data-auto-logout-link="false"
        data-use-continue-as="false"
        data-scope="public_profile,email,pages_show_list,pages_read_engagement"
        data-onlogin="checkLoginState();"
        data-config-id="1968405510270455"
      ></div>
    </div>
  );
};

export default FacebookLoginButton;
