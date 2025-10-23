"use client";

import Sidebar from "@/components/sidebar/sidebar";
import styles from "./category.module.css";
import { FaCirclePlus } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { useData, Category } from "../../../Providers/dataProvider";
import { Ellipsis } from "lucide-react";

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
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const [activeCategoryId, setActiveCategoryId] = useState(null);

  const toggleEditor = (id: any) => {
    setActiveCategoryId((prevId) => (prevId === id ? null : id));
  };

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (
        !e.target.closest(`.${styles.catButtons}`) &&
        !e.target.closest(`.${styles.act}`)
      ) {
        setActiveCategoryId(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const openEditor = () => {
    setIsEditorOpen(!isEditorOpen);
  };

  // State for adding a new category
  const [newCategoryData, setNewCategoryData] = useState({
    Name: "",
    slug: "",
    description: "",
    imageFile: null as File | null,
  });

  // State for editing a category
  const [editedCategoryData, setEditedCategoryData] = useState<
    Partial<Category>
  >({});
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleisEditModalOpen = (category: Category) => {
    setSelectedCategory(category);
    setEditedCategoryData(category); // Set the initial values for the edit form
    setIsEditModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setNewCategoryData({
      Name: "",
      slug: "",
      description: "",
      imageFile: null,
    });
  };

  const handleisEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedCategory(null);
    setEditedCategoryData({});
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (
        newCategoryData.Name.trim() === "" ||
        newCategoryData.slug.trim() === "" ||
        !newCategoryData.imageFile
      ) {
        console.error("Name, Slug, and a cover image are required.");
        return;
      }

      const imageUrl = await uploadCategoryImage(newCategoryData.imageFile);

      await createCategory({
        Name: newCategoryData.Name,
        slug: newCategoryData.slug,
        description: newCategoryData.description,
        image_url: imageUrl,
      });

      handleModalClose(); // Close modal on success
    } catch (error) {
      console.error("Error creating category:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!selectedCategory) return;

      // Handle image upload if a new file is selected
      let imageUrl = editedCategoryData.image_url;
      if (editedCategoryData.imageFile) {
        imageUrl = await uploadCategoryImage(editedCategoryData.imageFile);
      }

      await updateCategory(selectedCategory.id, {
        Name: editedCategoryData.Name,
        slug: editedCategoryData.slug,
        description: editedCategoryData.description,
        image_url: imageUrl,
      });

      handleisEditModalClose();
    } catch (error) {
      console.error("Error updating category:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      await deleteCategory(id);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleDeleteCategoryClick = (id: number) => {
    setSelectedCategoryToDelete(id);
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    if (selectedCategoryToDelete !== null) {
      handleDeleteCategory(selectedCategoryToDelete);
      setSelectedCategoryToDelete(null);
    }
    setShowConfirmModal(false);
  };

  const cancelDelete = () => {
    setSelectedCategoryToDelete(null);
    setShowConfirmModal(false);
  };

  return (
    <div className={styles.categoryContainer}>
      <div className={styles.categoryPage}>
        <div className={styles.categoryWrapper}>
          <h1 className={styles.categoryTitle}>Categories</h1>
          <button
            onClick={handleModalOpen}
            className={styles.addCategoryButton}
          >
            <FaCirclePlus />
            Add Category
          </button>
          <div className={styles.categoryBox}>
            {categories.map((category: Category) => (
              <div key={category.id} className={styles.categoryItem}>
                <img
                  className={styles.categoryImage}
                  src={category.image_url}
                />
                <span className={styles.categoryName}>{category.Name}</span>
                <span
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleEditor(category.id)}
                  className={styles.act}
                >
                  •••
                </span>

                {activeCategoryId === category.id && (
                  <div className={styles.catButtons}>
                    <button
                      onClick={() => handleisEditModalOpen(category)}
                      className={styles.catEditButtons}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCategoryClick(category.id)}
                      className={styles.catDeleteButtons}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {modalOpen && (
          <div className={styles.categoryModal}>
            <IoMdClose
              onClick={handleModalClose}
              className={styles.catBTNCLOSE}
            />
            <div className={styles.modalContant}>
              <h2 className={styles.AddCaegoryTitle}>Add Category</h2>
              <form
                className={styles.categoryForm}
                onSubmit={handleCreateCategory}
              >
                <div className={styles.categoryInputGroup}>
                  <label className={styles.categoryInputLabel} htmlFor="name">
                    Name
                  </label>
                  <input
                    className={styles.categoryInput}
                    type="text"
                    name="Name"
                    value={newCategoryData.Name}
                    onChange={(e) =>
                      setNewCategoryData({
                        ...newCategoryData,
                        Name: e.target.value,
                      })
                    }
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
                    value={newCategoryData.slug}
                    onChange={(e) =>
                      setNewCategoryData({
                        ...newCategoryData,
                        slug: e.target.value,
                      })
                    }
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
                    value={newCategoryData.description}
                    onChange={(e) =>
                      setNewCategoryData({
                        ...newCategoryData,
                        description: e.target.value,
                      })
                    }
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
                    name="imageFile"
                    onChange={(e) =>
                      setNewCategoryData({
                        ...newCategoryData,
                        imageFile: e.target.files?.[0] || null,
                      })
                    }
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
            <IoMdClose
              onClick={handleisEditModalClose}
              className={styles.catBTNCLOSE}
            />
            <div className={styles.modalContant}>
              <h2 className={styles.AddCaegoryTitle}>Edit Category</h2>
              <form
                className={styles.categoryForm}
                onSubmit={handleEditCategory}
              >
                <div className={styles.categoryInputGroup}>
                  <label className={styles.categoryInputLabel} htmlFor="Name">
                    Name
                  </label>
                  <input
                    className={styles.categoryInput}
                    type="text"
                    name="Name"
                    value={editedCategoryData.Name || ""}
                    onChange={(e) =>
                      setEditedCategoryData({
                        ...editedCategoryData,
                        Name: e.target.value,
                      })
                    }
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
                    value={editedCategoryData.slug || ""}
                    onChange={(e) =>
                      setEditedCategoryData({
                        ...editedCategoryData,
                        slug: e.target.value,
                      })
                    }
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
                    value={editedCategoryData.description || ""}
                    onChange={(e) =>
                      setEditedCategoryData({
                        ...editedCategoryData,
                        description: e.target.value,
                      })
                    }
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
                    onChange={(e) =>
                      setEditedCategoryData({
                        ...editedCategoryData,
                        imageFile: e.target.files?.[0] || null,
                      })
                    }
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
                <button onClick={confirmDelete} className={styles.confirmYes}>
                  Yes
                </button>
                <button onClick={cancelDelete} className={styles.confirmNo}>
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
