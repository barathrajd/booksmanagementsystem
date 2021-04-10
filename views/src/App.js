import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Switch>
            <Route path="/profile" component={ProfilePage} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/product/:id" component={ProductPage} />
            <Route path="/cart/:id?" component={CartPage} />
            <Route exact path="/" component={HomePage} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
