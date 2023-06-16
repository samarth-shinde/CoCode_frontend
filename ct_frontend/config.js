const baseURL = "http://127.0.0.1:8000";

const config = {
  baseURL: baseURL,
  adminURL: `${baseURL}/admin/`,
  authTokenURL: `${baseURL}/api-token-auth/`,
  apiURL: `${baseURL}/api/`,
  registerURL: `${baseURL}/api/register/`,
  getUserDetailsURL: `${baseURL}/api/get_user_details/`,
  getPlaygroundDetailsURL: `${baseURL}/api/get_playground_details/`,
  inviteOthersURL: `${baseURL}/api/invite-others/`,
  opentokTokenURL: `${baseURL}/api/opentok-token/`,
  helpPortalURL: `${baseURL}/api/help_portal/`,
  listKeywordsURL: `${baseURL}/api/list_of_keywords/`,
  createVoiceRoomURL: `${baseURL}/api/create_voice_room/`,
  link: `http://localhost:3000/playground/`,
  chatWS: "ws://127.0.0.1:8000/ws/chat/",
  whiteboardWS: "ws://127.0.0.1:8000/ws/whiteboard/",
  email: "samarthshinde247@gmail.com",
  password: "S@m!#@#202",
  gCalanderClientId:
    "758219040911-gkboai1ll6ti66k8c2ea1vqqp7qpma71.apps.googleusercontent.com",
  gCalanderProjectId: "cocode-calendar",
  gCalanderAuthUri: "https://accounts.google.com/o/oauth2/auth",
  gCalanderTokenuri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  gCalanderClientSecret: "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",
  redirect_uris: ["http://localhost:3000/updates"],
  javascript_origins: ["http://localhost:3000"],
  gCalendarApiKey: "AIzaSyD8qn1VZIxcvzo9i66qkCK0lYZy38R2d6Y",
};

export default config;
