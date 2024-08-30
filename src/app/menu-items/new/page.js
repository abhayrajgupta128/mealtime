"use client";

import {useProfile} from "../../components/UseProfile";
import UserTabs from "../../components/layout/UserTabs";
import { toast } from "react-hot-toast";
import { useState } from "react";
import Link from "next/link";
import Left from "@/app/components/icons/Left";
import { redirect } from "next/navigation";
import MenuItemForm from "../../components/layout/MenuItemForm";

const NewMenuItemPage = () => {
  const [redirectToItems, setRedirectToItems] = useState(false);
  const { loading, data } = useProfile();

  if (loading) return <p>Loading...</p>;
  if (!data.admin) return <p>Not an admin</p>;

  const handleFormSubmit = async (ev, data) => {
    ev.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "POST",
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

  if (redirectToItems) {
    return redirect("/menu-items");
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="max-w-2xl mx-auto mt-8">
        <Link href="../menu-items" className="button">
          <Left />
          <span>Show all menu items</span>
        </Link>
      </div>
      <MenuItemForm onSubmit={handleFormSubmit} menuItem={null} />
    </section>
  );
};

export default NewMenuItemPage;
