import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import FirebaseProvider from '../Firebase/FirebaseProvider.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Homepage from './Components/Homepage.jsx'
import Moviesall from './Components/Moviepage/Movies all/Moviesall.jsx'
import Nowplayingpage from './Components/Moviepage/Movies now playing/Nowplayingpage.jsx'
import Moviescategory from './Components/Moviepage/Movies category/Moviescategory.jsx'
import Comingsoonpage from './Components/Moviepage/Movies coming soon page/Comingsoonpage.jsx'
import Eventgrid from './Components/Eventpage/Event grid/Eventgrid.jsx'
import Eventlist from './Components/Eventpage/Event list/Eventlist.jsx'
import About from './Components/Pagessection/About/About.jsx'
import Faq from './Components/Pagessection/Out faq/Faq.jsx'
import Error from './Components/Pagessection/404/Error.jsx'
import Myaccount from './Components/Pagessection/My account/Myaccount.jsx'
import News from './Components/News section page/News.jsx'
import Contact from './Components/Contactpage/Contact.jsx'
import Eventdetail from './Components/Eventpage/Event detail/Eventdetail.jsx'
import Searchpage from './Components/Searchpage/Searchpage.jsx'
import Cartmovies from './Components/Moviepage/Cart movies/Cartmovies.jsx'
import Newsdetail from './Components/News section page/Newsdetail.jsx'
import Checkout from './Components/Moviepage/Cart movies/Checkout.jsx'
import Success from './Components/Moviepage/Cart movies/Success.jsx'
import Detail from './Detail/Detail.jsx'
import InfoCheckout from './Components/InfoCheckout.jsx'
const router= createBrowserRouter([
  {
    path: "/",
    element: <Homepage />
  },
   {
    path: "/movies-all",
    element: <Moviesall />
  },
  {
    path: "/movies-now-playing",
    element: <Nowplayingpage />
  },
  {
    path: "/movies-coming-soon",
    element: <Comingsoonpage />
  },
  {
    path: "/movies-category/:category",
    element: <Moviescategory />
  },
  {
    path: "/events",
    element: <Eventgrid />
  },
  {
    path: "/events-list",
    element: <Eventlist />
  },
  {
    path: "/about",
    element: <About />
  },
  {
    path: "/faqs",
    element: <Faq />
  },
  {
    path: "/*",
    element: <Error />
  },
  {
    path: "/my-account",
    element: <Myaccount />
  },
  {
    path: "/news",
    element: <News />
  },
  {
    path: "/contact",
    element: <Contact />
  },
  {
    path: "/events/:eventId",
    element: <Eventdetail/>
  },
  {
    path: "/search/:searchTerm",
    element: <Searchpage/>
  },
  {
    path: "/movies/:movieId/:scheduleId",
    element: <Cartmovies/>
  },
  {
  path: "/blogs/:blogsId",
  element: <Newsdetail/>
},
{
  path: "/checkout/:id",
  element: <Checkout/>
},
{
  path: "/movies/:movieId",
  element: <Detail/>
},
{
  path:"/success",
  element: <Success/>,
},
{
  path: "/info",
  element: <InfoCheckout/>
}


])
ReactDOM.createRoot(document.getElementById('root')).render(
    <FirebaseProvider>
      <RouterProvider router={router}>      
       <App />
      </RouterProvider>
     </FirebaseProvider>

    
)
