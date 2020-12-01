import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { routes } from './constants/routes';
import DetailPlanet from './screens/DetailPlanet';
import Result from './screens/Result';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {
            routes.map(({ path, Component }) => (
              <Route key={path} exact path={path} render={(props) => {
                if(path == "DetailPlanet"){
                  return(
                    <DetailPlanet id={props.match.params.id} />
                  )
                }else if(path === "Result"){
                  return(
                    <Result name={props.match.params.name} />
                  )
                }
              }}>
                <Component />
              </Route>
            ))
          }
        </Switch>
      </Router>
    </div>
  );
}

export default App;
