import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const facebookAppId = process.env.REACT_APP_FACEBOOK_APP_ID;
const configurationId = process.env.REACT_APP_FACEBOOK_APP_CONFIGURATION_ID;
console.log('Environment Variables:', process.env);


const FacebookLoginButton = () => {
  const [accessToken, setAccessToken] = useState(null);
  const navigate = useNavigate();
  console.log(facebookAppId,configurationId,"mintu cong");

  useEffect(() => {
    const loadFacebookSDK = () => {
      if (document.getElementById("facebook-jssdk")) return;

      const js = document.createElement("script");
      js.id = "facebook-jssdk";
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      js.onload = () => {
        window.FB.init({
          appId: facebookAppId,
          cookie: true,
          xfbml: true,
          version: "v20.0",
        });

        window.FB.AppEvents.logPageView();

        window.FB.getLoginStatus((response) => {
          statusChangeCallback(response);
        });
      };

      document.body.appendChild(js);
    };

    loadFacebookSDK();

    return () => {
      const script = document.getElementById("facebook-jssdk");
      if (script) script.remove();
    };
  }, []);

  const statusChangeCallback = (response) => {
    if (response.status === "connected") {
      setAccessToken(response.authResponse.accessToken);
    } else {
      setAccessToken(null);
    }
  };

  useEffect(() => {
    window.checkLoginState = () => {
      if (window.FB) {
        window.FB.getLoginStatus((response) => {
          statusChangeCallback(response);
        });
      }
    };

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
        data-config-id={configurationId}
      ></div>
    </div>
  );
};

export default FacebookLoginButton;
