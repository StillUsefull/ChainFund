import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootPage } from '@pages/rootPage';
import { FundPage } from '@pages/fundPage';
import { CreatorPage } from '@pages/creatorPage';
import { BlogPage } from '@pages/blogPage';
import { AboutPage } from '@pages/aboutPage';
import { HelpPage } from '@pages/helpPage';
import { ErrorPage } from '@pages/errorPage';



const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />
  },
  {
    path: "/funds",
    element: <FundPage />,
    errorElement: <ErrorPage />
  },
  {
    path: "/creators",
    element: <CreatorPage />,
    errorElement: <ErrorPage />
  },
  {
    path: "/blog",
    element: <BlogPage />
  },
  {
    path: "/about",
    element: <AboutPage />
  },
  {
    path: "/help",
    element: <HelpPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
