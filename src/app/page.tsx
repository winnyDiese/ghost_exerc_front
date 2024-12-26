"use client"
import React, {useState} from "react"
import {useQuery} from "@tanstack/react-query"


interface Todo{
  title: string,
  description: string
}

interface User{
  name: string,
  email: string,
  password: string
}

// const API_URL = "https://jsonplaceholder.typicode.com/posts";
const API_URL = "http://localhost:3001/api/users";

// Fectch data, react-query
const fetchTodos = async (): Promise<User> => {
  const response = await fetch(API_URL)
  
  if (!response.ok) {
    throw new Error("Failed to fetch users")
  }
  return response.json()

}


const addUser = async (newUser: User): Promise<User> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUSer)
  })

  if(!response.ok) throw new Error("Failed to add user")

  return response.json()

}


// Component
const Home: React.FC = ()=> {


  const [newTodo, setNewTodo] = useState<Todo>({title:"", description:""})
  // const [newUser, setNewUser] = useState<User>({ name:"", password:"", email:"" })

  // Fetch todos using react-query
  const {data: users = [], isLoading, isError} = useQuery<User>({
    queryKey: ["users"],
    queryFn: fetchTodos
  })


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value } = e.target
    setNewTodo((prev) => ({...prev, [name]:value}))
  }

  const handleAddTodo = () => {
    if(newTodo.title.trim() && newTodo.description.trim()){
      setTodos((prev) => [...prev, newTodo])
      setNewTodo({title:"", description:""})
    }
  }


  if (isLoading) {
    return <div className="text-center text-blue-600">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center text-red-600">Error fetching todos!</div>;
  }

  return (

    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">My To-Do List</h1>

      <div className="w-full max-w-4xl flex pb-10">

        {/* Form */}
        <div className="flex-1 p-6 bg-white shadow rounded-lg border border-gray-200 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add a New Todo</h2>
          
          <form 
            onSubmit={(e)=>{
              e.preventDefault()
              handleAddTodo()
            }}
          >
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={newTodo.title}
                onChange={handleChange}
                className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter todo title"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={newTodo.description}
                onChange={handleChange}
                className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                rows={3}
                placeholder="Enter todo description"
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Add Todo
            </button>
          </form>

        </div>
          
        {/* List */}
        <div className="flex-1 space-y-4 pl-2 pb-10">
          {users.map((user: User, index: number) => (
            <div key={index} className="p-4 bg-white shadow rounded-lg border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
              <p className="text-gray-600 text-sm">{user.email}</p>
            </div>
          ))}
        </div>

      </div>

    </div>
  )
}

export default Home