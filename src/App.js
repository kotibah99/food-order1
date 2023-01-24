import { Skeleton } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import React, { Suspense, useContext } from 'react';

import { Layout } from './components/layout/Layout';
import { AuthContext } from './store/AuthContext';

const Checkout = React.lazy(() => import('./pages/Checkout/Checkout'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const Profile = React.lazy(() => import('./pages/Profile/Profile'));
const Details = React.lazy(() => import('./pages/Details/Details'));
const Orders = React.lazy(() => import('./pages/Orders/Orders'));
const Meals = React.lazy(() => import('./pages/Meals/Meals'));
const Home = React.lazy(() => import('./pages/Home/Home'));
const User = React.lazy(() => import('./pages/User/User'));

export default function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Layout>
      <Suspense fallback={<Skeleton />}>
        <Routes>
          {!isLoggedIn && <Route path="user" element={<User />} />}
          {isLoggedIn && <Route path="orders" element={<Orders />} />}
          {isLoggedIn && <Route path="profile" element={<Profile />} />}
          {isLoggedIn && <Route path="checkout" element={<Checkout />} />}
          <Route path="/" element={<Home />} />
          <Route path="menu">
            <Route index element={<Meals />} />
            <Route path=":id" element={<Meals />} />
          </Route>
          <Route path="meal">
            <Route path=":id" element={<Details />} />
          </Route>
          <Route path="not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
