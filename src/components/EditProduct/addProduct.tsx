"use client";

import styles from "../../app/pages/store/store.module.css";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { useData, Category } from "../../Providers/dataProvider";

interface AddProductProps {
  onClose: () => void;
  categories: Category[];
}

const AddProduct = ({ onClose, categories }: AddProductProps) => {
  const { createProduct, uploadImage, uploadMultipleImages } = useData();
  const [loading, setLoading] = useState(false);
  const [availableSizes, setAvailableSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [productImages, setProductImages] = useState<File[]>([]);
  const [productImage, setProductImage] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    discount: "",
    description: "",
    Stock_Quantity: "",
    is_new_arrival: "false",
    is_flashSale: "false",
    Category_id: null as number | null,
  });

  /** Handle sizes input */
  const handleSizesChange = (sizesString: string) => {
    const sizesArray = sizesString
      .split(",")
      .map((size) => size.trim().toUpperCase())
      .filter(Boolean);
    setAvailableSizes(sizesArray);
  };

  /** Handle colors input */
  const handleColorsChange = (colorsString: string) => {
    const colorsArray = colorsString
      .split(",")
      .map((color) => color.trim().toLowerCase())
      .filter(Boolean);
    setColors(colorsArray);
  };

  /** Handle normal input changes */
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /** Handle main product image */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProductImage(e.target.files[0]);
    }
  };

  /** Handle multiple product version images */
  const handleVersionImagesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      setProductImages(Array.from(e.target.files));
    }
  };

  /** Submit handler */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!productImage) {
        console.error("Product image is required.");
        setLoading(false);
        return;
      }

      if (formData.Category_id === null) {
        console.error("Please select a category.");
        setLoading(false);
        return;
      }

      // Upload main product image
      const tempId = Math.random().toString(36).substring(2, 15);
      const imageUrl = await uploadImage(productImage, tempId);

      // Create product
      const newProductData = {
        name: formData.name,
        brand: formData.brand,
        price: parseFloat(formData.price),
        Category_id: formData.Category_id,
        discount: formData.discount ? parseFloat(formData.discount) : 0,
        description: formData.description,
        Stock_Quantity: parseInt(formData.Stock_Quantity),
        is_new_arrival: formData.is_new_arrival === "true",
        is_flashSale: formData.is_flashSale === "true",
        image_url: imageUrl,
        Product_images: [] as string[],
        sizes: availableSizes,
        colors: colors,
      };

      const createdProduct = await createProduct(newProductData);
      const newProductId = createdProduct.id;

      // Upload version images (merges inside provider, no duplicates)
      if (productImages.length > 0) {
        await uploadMultipleImages(productImages, newProductId);
      }

      onClose();
      console.log("Product added successfully!");
    } catch (error) {
      console.error("Failed to add product:", (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.addProduct}>
      <IoClose className={styles.closeBtn} onClick={onClose} />
      <h2 className={styles.editTitle}>Add Product</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.imageInput}>
          <label htmlFor="productImageInput" className={styles.imagePreview}>
            {productImage ? (
              <img
                src={URL.createObjectURL(productImage)}
                alt="Preview"
                className={styles.previewImage}
              />
            ) : (
              <span className={styles.placeholderText}>+</span>
            )}
          </label>
          <input
            id="productImageInput"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className={styles.hiddenInput}
            required
          />
        </div>

        <div className={styles.editContainer}>
          <div className={styles.formgroup}>
            <label htmlFor="name">Product Name</label>
            <input
              className={styles.input}
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formgroup}>
            <label htmlFor="brand">Brand</label>
            <input
              className={styles.input}
              type="text"
              name="brand"
              placeholder="Brand"
              value={formData.brand}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formgroup}>
            <label htmlFor="price">Price</label>
            <input
              className={styles.input}
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
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
              required
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
            <label htmlFor="discount">Discount</label>
            <input
              className={styles.input}
              type="number"
              name="discount"
              placeholder="Discount"
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
          <div className={`${styles.descArea} ${styles.formgroup}`}>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
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
            <label htmlFor="sizes">Sizes (e.g., S, M, L)</label>
            <input
              style={{ textTransform: "uppercase" }}
              className={styles.input}
              type="text"
              id="sizes"
              name="sizes"
              onChange={(e) => handleSizesChange(e.target.value)}
            />
          </div>

          <div className={styles.formgroup}>
            <label htmlFor="colors">Colors (e.g.blue, green)</label>
            <input
              className={styles.input}
              type="text"
              id="colors"
              name="colors"
              onChange={(e) => handleColorsChange(e.target.value)}
            />
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
              onChange={handleVersionImagesChange}
              multiple
            />
          </div>
        </div>
        <button className={styles.SaveBtn} type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
      {loading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.66)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          <div
            className="spinner"
            style={{
              border: "6px solid #f3f3f3",
              borderTop: "6px solid #007bff",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              animation: "spin 1s linear infinite",
            }}
          />
          <style jsx>{`
            @keyframes spin {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
