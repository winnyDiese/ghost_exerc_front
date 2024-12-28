import React from 'react'

const Add: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">

        <div className="w-full max-w-2xl flex pb-10">
            {/* Form */}
            <div className="flex-1 p-6 bg-white shadow rounded-lg border border-gray-200 mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add a New Todo</h2>
                <form>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                        placeholder="Enter user name"
                        disabled
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
                        className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                        placeholder="Enter user email"
                        disabled
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
                        className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                        placeholder="Enter user password"
                        disabled
                    />
                </div>

                <button
                    type="button"
                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                    disabled
                >
                    Add User
                </button>
                </form>
            </div>
        </div>

    </div>
  )
}

export default Add
