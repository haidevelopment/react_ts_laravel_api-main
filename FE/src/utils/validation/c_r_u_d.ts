import { z } from "zod";

export const schema = z.object({
  name: z.string().min(1, "Tên danh mục là bắt buộc"),
  description: z.string().min(1, "Mô tả là bắt buộc"),
  image: z
    .instanceof(FileList)
    .optional()
    .refine(
      (files) =>
        !files || files.length === 0 || files[0]?.type.startsWith("image/"),
      "Nếu nhập tệp, tệp phải là ảnh"
    ),
  active: z.string().nonempty("Trạng thái là bắt buộc"),
});
export const schemaAttribute = z.object({
  name: z.string().min(1, "Tên thuộc tính là bắt buộc"),
});
