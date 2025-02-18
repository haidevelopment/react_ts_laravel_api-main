import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import style from "./Profile.module.scss";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { getCurrenUser } from "../../../../Features/Slices/authSlice";
import { useForm } from "react-hook-form";

const cx = classNames.bind(style);
import tokyo from "../../../../assets/image/logo/tokyo.png";

interface ProfileForm {
  first_name: string;
  last_name: string;
  birth: string;
  gender: string;
  email: string;
}

const Profile: React.FC = () => {
  const [avatar, setAvatar] = useState(tokyo);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileForm>({
    defaultValues: {
      first_name: "",
      last_name: "",
      birth: "",
      gender: "Nam",
      email: "",
    },
  });

  useEffect(() => {
    dispatch(getCurrenUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setValue("first_name", user.user.first_name || "");
      setValue("last_name", user.user.last_name || "");
      setValue("birth", String(user.user.birth) || "");
      setValue("gender", user.user.genre || "Nam");
      setValue("email", user.user.email || "");
    }
  }, [user, setValue]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  const onSubmit = (data: ProfileForm) => {
    console.log("Form data:", data);
  };

  return (
    <div className={cx("content")}>
      <h2 className={cx("title")}>Hồ sơ của tôi</h2>
      <div className={cx("line")}></div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cx("profile-container")}
      >
        <div className={cx("profile-left")}>
          <img src={avatar} alt="Avatar" className={cx("avatar")} />
          <input
            type="file"
            id="avatarInput"
            hidden
            onChange={handleImageChange}
          />
          <label htmlFor="avatarInput" className={cx("upload-btn")}>
            Chọn ảnh
          </label>
          <p>Dung lượng tối đa 1MB. Định dạng .JPEG, .PNG</p>
        </div>

        <div className={cx("profile-right")}>
          <div className={cx("input-group")}>
            <label>Họ</label>
            <input
              type="text"
              {...register("first_name", { required: "Vui lòng nhập họ" })}
            />
            {errors.first_name && (
              <p className={cx("error")}>{errors.first_name.message}</p>
            )}
          </div>

          <div className={cx("input-group")}>
            <label>Tên</label>
            <input
              type="text"
              {...register("last_name", { required: "Vui lòng nhập tên" })}
            />
            {errors.last_name && (
              <p className={cx("error")}>{errors.last_name.message}</p>
            )}
          </div>

          <div className={cx("input-group")}>
            <label>Ngày sinh</label>
            <input
              type="date"
              {...register("birth", { required: "Vui lòng chọn ngày sinh" })}
            />
            {errors.birth && (
              <p className={cx("error")}>{errors.birth.message}</p>
            )}
          </div>

          <div className={cx("input-group")}>
            <label>Giới tính</label>
            <div className={cx("gender-group")}>
              <label className={cx("gender-option")}>
                <input type="radio" value="male" {...register("gender")} /> Nam
              </label>
              <label className={cx("gender-option")}>
                <input type="radio" value="female" {...register("gender")} /> Nữ
              </label>
              <label className={cx("gender-option")}>
                <input type="radio" value="none" {...register("gender")} /> Khác
              </label>
            </div>
          </div>

          <div className={cx("input-group")}>
            <label>Email *</label>
            <input type="email" {...register("email")} disabled />
          </div>

          <div className={cx("social-link")}>
            <FaFacebook color="#1877F2" />
            <span>Liên kết tài khoản Facebook</span>
          </div>
          <div className={cx("social-link")}>
            <FaGoogle color="#EA4335" />
            <span>Liên kết tài khoản Google</span>
          </div>
          <div className={cx("btn-ctn")}>
            <button type="submit" className={cx("save-btn")}>
              Lưu thay đổi
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
