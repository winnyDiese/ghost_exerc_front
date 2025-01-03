"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

// Définir le type pour `newUser`
interface User {
  name: string;
  email: string;
  password: string;
}

const API_URL = "http://localhost:3001/api/users";

const addUser = async (newUser: User): Promise<User> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser)
  })

  if(!response.ok) throw new Error("Failed to add user")

  return response.json()
}


const AddUserForm: React.FC = () => {
    const queryClient = useQueryClient()
  const [newUser, setNewUser] = useState<User>({ name: "", email: "", password: "" });

     // Add user mutation
  // const mutation = useMutation<User>(addUser, {
  //   onSuccess: () => {
  //     // Refetch users after adding a new user
  //     queryClient.invalidateQueries(['users'])
  //   }
  // })

  const {mutateAsync:addUserMutation} = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      // Refetch users after adding a new user
      queryClient.invalidateQueries({queryKey: ['users']})
    }
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = async () => {
    if (newUser.name.trim() && newUser.email.trim() && newUser.password.trim()) {
      // // Assurez-vous que `mutation` est défini et correctement typé dans votre projet
      // addUserMutate(newUser);
      // setNewUser({ name: "", email: "", password: "" });

      try {
        
        await addUserMutation(newUser)
        setNewUser({ name: "", password: "", email: "" })
      } catch (e) {
        console.error(e)
      }

    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-4xl flex pb-10">
          {/* Form */}
          <div className="flex-1 p-6 bg-white shadow rounded-lg border border-gray-200 mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add a New User</h2>
              <form
              onSubmit={(e) => {
                  e.preventDefault();
                  handleAddUser();
              }}
              >
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                    Name
                    </label>
                    <input
                    type="text"
                    id="name"
                    name="name"
                    value={newUser.name}
                    onChange={handleChange}
                    className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Enter user name"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Email
                    </label>
                    <input
                    type="email"
                    id="email"
                    name="email"
                    value={newUser.email}
                    onChange={handleChange}
                    className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Enter user email"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                    Password
                    </label>
                    <input
                    type="password"
                    id="password"
                    name="password"
                    value={newUser.password}
                    onChange={handleChange}
                    className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Enter user password"
                    />
                </div>

                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                >
                    Add User
                </button>
              </form>
          </div>
        </div>
    </div>
  )

};

export default AddUserForm;
