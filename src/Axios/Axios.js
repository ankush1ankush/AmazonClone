import axios from "axios";

const instance = axios.create({
  baseURL:"https://us-central1-clone-295a6.cloudfunctions.net/api"
  // "http://127.0.0.1:5001/clone-295a6/us-central1/api",
});

export default instance;
