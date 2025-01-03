import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./Register.module.scss";
import { authService } from "../../services/Auth/AuthService";
import Loading from "../Loading";
import { ToastError, ToastSucess } from "../../utils/toast";
import { registerInterface } from "../../interfaces/registerInterface";
import { registerSchema } from "../../utils/validation/authValidation";

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<registerInterface>({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<registerInterface> = async (data) => {
    try {
      const res = await authService.register(data);
      if (res) {
        ToastSucess("Đăng kí thành công !");
        reset();
      }
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
      ToastError("Lỗi khi đăng kí tài khoản");
    }
  };

  return (
    <div className={styles.register}>
      <h2>Đăng ký</h2>
      <p>
        Tạo tài khoản và khám phá tất cả các lợi ích dành riêng cho người dùng
        đã đăng ký của chúng tôi.
      </p>
      {isSubmitting ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            <span>HỌ *</span>
            <input
              type="text"
              placeholder="Nhập họ của bạn"
              {...register("firstName")}
            />
            {errors.firstName && (
              <span className={styles.error}>{errors.firstName.message}</span>
            )}
          </label>

          <label>
            <span>TÊN *</span>
            <input
              type="text"
              placeholder="Nhập tên của bạn"
              {...register("lastName")}
            />
            {errors.lastName && (
              <span className={styles.error}>{errors.lastName.message}</span>
            )}
          </label>

          <label>
            <span>EMAIL *</span>
            <input
              type="email"
              placeholder="Nhập email của bạn"
              {...register("email")}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email.message}</span>
            )}
          </label>

          <label>
            <span>GIỚI TÍNH</span>
            <div className={styles.gender}>
              <label>
                <input type="radio" value="female" {...register("genre")} />
                Nữ
              </label>
              <label>
                <input type="radio" value="male" {...register("genre")} />
                Nam
              </label>
              <label>
                <input type="radio" value="other" {...register("genre")} />
                Khác
              </label>
            </div>
          </label>

          <label>
            <span>NGÀY SINH</span>
            <input type="date" {...register("birth")} />
          </label>

          <label>
            <span>MẬT KHẨU *</span>
            <input
              type="password"
              placeholder="Nhập mật khẩu"
              {...register("password")}
            />
            {errors.password && (
              <span className={styles.error}>{errors.password.message}</span>
            )}
          </label>

          <label>
            <span>XÁC NHẬN MẬT KHẨU *</span>
            <input
              type="password"
              placeholder="Nhập lại mật khẩu xác nhận"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <span className={styles.error}>
                {errors.confirmPassword.message}
              </span>
            )}
          </label>

          <button
            className={styles.submit}
            type="submit"
            disabled={isSubmitting}
          >
            Đăng ký
          </button>
        </form>
      )}
    </div>
  );
};

export default Register;
