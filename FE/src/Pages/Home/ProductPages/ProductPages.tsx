import  { useState } from "react";
import styles from "./ProductPages.module.scss";
import classNames from "classnames/bind";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { categoriesState, stateAttribute, stateProduct } from "../../../interfaces/admin/Api";

const cx = classNames.bind(styles);

const ProductPages = () => {
  const { products } = useAppSelector((state) => state.product);
  const { categories } = useAppSelector((state) => state.category);
  const { attribute } = useAppSelector((state) => state.attribute);

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedAttributes, setSelectedAttributes] = useState<{ [key: number]: number | null }>({});
  const [sortOrder, setSortOrder] = useState<string>("newest");

  const handleCategoryChange = (id: number) => {
    setSelectedCategory(id === selectedCategory ? null : id);
  };

  const handleAttributeChange = (attrId: number, valueId: number) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [attrId]: prev[attrId] === valueId ? null : valueId,
    }));
  };

  const filteredProducts = products.filter((product) => {
    if (selectedCategory && product.category_id !== selectedCategory) return false;
    return Object.entries(selectedAttributes).every(([attrId, valueId]) =>
      valueId ? product.variant.some((v) => v.variant_attribute_value.some((va) => va.attribute_id === Number(attrId) && va.attribute_value_id === valueId)) : true
    );
  }).sort((a, b) => (sortOrder === "newest" ? new Date(b.created_at).getTime() - new Date(a.created_at).getTime() : new Date(a.created_at).getTime() - new Date(b.created_at).getTime()));

  return (
    <div className={cx("filter-container")}>  
      <aside className={cx("sidebar")}>  
        <h3>Danh mục</h3>
        <ul>
          {categories?.original?.map((cat: categoriesState) => (
            <li key={cat.id} className={cx({ active: selectedCategory === cat.id })} onClick={() => handleCategoryChange(cat.id!)}>
              {cat.name}
            </li>
          ))}
        </ul>
        <h3>Thuộc tính</h3>
        {attribute.map((attr: stateAttribute) => (
          <div key={attr.id} className={cx("attribute-section")}>
            <h4>{attr.name}</h4>
            <ul>
              {attr.attribute_value.map((value) => (
                <li key={value.id} className={cx({ active: selectedAttributes[attr.id] === value.id })} onClick={() => handleAttributeChange(attr.id, value.id)}>
                  {value.value}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <h3>Sắp xếp</h3>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="newest">Mới nhất</option>
          <option value="oldest">Cũ nhất</option>
        </select>
      </aside>

      <section className={cx("product-grid")}>  
        {filteredProducts.length ? (
          filteredProducts.map((product: stateProduct) => (
            <div key={product.id} className={cx("product-card")}>
              <img src={`http://127.0.0.1:8000/storage/product/${product.image}`} alt={product.name} className={cx("product-image")} />
              <h3>{product.name}</h3>
              <p className={cx("price")}>{product.price.toLocaleString()}đ</p>
            </div>
          ))
        ) : (
          <p>Không có sản phẩm phù hợp.</p>
        )}
      </section>
    </div>
  );
};

export default ProductPages;
