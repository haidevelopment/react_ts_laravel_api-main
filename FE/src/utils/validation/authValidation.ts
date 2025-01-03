import { z } from "zod";
export const loginSchema = z.object({
  email: z
    .string()
    .nonempty("Email không được để trống!")
    .email("Email không đúng định dạng!"),
  password: z
    .string()
    .nonempty("Mật khẩu không được để trống!")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự!"),
});
export const registerSchema = z
.object({
  firstName: z.string().nonempty("Họ không được để trống!"),
  lastName: z.string().nonempty("Tên không được để trống!"),
  email: z
    .string()
    .nonempty("Email không được để trống!")
    .email("Email không đúng định dạng!"),
  password: z
    .string()
    .nonempty("Mật khẩu không được để trống!")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự!"),
  confirmPassword: z.string().nonempty("Mật khẩu xác nhận không được để trống!"),
  genre: z.enum(["male", "female", "other"]).optional(),
  birth: z.string().optional(),
})
.refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Mật khẩu xác nhận không khớp!",
});