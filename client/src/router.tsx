import { createBrowserRouter } from "react-router-dom";
import { RootPage } from '@routes/root-page';
import { FundPage } from '@routes/funds-page';
import { CreatorPage } from '@routes/creators-page';
import { BlogPage } from '@routes/blog-page';
import { HelpPage } from '@routes/help-page';
import { ErrorPage } from '@routes/error-page';
import { RegisterPage } from "@routes/register-page";
import { LoginPage } from "@routes/login-page";




export const router = createBrowserRouter([
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
    path: "/funds/:category",
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
    path: "/help",
    element: <HelpPage />
  },
  {
    path: '/registration',
    element: <RegisterPage />
  },
  {
    path: '/login',
    element: <LoginPage />
  }
]);