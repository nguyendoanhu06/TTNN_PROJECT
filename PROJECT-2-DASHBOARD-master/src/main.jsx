import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import DashBoard from './component/main/slide-bar/DashBoard.jsx';
import FilmsList from './component/main/slide-bar/catalog/FilmsList.jsx';
import Film from './component/main/slide-bar/catalog/Film.jsx';
import Category from './component/main/slide-bar/catalog/Category.jsx';
import CategoriesList from './component/main/slide-bar/catalog/CategoriesList.jsx';
import Customer from './component/main/slide-bar/customers/Customer.jsx';
import CustomersList from './component/main/slide-bar/customers/CustomersList.jsx';
import OrdersList from './component/main/slide-bar/orders/OrdersList.jsx';
import OrderDetails from './component/main/slide-bar/orders/OrderDetails.jsx';
import Chat from './component/main/slide-bar/Chat.jsx';
import Calender from './component/main/slide-bar/Calender.jsx';
import Analytics from './component/main/slide-bar/Analytics.jsx';
import Err404 from './component/main/Err404.jsx';
import Authentication from './component/main/slide-bar/Authentication.jsx';
import FirebaseProvider from './component/context/FirebaseProvider.jsx';
import DetailFilm from './component/main/slide-bar/catalog/film-list/DetailFilm.jsx';
import CinemaRoom from './component/main/slide-bar/catalog/film-list/CinemaRoom.jsx';
import Edit from './component/main/slide-bar/catalog/film-list/Edit.jsx';
import HomePage from './component/main/HomePage.jsx';




const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <DashBoard />,
  },
  {
    path: "/filmslist",
    element: <FilmsList />
  },
  {
    path: "/film",
    element: <Film />
  },
  {
    path: "/categorieslist",
    element: <CategoriesList />
  },
  {
    path: "/category",
    element: <Category />
  },
  {
    path: "/customerslist",
    element: <CustomersList />
  },
  {
    path: "/customer",
    element: <Customer />
  },
  {
    path: "/orderslist",
    element: <OrdersList />
  },
  {
    path: "/orderdetails",
    element: <OrderDetails />
  },
  {
    path: "/chat",
    element: <Chat />
  },
  {
    path: "/calender",
    element: <Calender />
  },
  {
    path: "/analytics",
    element: <Analytics />
  },
  {
    path: "/authentication",
    element: <Authentication />
  },
  {
    path: "/detail/:id",
    element: <DetailFilm />
  },
  {
    path: "/room/:id",
    element: <CinemaRoom />
  },
  {
    path: "/edit/:id",
    element: <Edit />
  },
  {
    path: "*",
    element: <Err404 />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <FirebaseProvider>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </FirebaseProvider>
)
