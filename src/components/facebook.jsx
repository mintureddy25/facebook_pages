// FacebookSdk.js
import { useEffect } from 'react';

const FacebookSdk = ({ appId }) => {
  useEffect(() => {
    // Load the Facebook SDK script
    window.fbAsyncInit = function() {
      window.FB.init({
        appId      : appId,
        cookie     : true,
        xfbml      : true,
        version    : 'v12.0' // Use the latest version or the version your app supports
      });
    };

    (function(d, s, id){
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

  }, [appId]);

  return null;
};

export default FacebookSdk;
