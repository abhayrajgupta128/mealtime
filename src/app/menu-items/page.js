"use client";

import { useProfile } from "../components/UseProfile";
import UserTabs from "../components/layout/UserTabs";
import Link from "next/link";
import Right from "../components/icons/Right";
import { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";

const MenuItemsPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const { loading, data } = useProfile();

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        setMenuItems(menuItems);
      });
    });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!data.admin) return <p>Not an admin</p>;

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <Link
          href="/menu-items/new"
          className="button flex items-center space-x-2"
        >
          <span>Add new menu item</span>
          <Right />
        </Link>
      </div>
      <div>
        <h2 className="text-sm text-gray-500 mt-8">Edit menu item:</h2>
        <div className="grid sm:grid-cols-3 gap-4 mt-4">
          {menuItems?.length > 0 &&
            menuItems.map((item) => (
              <Link
                key={item._id}
                href={"/menu-items/edit/" + item._id}
                className="bg-gray-200 rounded-lg p-4 hover:bg-gray-300 transition-colors"
              >
                <div className="relative flex justify-center items-center h-48">
                  <Image
                    className="rounded-md object-cover"
                    src={item.image}
                    alt={item.name}
                    width={200}
                    height={200}
                    priority
                  />
                </div>
                <div className="text-center mt-2 font-semibold text-gray-700">
                  {item.name}
                </div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
};

export default MenuItemsPage;
