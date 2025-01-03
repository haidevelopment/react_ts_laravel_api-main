import axios from "axios";
import { accountService } from "../../services/accountService";

const instance = axios.create({
  baseURL: import.meta.env.VITE_LOCAL_API_URL,
  headers: { Authorization: `Bearer ${accountService?.accountValue?.token}` },
});
export default instance ;
