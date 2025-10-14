"use client";

import Sidebar from "@/components/sidebar/sidebar";
import styles from "../category/category.module.css";
import { FaCirclePlus } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { useData, Category } from "../../../Providers/dataProvider";

const Categories = () => {
  const {
    categories,
    fetchCategories,
    createCategory,
    deleteCategory,
    updateCategory,
    uploadCategoryImage,
  } = useData();

  const [modalOpen, setModalOpen] = useState(false);
  const [isEditmodalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedCategoryToDelete, setSelectedCategoryToDelete] = useState<
    number | null
  >(null);

  // State for adding a new category

  // State for editing a category

  return (
    <div className={styles.categoryContainer}>
      <div className={styles.sidebarComponent}>
        <Sidebar />
      </div>
      <div className={styles.categoryPage}>
        <div className={styles.categoryWrapper}>
          <h1 className={styles.categoryTitle}>Categories</h1>
          <button className={styles.addCategoryButton}>
            <FaCirclePlus />
            Add Category
          </button>
        </div>

        {modalOpen && (
          <div className={styles.categoryModal}>
            <IoMdClose className={styles.catBTNCLOSE} />
            <div className={styles.modalContant}>
              <h2 className={styles.AddCaegoryTitle}>Add Category</h2>
              <form className={styles.categoryForm}>
                <div className={styles.categoryInputGroup}>
                  <label className={styles.categoryInputLabel} htmlFor="name">
                    Name
                  </label>
                  <input
                    className={styles.categoryInput}
                    type="text"
                    name="Name"
                    required
                  />
                </div>
                <div className={styles.categoryInputGroup}>
                  <label className={styles.categoryInputLabel} htmlFor="slug">
                    Slug
                  </label>
                  <input
                    className={styles.categoryInput}
                    type="text"
                    name="slug"
                    required
                  />
                </div>
                <div className={styles.categoryInputGroup}>
                  <label
                    className={styles.categoryInputLabel}
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <input
                    className={styles.categoryInput}
                    type="text"
                    name="description"
                  />
                </div>
                <div className={styles.categoryInputGroup}>
                  <label
                    className={styles.categoryInputLabel}
                    htmlFor="imageFile"
                  >
                    Cover Image
                  </label>
                  <input
                    className={styles.categoryInput}
                    type="file"
                    required
                  />
                </div>
                <button
                  className={styles.categorySave}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </form>
            </div>
          </div>
        )}
        {isEditmodalOpen && (
          <div className={styles.categoryModal}>
            <IoMdClose className={styles.catBTNCLOSE} />
            <div className={styles.modalContant}>
              <h2 className={styles.AddCaegoryTitle}>Edit Category</h2>
              <form className={styles.categoryForm}>
                <div className={styles.categoryInputGroup}>
                  <label className={styles.categoryInputLabel} htmlFor="Name">
                    Name
                  </label>
                  <input
                    className={styles.categoryInput}
                    type="text"
                    name="Name"
                  />
                </div>
                <div className={styles.categoryInputGroup}>
                  <label className={styles.categoryInputLabel} htmlFor="slug">
                    Slug
                  </label>
                  <input
                    className={styles.categoryInput}
                    type="text"
                    name="slug"
                  />
                </div>
                <div className={styles.categoryInputGroup}>
                  <label
                    className={styles.categoryInputLabel}
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <input
                    className={styles.categoryInput}
                    type="text"
                    name="description"
                  />
                </div>
                <div className={styles.categoryInputGroup}>
                  <label
                    className={styles.categoryInputLabel}
                    htmlFor="imageFile"
                  >
                    Change Cover Image
                  </label>
                  <input
                    className={styles.categoryInput}
                    type="file"
                    name="imageFile"
                  />
                </div>
                <button
                  className={styles.categorySave}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Confirmation Modal */}
        {showConfirmModal && (
          <div className={styles.categoryModal}>
            <div className={styles.confirmModalContent}>
              <p>Are you sure you want to delete this category?</p>
              <div className={styles.confirmButtons}>
                <button className={styles.confirmYes}>Yes</button>
                <button className={styles.confirmNo}>No</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
