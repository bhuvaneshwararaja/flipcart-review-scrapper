import logo from './logo.svg';

import { ReviewPage } from './Pages/ReviewPage';
import {Switch,Route } from 'react-router-dom'
import { ProductPage } from './Pages/ProductPage';

function App() {
  return (
    <Switch>
      <Route path="/search" exact> <ReviewPage /> </Route>
      <Route path="/product/:id" exact><ProductPage /></Route>
    </Switch>
  )
}

export default App;
