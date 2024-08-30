"use client";

import toast from "react-hot-toast";
import UserTabs from "../components/layout/UserTabs";
import { useProfile } from "../components/UseProfile";
import { useEffect, useState } from "react";
import DeleteButton from "../components/DeleteButton";

const CategoriesPage = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const { loading: profileLoading, data: profileData } = useProfile();
  const [editedCategory, setEditedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  };

  const handleCategorySubmit = async (ev) => {
    ev.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
      const data = { name: categoryName };
      if (editedCategory) data._id = editedCategory._id;
      const response = await fetch("/api/categories", {
        method: editedCategory ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setCategoryName("");
      fetchCategories();
      setEditedCategory(null);
      if (response.ok) resolve();
      else reject();
    });
    toast.promise(creationPromise, {
      loading: editedCategory ? "Updating category..." : "Creating category...",
      success: editedCategory ? "Updated category" : "Category created",
      error: editedCategory
        ? "Error updating category"
        : "Error creating category",
    });
  };

  const handleDeleteClick = async (_id) => {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/categories?_id=" + _id, {
        method: "DELETE",
      });
      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(promise, {
      loading: "Deleting category...",
      success: "Category deleted",
      error: "Error deleting category",
    });
    fetchCategories();
  };

  if (profileLoading) return <p>Loading...</p>;
  if (!profileData.admin) return <p>Not an admin</p>;

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <form className="mt-8" onSubmit={handleCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>
              {editedCategory ? "Update Category" : "New Category"}
              {editedCategory && (
                <>
                  : <b>{editedCategory.name}</b>
                </>
              )}
            </label>
            <input
              type="text"
              placeholder="Category name"
              value={categoryName}
              onChange={(ev) => setCategoryName(ev.target.value)}
            />
          </div>
          <div className="pb-2 flex gap-2">
            <button type="submit">
              {editedCategory ? "Update" : "Create"}
            </button>

            <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setCategoryName("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
      <div>
        <h2 className="mt-8 text-sm text-gray-500">Existing Categories</h2>
        {categories?.length > 0 &&
          categories.map((category) => (
            <div
              key={category._id}
              className="bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center"
            >
              <div className="grow">{category.name}</div>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setEditedCategory(category);
                    setCategoryName(category.name);
                  }}
                >
                  Edit
                </button>
                
                <DeleteButton
                  label="Delete"
                  onDelete={() => handleDeleteClick(category._id)}
                />
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default CategoriesPage;
