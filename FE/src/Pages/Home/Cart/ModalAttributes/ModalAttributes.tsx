import React, { useEffect, useState } from "react";
import { variantProduct } from "../../../../interfaces/admin/Api";
import classNames from "classnames/bind";
import style from "./ModalAttributes.module.scss";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { editVariantCart } from "../../../../Features/Slices/cartSlice";
const cx = classNames.bind(style);
interface props {
  id: number;
  variant: variantProduct[] | null;
  onClose: () => void;
  defaultVariant: variantProduct | null;
}
const ModalAttributes: React.FC<props> = ({
  id,
  variant,
  onClose,
  defaultVariant,
}) => {
  const [selectedAttributes, setSelectedAttributes] = useState<{
    [key: number]: number;
  }>({});
  const [selectedVariant, setSelectedVariant] = useState<variantProduct | null>(
    null
  );
  const attributesMap = new Map<
    number,
    { id: number; value: string; name: string; atribute: number }[]
  >();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (defaultVariant?.variant_attribute_value) {
      setSelectedAttributes(() => {
        const newAttributes: { [key: number]: number } = {};
        defaultVariant.variant_attribute_value.forEach((d) => {
          newAttributes[d.attribute_id] = d.attribute_value_id;
        });
        return newAttributes;
      });

      setSelectedVariant(defaultVariant);
    }
  }, [defaultVariant]);

  if (variant) {
    variant.forEach((variantItem) => {
      variantItem.variant_attribute_value.forEach(
        ({ attribute_id, attribute_value, attribute }) => {
          if (!attributesMap.has(attribute_id)) {
            attributesMap.set(attribute_id, []);
          }
          const existingValues = attributesMap.get(attribute_id)!;
          if (!existingValues.some((v) => v.id === attribute_value.id)) {
            existingValues.push({
              id: attribute_value.id,
              value: attribute_value.value,
              name: attribute.name,
              atribute: variantItem.id,
            });
          }
        }
      );
    });
  }
  const handleSelectAttribute = (attributeId: number, valueId: number) => {
    const newSelection = { ...selectedAttributes, [attributeId]: valueId };
    console.log(newSelection);

    setSelectedAttributes(newSelection);

    const foundVariant = variant?.find((variant) =>
      variant.variant_attribute_value.every(
        ({ attribute_id, attribute_value }) =>
          newSelection[attribute_id] === attribute_value.id
      )
    );

    setSelectedVariant(foundVariant || null);
  };
  const handleConfirm = () => {
    if (selectedVariant && selectedVariant.id !== defaultVariant?.id) {
      const data = {
        id:id,
        variant_id:selectedVariant?.id
      };
      dispatch(editVariantCart(data));
    } else {
      onClose();
    }
  };

  return (
    <div className={cx("modal-variant")}>
      <div className={cx("variant-container")}>
        {[...attributesMap.entries()].map(([attributeId, values]) => (
          <div key={attributeId} className={cx("attribute-section")}>
            <h3 className={cx("attribute-title")}>{values[0].name}</h3>
            <div className={cx("attribute-row")}>
              {values.map(({ id, value, name, atribute }) => {
                const variantWithStock =
                  variant &&
                  variant.find((variant) =>
                    variant.variant_attribute_value.some(
                      (attr) => attr.attribute_value.id === id
                    )
                  );
                const isOutOfStock = variantWithStock?.quantity === 0;

                return (
                  <button
                    key={id}
                    className={cx("attribute-btn", {
                      selected: selectedAttributes[attributeId] === id,
                      "out-of-stock": isOutOfStock,
                      "image-btn": name === "Màu sắc",
                    })}
                    onClick={() =>
                      !isOutOfStock && handleSelectAttribute(attributeId, id)
                    }
                    disabled={isOutOfStock}
                  >
                    {name == "Màu sắc" && Array.isArray(variant)
                      ? variant.map((v) =>
                          v?.id === atribute ? (
                            v?.image ? (
                              <img
                                key={v.id}
                                src={`http://127.0.0.1:8000/storage/variant/${v?.image}`}
                                className={cx("image-variant")}
                                alt="Variant"
                              />
                            ) : (
                              <span key={v.id} className={cx("fallback-text")}>
                                {value}
                              </span>
                            )
                          ) : null
                        )
                      : value}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className={cx("action-btn")}>
        <button className={cx("back")} onClick={onClose}>
          Trở Lại
        </button>
        <button className={cx("confirm")} onClick={handleConfirm}>
          Xác Nhận
        </button>
      </div>
    </div>
  );
};

export default ModalAttributes;
