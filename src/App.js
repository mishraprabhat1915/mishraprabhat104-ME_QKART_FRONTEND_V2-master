import Login from "./components/Login";
import Register from "./components/Register";
import Products from "./components/Products";
import Checkout from "./components/Checkout";
import ipConfig from "./ipConfig.json";
import Thanks from "./components/Thanks";
import { Route, Switch } from "react-router-dom";

export const config = {
  endpoint: `http://${ipConfig.workspaceIp}:8082/api/v1`,
};

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Products />
        </Route>
        <Route path="/checkout">
          <Checkout/>
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/thanks">
          <Thanks />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
