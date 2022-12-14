import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Blog from "../pages/Blog/Blog";
import NotFound from "../pages/NotFound/NotFound";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import AllSeller from "../pages/Dashboard/AllSeller";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import AllBuyer from "../pages/Dashboard/AllBuyer";
import BooksByCategory from "../pages/BooksByCategory/BooksByCategory";
import MyOrders from "../pages/Dashboard/MyOrders";
import AddBook from "../pages/Dashboard/AddBook";
import SellerRoute from './SellerRoute';
import MyBooks from "../pages/Dashboard/MyBooks";
import ReportedBooks from "../pages/ReportedBooks/ReportedBooks";
import Categories from "../pages/Categories/Categories";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/home',
                element: <Home />
            },
            {
                path: '/categories',
                element: <Categories />
            },
            {
                path: '/books/:categoryId',
                element: <PrivateRoute><BooksByCategory /></PrivateRoute>,
                loader: ({ params: { categoryId } }) => categoryId
            },
            {
                path: '/blog',
                element: <Blog />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/dashboard',
                element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
                children: [
                    {
                        path: '/dashboard',
                        element: <Navigate to="/dashboard/my-orders" />
                    },
                    {
                        path: '/dashboard/my-orders',
                        element: <MyOrders />
                    },
                    {
                        path: '/dashboard/add-book',
                        element: <SellerRoute><AddBook /></SellerRoute>
                    },
                    {
                        path: '/dashboard/my-books',
                        element: <SellerRoute><MyBooks /></SellerRoute>
                    },
                    {
                        path: '/dashboard/all-seller',
                        element: <AdminRoute><AllSeller /></AdminRoute>
                    },
                    {
                        path: '/dashboard/all-buyer',
                        element: <AdminRoute><AllBuyer /></AdminRoute>
                    },
                    {
                        path: '/dashboard/reported-books',
                        element: <AdminRoute><ReportedBooks /></AdminRoute>
                    },
                ]
            }
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
])

export default routes;