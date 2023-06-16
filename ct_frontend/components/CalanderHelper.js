import React from "react";
import axios from "axios";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";

const clientId =
  "746149425082-efarmpvof2pbric8a7hahbsthagu0ahr.apps.googleusercontent.com";
const clientSecret = "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";
const redirectUri = "http://localhost:3000/updates";
const tokenEndpoint = "https://oauth2.googleapis.com/token";

export default function CalanderHelper({ setCalander, createEvents }) {
  const onSuccess = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const { code } = tokenResponse;

        // Exchange authorization code for tokens
        const tokenParams = new URLSearchParams();
        tokenParams.append("code", code);
        tokenParams.append("client_id", clientId);
        tokenParams.append("client_secret", clientSecret);
        tokenParams.append("redirect_uri", redirectUri);
        tokenParams.append("grant_type", "authorization_code");

        const response = await axios.post(tokenEndpoint, tokenParams);
        console.log(response);
        const { access_token, refresh_token } = response.data;

        console.log("Access Token:", access_token);
        console.log("Refresh Token:", refresh_token);

        // Pass the tokens to createEvents or perform other actions
        createEvents(access_token, refresh_token);
      } catch (error) {
        console.error("Token exchange error:", error);
      }
    },
  });

  const onFailure = (error) => {
    console.log("Login error:", error);
  };

  return (
    <div className="text-white">
      <button onClick={() => setCalander(false)}>X</button>
      <div className="p-4">
        <GoogleLogin
          clientId={clientId}
          redirectUri={redirectUri}
          onSuccess={onSuccess}
          onFailure={onFailure}
          responseType="code"
          accessType="offline"
          prompt="consent"
        />
      </div>
    </div>
  );
}

// clientId =
//   "758219040911-gkboai1ll6ti66k8c2ea1vqqp7qpma71.apps.googleusercontent.com";
