"use client";

import { useState } from "react";
import { IoClose } from "react-icons/io5";
import styles from "../../app/pages/store/store.module.css";
import { useData, Category } from "../../Providers/dataProvider";

interface EditProductModalProps {
  product: any;
  onClose: () => void;
  onSave: (updatedProduct: any) => void;
  categories: Category[];
}

export default function EditProductModal({
  product,
  onClose,
  onSave,
  categories,
}: EditProductModalProps) {
  const { uploadImage } = useData();
  const [file, setFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    name: product.name || "",
    brand: product.brand || "",
    price: product.price || "",
    Category_id: product.Category_id || null,
    discount: product.discount || "",
    description: product.description || "",
    Stock_Quantity: product.Stock_Quantity || "",
    is_new_arrival: product.is_new_arrival ? "true" : "false",
    is_flashSale: product.is_flashSale ? "true" : "false",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let imageUrl = product.image_url;
    if (file) {
      imageUrl = await uploadImage(file, product.id);
    }

    const updatedProduct = {
      id: product.id,
      name: formData.name,
      brand: formData.brand,
      price: parseFloat(formData.price),
      Category_id: parseInt(formData.Category_id as string),
      discount: formData.discount ? parseFloat(formData.discount) : null,
      description: formData.description,
      Stock_Quantity: parseInt(formData.Stock_Quantity),
      is_new_arrival: formData.is_new_arrival === "true",
      is_flashSale: formData.is_flashSale === "true",
      image_url: imageUrl,
    };

    onSave(updatedProduct);
  };

  return (
    <div className={styles.modal}>
      <IoClose className={styles.closeBtn} onClick={onClose} />
      <h2 className={styles.editTitle}>Edit Product</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.imageInput}>
          <input
            className={styles.Circleinput}
            type="file"
            name="image"
            onChange={handleFileChange}
          />
        </div>
        <div className={styles.editContainer}>
          <div className={styles.formgroup}>
            <label>Product Name</label>
            <input
              className={styles.input}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formgroup}>
            <label>Brand</label>
            <input
              className={styles.input}
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formgroup}>
            <label>Price</label>
            <input
              className={styles.input}
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formgroup}>
            <label htmlFor="Category_id">Category</label>
            <select
              name="Category_id"
              id="Category_id"
              value={formData.Category_id || ""}
              onChange={handleChange}
              className={styles.input}
            >
              <option value="">Select a Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.Name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formgroup}>
            <label>Discount</label>
            <input
              className={styles.input}
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formgroup}>
            <label htmlFor="Stock_Quantity">Stock Quantity</label>
            <input
              type="number"
              className={styles.input}
              name="Stock_Quantity"
              value={formData.Stock_Quantity}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formgroup}>
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className={styles.formgroup}>
            <label htmlFor="is_new_arrival">New Arrival?</label>
            <select
              name="is_new_arrival"
              className={styles.input}
              value={formData.is_new_arrival}
              onChange={handleChange}
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
          <div className={styles.formgroup}>
            <label htmlFor="is_flashSale">Flash Sale?</label>
            <select
              name="is_flashSale"
              className={styles.input}
              value={formData.is_flashSale}
              onChange={handleChange}
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
          <div className={styles.formgroup}>
            <label htmlFor="productImage">Product Versions</label>
            <input
              className={styles.input}
              type="file"
              name="productImage"
              onChange={handleFileChange}
              multiple
            />
          </div>
        </div>
        <button type="submit" className={styles.SaveBtn}>
          Save
        </button>
      </form>
    </div>
  );
}
