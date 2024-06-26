import { createBrowserRouter } from "react-router-dom";
import { RootPage } from '@routes/root-page';
import { FundPage } from '@routes/funds-page';
import { CreatorPage } from '@routes/creators-page';
import { BlogPage } from '@routes/blog-page';
import { HelpPage } from '@routes/help-page';
import { ErrorPage } from '@routes/error-page';
import { RegisterPage } from "@routes/register-page";
import { LoginPage } from "@routes/login-page";
import { MyProfileSettingsPage } from "@routes/my-profile-settings-page";
import { MyFundsPage } from "@routes/my-funds-page";
import { MyPostsPage } from "@routes/my-posts-page";
import { MyDonationsPage } from "@routes/my-donations-page";
import { HelpProfilePage } from "@routes/my-help-profile-page";
import { UpdateFundPage } from "@routes/my-funds-update-page";
import { UpdatePostPage } from "@routes/my-posts-update-page";
import { OneFundPage } from "@routes/one-fund-page";
import { OneBlogPage } from "@routes/one-blog-page";
import { OneCreatorPage } from "@routes/one-creator-page";
import { AdminHelpPage } from "@routes/admin-help-page";
import { AdminHelpOnePage } from "@routes/admin-help-one-page";
import { AdminCreatorPage } from "@routes/admin-creator-page";
import { AdminPostsPage } from "@routes/admin-posts-page";
import { AdminFundsPage } from "@routes/admin-funds-page";
import { AdminUsersPage } from "@routes/admin-users-page";
import { FundsAchievedPage } from "@routes/funds-achieved-page";
import { RecoveryPasswordPage } from "@routes/recovery-password-page";




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
    path: "/funds/one/:id",
    element: <OneFundPage />
  },
  {
    path: "/creators",
    element: <CreatorPage />,
    errorElement: <ErrorPage />
  },
  {
    path: "/creator/:id",
    element: <OneCreatorPage />
  },
  {
    path: "/blog",
    element: <BlogPage />
  },
  {
    path: "/blog/one/:id",
    element: <OneBlogPage />
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
  },
  {
    path: '/profile/settings',
    element: <MyProfileSettingsPage />
  },
  {
    path: '/profile/funds',
    element: <MyFundsPage />
  },
  {
    path: '/profile/funds/:id',
    element: <UpdateFundPage />
  },
  {
    path: '/profile/posts',
    element: <MyPostsPage />
  },
  {
    path: '/profile/posts/:id',
    element: <UpdatePostPage />
  },
  {
    path: '/profile/donations',
    element: <MyDonationsPage />
  },
  {
    path: '/profile/help',
    element: <HelpProfilePage />
  },
  {
    path: '/super/help-requests',
    element: <AdminHelpPage />
  },
  {
    path: '/admin/help/:id',
    element: <AdminHelpOnePage />
  },
  {
    path: '/super/creator-requests',
    element: <AdminCreatorPage />
  },
  {
    path: '/super/posts',
    element: <AdminPostsPage />
  },
  {
    path: '/super/funds',
    element: <AdminFundsPage />
  },
  {
    path: '/super/users',
    element: <AdminUsersPage />
  },
  {
    path: '/achieved-funds',
    element: <FundsAchievedPage />
  },
  {
    path: '/password-recovery',
    element: <RecoveryPasswordPage />
  }
]);