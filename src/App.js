import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Layout from './hoc/Layout/Layout'
import LandingPage from './components/LandingPage/LandingPage'

function App() {

  let routes = (
    <Switch>
      <Route path="/" exact component={LandingPage} />
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
