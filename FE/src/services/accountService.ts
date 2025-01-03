import { getLocal, setLocal } from "../utils/localStorage";

class AccountService {
  setAccountValue(user: object): void {
    setLocal("user", user);
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
