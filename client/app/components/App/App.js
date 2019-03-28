import React, { Component } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const App = ({ children }) => (
  <div>
    <div claaName="container-fluid row content">
    <Header  />
    </div>
    <div claaName="container-fluid row content">
    <main >
      {children}
    </main>
   </div>
    <div className="container-fluid row content">
    <Footer  id="foot"/>
    </div></div>
  
);

export default App;
