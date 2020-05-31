import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import HomePage from './HomePage';
import AdminReads from './Admin/AdminReads';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Header />
      <Route exact path="/" component={HomePage} />
      <Route path="/:id/admin/reads" component={AdminReads} />
      <Footer />
    </Router>
  );
}

export default App;
