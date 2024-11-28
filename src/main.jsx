import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { AuthLayout, Login } from './components/index.js'


import AddMovie from "./pages/AddMovie.jsx";
import Signup from './pages/Signup'
import EditMovie from "./pages/EditMovie";
import Category from "./pages/Category.jsx";
import Movie from "./pages/Movie.jsx";
import Search from "./pages/SearchMovies.jsx";

import AllMovies from "./pages/AllMovies";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
        {
            path: "/all-movies",
            element: <AllMovies />
        },
        {
            path: "/add-movie",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AddMovie />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-movie/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditMovie />
                </AuthLayout>
            ),
        },
        {
            path: "/movie/:slug",
            element: <Movie />,
        },
        {
            path: "/search/:query",
            element: <Search />,
        },
        {
            path: "/all-movies/:category",
            element: <Category />,
        }        
    ],
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
