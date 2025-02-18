import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./Login.module.scss";
import { authService } from "../../services/Auth/AuthService";
import { ToastError, ToastSucess } from "../../utils/toast";
import { accountService } from "../../services/accountService";
import Loading from "../Loading";
import { LoginRequest } from "../../interfaces/authInterface";
import { loginSchema } from "../../utils/validation/authValidation";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { getCurrenUser } from "../../Features/Slices/authSlice";

type LoginProps = {
  onClose: () => void;
};

const Login: React.FC<LoginProps> = ({ onClose }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
    try {
      const res = await authService.login(data);
      console.log(res);
      if (res) {
        dispatch(getCurrenUser());
      }
      ToastSucess("Đăng nhập thành công");
      accountService.setAccountValue(res.data);
      onClose();
    } catch (error: any) {
      const apiErrors = error?.response?.data?.errors;
      if (apiErrors) {
        if (apiErrors.email) {
          setError("email", { type: "server", message: apiErrors.email[0] });
        }
        if (apiErrors.password) {
          setError("password", {
            type: "server",
            message: apiErrors.password[0],
          });
        }
      }
      ToastError("Lỗi khi đăng nhập");
    }
  };

  return (
    <div className={styles.login}>
      <h2>Đăng nhập</h2>
      <p>Nhập số điện thoại của Quý Khách để đăng nhập tài khoản Tokyolife.</p>
      {isSubmitting ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            <span>Email *</span>
            <input
              type="email"
              placeholder="Vui lòng nhập Email"
              {...register("email")}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email.message}</span>
            )}
          </label>

          <label>
            <span>Mật khẩu *</span>
            <div className={styles.password}>
              <input
                type={isPasswordVisible ? "password" : "text"}
                placeholder="Nhập mật khẩu"
                {...register("password")}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                aria-label={
                  isPasswordVisible ? "Ẩn mật khẩu" : "Hiển thị mật khẩu"
                }
              >
                {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <span className={styles.error}>{errors.password.message}</span>
            )}
          </label>

          <div className={styles.options}>
            <label>
              <div>
                <input type="checkbox" />
              </div>
              <span>Giữ trạng thái đăng nhập</span>
            </label>
            <a href="#">Quên mật khẩu?</a>
          </div>

          <button
            className={styles.submit}
            type="submit"
            disabled={isSubmitting}
          >
            Đăng nhập
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;
