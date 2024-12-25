import React, {useState} from "react"

interface Todo{
  title: string,
  description: string
}

const Home: React.FC = ()=> {

  const [todos, setTodos] = useState<Todo[]>([
    { title:"How to present her self", description:"Begin, by your name, what you do in life, where are live, are you sigle ?"},
    { title: "Learn TypeScript", description: "Understand the basics of TypeScript with React." },
    { title: "Setup TailwindCSS", description: "Integrate TailwindCSS into your Next.js project." },
    { title: "Build a To-Do App", description: "Create a simple to-do list application." },
  ])

  const [newTodo, setNewTodo] = useState<Todo>({title:"", description:""})

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


  return (

    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">My To-Do List</h1>
      <div className="w-full max-w-2xl space-y-4">
        {todos.map((todo, index)=>(
          <div
            key={index}
            className="p-4 bg-white shadow rounded-lg border border-gray-200"
          >
            <h2 className="text-2xl font-semibold text-gray-800">{todo.title}</h2>
            <p className="text-gray-600">{todo.description}</p>
          </div>
        ))}
      </div>
    </div>

  )
}

export default Home