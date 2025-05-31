import {BrowserRouter} from 'react-router-dom';
import HomePage from  './pages/HomePage/homePage.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar.js';
import CartPage from './pages/CartPage/CartPage.js';
import OrderP from './pages/OrdersPage/OrdersPage.js';
import LoginPage from './pages/LoginPage/LoginPage.js';
import SignupPage from './pages/RegisterPage/Signup.js';
import {store} from './redux/store.js';
import {Provider} from 'react-redux';

function App() {

  const router = createBrowserRouter([
    {path: '/', element: <NavBar />, children: [
      {index: true, element: <HomePage />},
      {path: '/cart', element: <CartPage />},
      {path: '/orders', element: <OrderP />},
      {path: '/login', element: <LoginPage />},
      {path: '/signup', element: <SignupPage />}
    ]}
  ]);

  return (
    <>
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>

    </>
  );
}

export default App;
