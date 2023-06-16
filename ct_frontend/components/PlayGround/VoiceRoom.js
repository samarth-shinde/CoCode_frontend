import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
export default function VoiceRoom() {
  const [roomId, setRoomId] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    createVoiceRoom();
  }, []);

  const createVoiceRoom = async () => {
    try {
      const response = await axios.post(`${config.createVoiceRoomURL}`);
      const { roomId, authToken, userName } = response.data;

      setRoomId(roomId);
      setAuthToken(authToken);
      setUserName(userName);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Voice Room</h1>
      <p>Room ID: {roomId}</p>
      <p>Auth Token: {authToken}</p>
      <p>User Name: {userName}</p>
    </div>
  );
}
