import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import PostList from "./components/PostList";
import CreatePost from "./components/CreatePost";

function NotFound() {
  return (
   
    <div
    className="relative h-screen flex items-center justify-center bg-cover bg-center"
    style={{
      backgroundImage: 'url("https://images.unsplash.com/photo-1594322436404-5a0526db4d13?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZXJyb3J8ZW58MHx8MHx8fDA%3D")',
    }}
  >
    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
    <div className="relative text-center text-white">
      <h1 className="text-8xl font-extrabold">404</h1>
      <p className="text-2xl mt-4">Oops! Page Not Found</p>
      <p className="mt-2 text-lg">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <NavLink
        to="/"
        className="inline-block mt-24 px-6 py-3 bg-pink-500 hover:bg-blue-600 text-white text-lg font-medium rounded-md"
      >
        Go to Home
      </NavLink>
    </div>
  </div>
  
  );
}

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <nav className="mb-6 bg-gray-100 p-4 rounded-lg shadow">
          <ul className="flex justify-center space-x-6">
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-700 font-bold"
                    : "text-blue-500 hover:text-blue-700"
                }
              >
                Register
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-700 font-bold"
                    : "text-blue-500 hover:text-blue-700"
                }
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-700 font-bold"
                    : "text-blue-500 hover:text-blue-700"
                }
              >
                Posts
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/create"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-700 font-bold"
                    : "text-blue-500 hover:text-blue-700"
                }
              >
                Create Post
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/" element={<PostList />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
