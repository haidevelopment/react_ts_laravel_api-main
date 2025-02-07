import React, { useEffect, useState } from "react";
import styles from "./ProductVariantForm.module.scss";
import classNames from "classnames/bind";
import { useAppSelector } from "../../../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../../../hooks/useAppDispatch";
import { getAtrribute } from "../../../../../Features/Slices/attributeSlice";
import Select, { MultiValue } from "react-select";
import { FaTrashAlt } from "react-icons/fa";
import { ToastError, ToastSucess } from "../../../../../utils/toast";
import {
  Variant,
  VariantDataInterface,
} from "../../../../../interfaces/admin/Form";
import proImage from "../../../../../assets/image/pro-img/image-null.jpg";
const cx = classNames.bind(styles);
interface AttributeValue {
  value: string;
  label: string;
}

interface ProductVariantFormProps {
  setVariant: (variant: VariantDataInterface[]) => void;
}
const ProductVariantForm: React.FC<ProductVariantFormProps> = ({
  setVariant,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [selectedAttributes, setSelectedAttributes] = useState<
    AttributeValue[]
  >([]);
  const [variantErrors, setVariantErrors] = useState<{
    [key: number]: string[];
  }>({});

  const [selectedValues, setSelectedValues] = useState<{
    [key: string]: AttributeValue[];
  }>({});

  const [variantData, setVariantData] = useState<VariantDataInterface[]>([]);

  const dispatch = useAppDispatch();
  const { attribute } = useAppSelector((state) => state.attribute);

  useEffect(() => {
    dispatch(getAtrribute());
  }, [dispatch]);

  const attributeOptions = attribute.map((attr) => ({
    value: String(attr.id),
    label: attr.name,
  }));

  const handleAttributeChange = (
    selectedOptions: MultiValue<AttributeValue>
  ) => {
    if (!selectedOptions) return;

    const selectedArray: AttributeValue[] = [...selectedOptions];
    setSelectedAttributes(selectedArray);

    const newValues: { [key: string]: AttributeValue[] } = {};

    selectedArray.forEach((attr) => {
      const attrId = String(attr.value);
      newValues[attrId] = selectedValues[attrId] || [];
    });

    setSelectedValues(newValues);
  };

  const handleValueChange = (
    attrId: string,
    selectedOptions: readonly AttributeValue[]
  ) => {
    setSelectedValues({
      ...selectedValues,
      [attrId]: [...selectedOptions],
    });
  };

  const generateVariants = () => {
    const selected: Variant[][] = Object.entries(selectedValues)
      .map(([attrId, values]) =>
        values.map((val) => ({
          attrId,
          attrValueId: val.value,
          label: val.label,
        }))
      )
      .filter((v) => v.length > 0);

    if (selected.length === 0) return;

    const combineVariants = (
      arrays: Variant[][],
      prefix: Variant[] = []
    ): Variant[][] => {
      if (!arrays.length) return [prefix];

      return arrays[0]
        .map((val) => combineVariants(arrays.slice(1), [...prefix, val]))
        .flat();
    };

    const allVariants: Variant[][] = combineVariants(selected);

    const defaultData: VariantDataInterface[] = allVariants.map((variant) => ({
      attributes: variant,
      price: 0,
      sku: "",
      weight: 0,
      description: "",
      quantity: 10,
      image: null,
    }));

    setVariantData(defaultData);
  };
  const handleInputChange = (
    index: number,
    field: string,
    value: number | string | File | null
  ) => {
    setVariantData((prev: VariantDataInterface[]) => {
      const updated = [...prev];

      if (field === "image" && value instanceof File) {
        const file = value as File;
        const imageUrl = URL.createObjectURL(file);
        updated[index] = {
          ...updated[index],
          image: file,
          imagePreview: imageUrl,
        };
      } else {
        updated[index] = { ...updated[index], [field]: value };
      }

      return updated;
    });
    setVariant(variantData);
  };

  const handleRemoveVariant = (index: number) => {
    setVariantData((prev) => prev.filter((_, i) => i !== index));
  };

  const hanleSaveVariant = () => {
    const errors: { [key: number]: string[] } = {};

    variantData.forEach((variant, index) => {
      const missingFields: string[] = [];

      if (!variant.price || Number(variant.price) <= 0)
        missingFields.push("price");
      if (!variant.sku.trim()) missingFields.push("sku");
      if (!variant.quantity || Number(variant.quantity) <= 0)
        missingFields.push("quantity");
      if (!variant.image) missingFields.push("image");

      if (missingFields.length > 0) {
        errors[index] = missingFields;
      }
    });

    setVariantErrors(errors);

    if (Object.keys(errors).length === 0) {
      ToastSucess("Lưu thành công dữ liệu");
    } else {
      ToastError("❌ Có lỗi, vui lòng nhập đủ các trường tô đỏ");
    }
  };

  return (
    <div className={cx("variant-container")}>
      <div className={cx("header")}>
        <div className={cx("text-title")}>Phân loại hàng (nếu có)</div>
        <div className={cx("checked-variant-box")}>
          <label className={cx("toggleSwitch")}>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              className={cx("checkbox")}
            />
            <span className={cx("slider")}></span>
          </label>
        </div>
      </div>

      <div className={cx("line")}></div>

      {isChecked && (
        <div className={cx("box-variant")}>
          <div className={cx("box-select-variant")}>
            <label>Chọn phân loại hàng</label>
            <Select
              options={attributeOptions}
              isMulti
              value={selectedAttributes}
              onChange={handleAttributeChange}
              placeholder="Chọn thuộc tính..."
            />
          </div>

          {selectedAttributes.map((attr) => {
            const attributeData = attribute.find(
              (a) => String(a.id) === String(attr.value)
            );
            if (!attributeData) return null;

            const valueOptions = attributeData.attribute_value.map((val) => ({
              value: String(val.id),
              label: val.value,
            }));

            return (
              <div key={attr.value} className="box-select-variant-value">
                <label>{attr.label}</label>
                <Select
                  options={valueOptions}
                  isMulti
                  value={selectedValues[String(attr.value)] || []}
                  onChange={(selected) =>
                    handleValueChange(String(attr.value), selected)
                  }
                  placeholder={`Chọn ${attr.label}...`}
                />
              </div>
            );
          })}

          <button
            className={cx("create-variant-button")}
            onClick={generateVariants}
            disabled={Object.values(selectedValues).every(
              (v) => v.length === 0
            )}
            type="button"
          >
            Tạo biến thể
          </button>
          {variantData.length > 0 && (
            <div className={cx("box-variant-service")}>
              {variantData?.map((variant, index) => (
                <div className={cx("variant-service")} key={index}>
                  <div className={cx("header-variant-service")}>
                    <div className={cx("stt-variant")}># {index + 1}</div>
                    <div className={cx("variant")}>
                      {variant.attributes.map((attr) => attr.label).join(" | ")}
                    </div>
                  </div>
                  <div className={cx("body-variant-service")}>
                    <div className={cx("box-image-sku")}>
                      <div className={cx("image-variant")}>
                        <label
                          htmlFor={`${index}-file`}
                          className={cx("image-label", {
                            "error-border":
                              variantErrors[index]?.includes("image"),
                          })}
                        >
                          {variant.imagePreview ? (
                            <img
                              src={variant.imagePreview}
                              alt="Preview"
                              className={cx("image-preview")}
                              width={100}
                              style={{ borderRadius: "5px" }}
                            />
                          ) : (
                            <img
                              src={proImage}
                              alt="Ảnh demo"
                              width={100}
                              style={{ borderRadius: "5px" }}
                            />
                          )}
                        </label>
                        <input
                          type="file"
                          id={`${index}-file`}
                          hidden
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "image",
                              e.target.files?.[0] || null
                            )
                          }
                        />
                      </div>
                      <div className={cx("form-group")}>
                        <label htmlFor="">Mã sản phẩm</label>
                        <input
                          type="text"
                          value={variant.sku}
                          onChange={(e) =>
                            handleInputChange(index, "sku", e.target.value)
                          }
                          placeholder="Nhập mã của biến thể sản phẩm"
                          className={
                            variantErrors[index]?.includes("sku")
                              ? cx("error-input")
                              : ""
                          }
                        />
                      </div>
                    </div>
                    <div className={cx("box-price")}>
                      <div className={cx("form-group-price")}>
                        <label htmlFor="">Giá sản phẩm ( đ)</label>
                        <input
                          type="number"
                          value={variant.price}
                          placeholder="Nhập giá của biến thể sản phẩm"
                          onChange={(e) =>
                            handleInputChange(index, "price", e.target.value)
                          }
                          className={
                            variantErrors[index]?.includes("price")
                              ? cx("error-input")
                              : ""
                          }
                        />
                      </div>
                    </div>
                    <div className={cx("box-weight-quantity")}>
                      <div className={cx("form-group-weight")}>
                        <label htmlFor="">Cân nặng sản phẩm (kg)</label>
                        <input
                          type="text"
                          placeholder="Cân nặng của biến thể này "
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "weight",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className={cx("form-group-quantity")}>
                        <label htmlFor="">Số lượng sản phẩm</label>
                        <input
                          type="number"
                          value={variant.quantity}
                          placeholder="Nhập số lượng của biến thể"
                          onChange={(e) =>
                            handleInputChange(index, "quantity", e.target.value)
                          }
                          className={
                            variantErrors[index]?.includes("quantity")
                              ? cx("error-input")
                              : ""
                          }
                        />
                      </div>
                    </div>
                    <div className={cx("box-description")}>
                      <div className={cx("form-group-description")}>
                        <label htmlFor="">Mô tả sản phẩm</label>
                        <textarea
                          name=""
                          id=""
                          placeholder="Mô tả của biến thể này"
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className={cx("del-variant")}>
                    <button
                      className={cx("delete-button")}
                      onClick={() => handleRemoveVariant(index)}
                      type="button"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              ))}
              <div className={cx("box-action")}>
                <button type="button" className={cx("btn-save-varriant")} onClick={hanleSaveVariant}>Lưu thay đổi</button>
                <button type="button" className={cx("btn-unsave")}  >Huỷ</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductVariantForm;
