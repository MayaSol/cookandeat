import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import Layout from './components/Layout/Layout';
import RecipeList from './components/RecipeList/RecipeList';
import Menu from './components/Menu/Menu';
import RecipeNew from './components/RecipeNew/RecipeNew';

function App() {

  return (
    <BrowserRouter>
    <Layout>
          <Switch>
              <Route path="/recipes" component={RecipeList} />
              <Route path="/grocery" render={() => {return <p>Grocery</p>}}/>
              <Route path="/menu" component={Menu}/>
              <Route path="/new/:id" component={RecipeNew}/>
              <Route path="/new" component={RecipeNew}/>
              <Redirect from="/" exact to="recipes/"/>
              <Route path="/" render={()=><h1>404 - NOT FOUND</h1>} />
          </Switch>
    </Layout>
    </BrowserRouter>
  );
}

export default App;