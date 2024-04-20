import React from 'react'
import ReactDOM from 'react-dom/client'



import { RouterProvider } from "react-router-dom";

import { Header } from '@components/header';
import { Footer } from '@components/footer';
import { router } from './router';

import './index.css'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="site-container" style={{background: '#FFF18B'}}>
        <div className="content-wrap">
          <Header />
          <RouterProvider router={router} />
        </div>
      <Footer />
    </div>
  </React.StrictMode>,
)
