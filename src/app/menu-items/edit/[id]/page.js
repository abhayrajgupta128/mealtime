"use client";

import {useProfile} from "../../../components/UseProfile";
import UserTabs from "../../../components/layout/UserTabs";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import Link from "next/link";
import Left from "@/app/components/icons/Left";
import { redirect, useParams } from "next/navigation";
import MenuItemForm from "../../../components/layout/MenuItemForm";
import DeleteButton from "../../../components/DeleteButton";

const EditMenuItemPage = () => {
  const { id } = useParams();
  const [menuItem, setMenuItem] = useState(null);
  const [redirectToItems, setRedirectToItems] = useState(false);
  const { loading, data } = useProfile();

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        const item = menuItems.find((i) => i._id === id);
        setMenuItem(item);
      });
    });
  }, []);

  const handleFormSubmit = async (ev, data) => {
    ev.preventDefault();
    data = { ...data, _id: id };
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: "Item saved",
      error: "Error saving item",
    });

    setRedirectToItems(true);
  };

  const handleDeleteClick = async () => {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items?_id=" + id, {
        method: "DELETE",
      });
      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(promise, {
      loading: "Deleting item...",
      success: "Item deleted",
      error: "Error deleting item",
    });

    setRedirectToItems(true);
  };

  if (redirectToItems) {
    return redirect("/menu-items");
  }
  if (loading) return <p>Loading...</p>;
  if (!data.admin) return <p>Not an admin</p>;

  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="max-w-2xl mx-auto mt-8">
        <Link href="/menu-items" className="button">
          <Left />
          <span>Show all menu items</span>
        </Link>
      </div>
      <MenuItemForm onSubmit={handleFormSubmit} menuItem={menuItem} />
      <div className="sm:max-w-2xl mx-auto mt-2">
        <div className="md:max-w-md ml-auto pr-2">
          <DeleteButton
            label="Delete this menu item"
            onDelete={handleDeleteClick}
          />
        </div>
      </div>
    </section>
  );
};

export default EditMenuItemPage;
