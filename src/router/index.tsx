import { lazy } from 'react';
import App from '../App';
import NotFound from '@Pages/NotFound';
import { createBrowserRouter } from 'react-router-dom';

import { ROUTES_PATH } from '@Constants/routes';

const Login = lazy(() => import('@Pages/Login'));
const Main = lazy(() => import('@Pages/Main'));
const Create = lazy(() => import('@Pages/Create'));
const Individual = lazy(() => import('@Pages/IndividualPage/Individual'));
const Decoration = lazy(() => import('@Pages/Decoration'));

const router = createBrowserRouter([
  {
    path: ROUTES_PATH.login,
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: ROUTES_PATH.main,
        element: <Main />,
      },
      {
        path: ROUTES_PATH.create,
        element: <Create />,
      },
      {
        path: `${ROUTES_PATH.individual}/:albumId`,
        element: <Individual />,
      },
      {
        path: `${ROUTES_PATH.decoration}/:photoId`,
        element: <Decoration />,
      },
    ],
  },
]);

export default router;
