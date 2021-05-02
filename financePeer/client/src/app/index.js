import React, {Fragment} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './index.css';
import { beforeLogin, UploadFile, MyDatabase } from '../pages'
import { NavBar } from '../containers'

function App() {
  return (

		<Router>
			<Switch>
				{ (localStorage.getItem("JWT") === null) ? (
                  <Route path="/" exact component={beforeLogin} />
			    ) : (
			      <Fragment>
                    <NavBar />
                    <Route path="/" exact component={UploadFile} />
                    <Route path="/database" exact component={MyDatabase} />
			      </Fragment>
			    )}
             
                <Route path="/sign-in" exact component={beforeLogin} />

            </Switch>		    
		</Router>

 );
}

export default App;



