import { getLocal, setLocal } from "../utils/localStorage";

class AccountService {
  setAccountValue(user: object): void {
    setLocal("user", user);
    window.dispatchEvent(new Event("storage"));
  }

  get accountValue() {
    return getLocal("user");
  }

  clearAccount() {
    localStorage.removeItem("user");
    console.log("Token và thông tin tài khoản đã bị xóa.");
  }
}

export const accountService = new AccountService();
