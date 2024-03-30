import React from "react";

import "./googlebutton.css"





const GoogleSignInButton = () => {
    return (
      <button className="google-signin-button">
        <div className="google-icon-wrapper">
          <img className="google-icon" src="https://cdn-teams-slug.flaticon.com/google.jpg" alt="Google icon" />
        </div>
        <span className="button-text">Sign in with Google</span>
      </button>
    );
  };
  
  export default GoogleSignInButton;