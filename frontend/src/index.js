import React from 'react';
import './index.css';
import Layout from './Components/Layout/Layout';
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import RoutesComponent from './routes';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Layout>
        <RoutesComponent />
      </Layout>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
