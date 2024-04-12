import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootPage } from '@routes/root-page';
import { FundPage } from '@routes/funds-page';
import { CreatorPage } from '@routes/creators-page';
import { BlogPage } from '@routes/blog-page';
import { AboutPage } from '@routes/about-page';
import { HelpPage } from '@routes/help-page';
import { ErrorPage } from '@routes/error-page';
import { Header } from '@components/header';
import { Footer } from '@components/footer';



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
    <div style={{background: '#FFF18B'}}>
      <Header />
        <RouterProvider router={router} />
      <Footer />
    </div>
  </React.StrictMode>,
)
