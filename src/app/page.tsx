"use client"
import React, {useState} from "react"
import {useQuery, QueryClient, QueryClientProvider} from "@tanstack/react-query"


interface Todo{
  title: string,
  description: string
}

const API_URL = "https://jsonplaceholder.typicode.com/posts";

// Fectch data, react-query
const fetchTodos = async (): Promise<Todo[]> => {
  const response = await fetch(API_URL)
  const data = await response.json()

    // Transform API response to matcdata.slice(0, 10).map((item: any) =>h the Todo interface

    return data.slice(0, 10).map((item: any) => ({
      title: item.title,
      description: item.description
    }))
}


// Component
const Home: React.FC = ()=> {



  const [newTodo, setNewTodo] = useState<Todo>({title:"", description:""})

  // Fetch todos using react-query
  const {data: todos = [], isLoading, isError} = useQuery(["todos"], fetchTodos)

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
          {todos.map((todo, index) => (
            <div key={index} className="p-4 bg-white shadow rounded-lg border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">{todo.title}</h2>
              <p className="text-gray-600 text-sm">{todo.description}</p>
            </div>
          ))}
        </div>

      </div>

    </div>
  )
}

export default Home