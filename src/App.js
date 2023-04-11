import Login from "./components/Login";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";

function ProtectedRoute({ component: Component, ...rest }) {
  const token = localStorage.getItem("token");

  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          <>
            <Navbar />
            <Component {...props} />
          </>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
}

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <ProtectedRoute path="/dashboard" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
