"use client";

import Sidebar from "@/components/sidebar/sidebar";
import ProductCard from "@/components/productList/productCard";
import styles from "./store.module.css";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useData } from "../../../Providers/dataProvider";
import EditProductModal from "@/components/EditProduct/EditProductModal";
import AddProduct from "@/components/EditProduct/addProduct";
import Masonry from "react-masonry-css";

const Store = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { products, categories, loading, error, fetchProducts, updateProduct } =
    useData();

  const closeBtn = () => {
    setIsOpen(false);
  };

  const closeProductBtn = () => {
    setIsProductOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const openProductModal = () => {
    setIsProductOpen(true);
  };

  const handleSave = async (updatedProduct: any) => {
    const { id, ...updates } = updatedProduct;

    try {
      // ✅ Pass the id and the rest of the updates separately
      await updateProduct(id, updates);
      setIsOpen(false); // Close modal
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const openEditModal = (product: any) => {
    setSelectedProduct(product); // store the clicked product
    setIsOpen(true); // open modal
  };

  if (loading)
    return (
      <div className="loading">
        <div
          className="spinner"
          style={{
            border: "6px solid #f3f3f3",
            borderTop: "6px solid #007bff",
            borderRadius: "50%",
            width: "100px",
            height: "100px",
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
    );
  if (error) return <div>Error: {error}</div>;

  const breakpointColumnsObj = {
    default: 3,
    1024: 2,
    768: 1,
  };

  return (
    <main className={styles.OrderPageContainer}>
      <div className={styles.sidebarComponent}>
        <Sidebar />
      </div>
      <div className={styles.ProductsView}>
        <div className={styles.editHead}>
          <div className={styles.searchContainer}>
            <FiSearch />
            <input type="search" placeholder="Search Here" />
          </div>

          <button onClick={openProductModal}>
            <IoMdAddCircleOutline />
            Add Product
          </button>
        </div>
        <div className={styles.productListSection}>
          {/* {products.map((product) => (
            <ProductCard
              key={product.id}
              onEdit={() => openEditModal(product)}
              product={product}
            />
          ))} */}

          <Masonry
            breakpointCols={breakpointColumnsObj}
            className={styles.myMasonryGrid}
            columnClassName={styles.myMasonryGridColumn}
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                onEdit={() => openEditModal(product)}
                product={product}
              />
            ))}
          </Masonry>

          {isOpen && selectedProduct && (
            <EditProductModal
              product={selectedProduct}
              onClose={closeBtn}
              onSave={handleSave}
              categories={categories}
            />
          )}

          {isProductOpen && (
            <AddProduct onClose={closeProductBtn} categories={categories} />
          )}
        </div>
      </div>
    </main>
  );
};

export default Store;
