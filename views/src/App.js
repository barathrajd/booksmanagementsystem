import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import UserListPage from './pages/UserListPage';
import UserEditPage from './pages/UserEditPage';
import ProductListPage from './pages/ProductListPage';
import ProductEditPage from './pages/ProductEditPage';
import OrderListPage from './pages/OrderListPage';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Switch>
            <Route exact path='/order/:id' component={OrderPage} />
            <Route exact path='/placeorder' component={PlaceOrderPage} />
            <Route exact path='/payment' component={PaymentPage} />
            <Route exact path='/shipping' component={ShippingPage} />
            <Route exact path='/login' component={LoginPage} />
            <Route exact path='/signup' component={SignupPage} />
            <Route exact path='/profile' component={ProfilePage} />
            <Route exact path='/product/:id' component={ProductPage} />
            <Route exact path='/cart/:id?' component={CartPage} />
            <Route exact path='/admin/userlist' component={UserListPage} />
            <Route exact path='/admin/user/:id/edit' component={UserEditPage} />
            <Route
              exact
              path='/admin/productlist'
              component={ProductListPage}
            />
            <Route
              exact
              path='/admin/product/:id/edit'
              component={ProductEditPage}
            />
            <Route exact path='/admin/orderlist/' component={OrderListPage} />
            <Route exact path='/search/:keyword' component={HomePage} />
            <Route exact path='/' component={HomePage} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
