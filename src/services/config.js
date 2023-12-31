import axios from "axios";
import { layDuLieuLocal } from "../utils/localStore";

// interceptors
const BASE_URL = "https://movienew.cybersoft.edu.vn";

const TokenCybersoft =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAwNyIsIkhldEhhblN0cmluZyI6IjE5LzEyLzIwNjEiLCJIZXRIYW5UaW1lIjoiMjkwMjk0NDAwMDAwMCIsIm5iZiI6MTY3OTg1MDAwMCwiZXhwIjoyOTAzMDkxNjAwfQ.z3ss3SqxdRF0AiUMJut14rPVISEscKvB0do5qzeOOr8";
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAwNyIsIkhldEhhblN0cmluZyI6IjE5LzEyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTcwMjk0NDAwMDAwMCIsIm5iZiI6MTY3OTg1MDAwMCwiZXhwIjoxNzAzMDkxNjAwfQ.28D2Nfp6Hy4C5u8pvZDIxH2pzlYoKIqgfsJLI_Dque4";

const tokenAuthorization = layDuLieuLocal("user");
// console.log(tokenAuthorization);

const configHeaderAxios = () => {
  // console.log(tokenAuthorization);
  return {
    TokenCybersoft,
    Authorization: "Bearer " + tokenAuthorization?.accessToken,
  };
};

export const https = axios.create({
  baseURL: BASE_URL,
  headers: configHeaderAxios(),
});
