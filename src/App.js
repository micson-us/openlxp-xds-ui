import './App.css';
import Layout from './hoc/Layout/Layout'
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';


function App() {

  let routes = (
    <Switch>
      {/* <Route path="/search" component={Search} />
      <Route path="/about" component={About} />
      <Route path="/resources" component={Resources} />
      <Route path="/signIn" component={Sign in} 
      <Route path="/" exact component={Home} />/>
      <Redirect to="/" /> */}
      <Route path="/about" />
      <Route path="/resources"/>
      <Route path="/help"/>
      <Route path="/signIn"/>
      <Route path="/" exact/>
      <Redirect to="/" />
    </Switch>
  )

  return (
    <div className="main-container">
      <Layout>
        {routes}
      </Layout>
    </div>
  );
}

export default App;
