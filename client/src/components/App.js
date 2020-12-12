import React from 'react';
import { Route, Router } from 'react-router-dom';
import { history } from '../helpers';
import Header from './Header';
import Footer from './Footer';
import HomePage from './HomePage';
import Reads from './Reads';
import DonatePage from './DonatePage';
import ShopPage from './ShopPage';
import AdminReads from './Admin/AdminReads';
import CardReadView from './CardReadView';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router history={history}>
      <Header />
      <Route exact path="/" component={HomePage} />
      <Route exact path="/reads" component={Reads} />
      <Route path="/donate" component={DonatePage} />
      <Route path="/Shop" component={ShopPage} />
      <Route path="/reads/:id/:title" component={CardReadView} />
      <Route path="/:id/admin/reads" component={AdminReads} />
      <Footer />
    </Router>
  );
}

export default App;
