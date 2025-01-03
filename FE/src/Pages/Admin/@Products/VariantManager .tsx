import React, { useState } from 'react';
import styles from './VariantManager.module.scss';

interface Variant {
  id: number;
  color: string;
  size: string;
  isEditing: boolean;
}

const VariantManager: React.FC = () => {
  const [variants, setVariants] = useState<Variant[]>([
    { id: 65, color: 'Đỏ', size: '64G', isEditing: false },
    { id: 66, color: 'Xanh', size: '128G', isEditing: false },
    { id: 67, color: 'Xanh', size: '64G', isEditing: false },
  ]);

  const toggleEdit = (id: number) => {
    setVariants((prev) =>
      prev.map((variant) =>
        variant.id === id ? { ...variant, isEditing: !variant.isEditing } : variant
      )
    );
  };

  const handleVariantChange = (id: number, field: keyof Variant, value: string) => {
    setVariants((prev) =>
      prev.map((variant) =>
        variant.id === id ? { ...variant, [field]: value } : variant
      )
    );
  };

  const deleteVariant = (id: number) => {
    setVariants((prev) => prev.filter((variant) => variant.id !== id));
  };

  return (
    <div className={styles.variantManager}>
      {variants.map((variant) => (
        <div key={variant.id} className={styles.variantRow}>
          <div className={styles.variantInfo}>
            <span className={styles.variantId}>#{variant.id}</span>
            <select
              className={styles.variantSelect}
              value={variant.color}
              onChange={(e) => handleVariantChange(variant.id, 'color', e.target.value)}
            >
              <option value="Đỏ">Đỏ</option>
              <option value="Xanh">Xanh</option>
              <option value="Vàng">Vàng</option>
            </select>
            <select
              className={styles.variantSelect}
              value={variant.size}
              onChange={(e) => handleVariantChange(variant.id, 'size', e.target.value)}
            >
              <option value="64G">64G</option>
              <option value="128G">128G</option>
              <option value="256G">256G</option>
            </select>
          </div>
          <div className={styles.variantActions}>
            <button onClick={() => toggleEdit(variant.id)}>Sửa</button>
            <button className={styles.deleteButton} onClick={() => deleteVariant(variant.id)}>
              Xoá
            </button>
          </div>
          <div
            className={`${styles.dropdownContent} ${
              variant.isEditing ? styles.open : ''
            }`}
          >
            <label>Mã sản phẩm:</label>
            <input
              type="text"
              placeholder={`Mã của biến thể #${variant.id}`}
              className={styles.input}
            />
            <label>Giá:</label>
            <input type="number" placeholder="Nhập giá" className={styles.input} />
            <button className={styles.saveButton}>Lưu thay đổi</button>
            <button
              className={styles.cancelButton}
              onClick={() => toggleEdit(variant.id)}
            >
              Hủy
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VariantManager;
