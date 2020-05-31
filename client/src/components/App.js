import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import HomePage from './HomePage';
import Reads from './Reads';
import DonatePage from './DonatePage';
import ShopPage from './ShopPage';
import SignInPage from './SigninPage';
import SignUpPage from './SignupPage';
import AdminReads from './Admin/AdminReads';
import CardReadView from './CardReadView';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Header />
      <Route exact path="/" component={HomePage} />
      <Route exact path="/reads" component={Reads} />
      <Route path="/donate" component={DonatePage} />
      <Route path="/Shop" component={ShopPage} />
      <Route path="/signin" component={SignInPage} />
      <Route path="/signup" component={SignUpPage} />
      <Route path="/reads/:id/:title" component={CardReadView} />
      <Route path="/:id/admin/reads" component={AdminReads} />
      <Footer />
    </Router>
  );
}

export default App;
