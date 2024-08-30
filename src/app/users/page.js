"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import UserTabs from "../components/layout/UserTabs";
import {useProfile} from "../components/UseProfile";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const { loading, data } = useProfile();

  useEffect(() => {
    fetch("/api/users").then((response) => {
      response.json().then((users) => {
        setUsers(users);
      });
    });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!data.admin) return <p>Not an admin</p>;

  return (
    <section className="max-w-2xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
    <UserTabs isAdmin={true} />
    <div className="mt-8">
      {users?.length > 0 && users.map(user => (
        <div
          key={user._id}
          className="bg-gray-100 rounded-lg mb-4 p-4 flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 grow">
            <div className="text-gray-900">
              {!!user.name ? (
                <span>{user.name}</span>
              ) : (
                <span className="italic">No name</span>
              )}
            </div>
            <span className="text-gray-500">{user.email}</span>
          </div>
          <div className="w-full md:w-auto flex justify-end md:justify-start">
            <Link className="button text-center md:text-left w-full md:w-auto" href={'/users/' + user._id}>
              Edit
            </Link>
          </div>
        </div>
      ))}
    </div>
  </section>
  
  );
};

export default UsersPage;
