import {Route, Routes} from "react-router-dom";
import Home from './pages/Home';
import Invoices from './pages/Invoices';
import Login from "./pages/Login";
import Header from './components/common/Header';
import PrivateRoute from './components/common/PrivateRoute';
import './App.css';
import {ROUTE_CONSTANTS} from "./constants/constants";

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path={ROUTE_CONSTANTS.home} element={<Home/>}/>
        <Route
          path={ROUTE_CONSTANTS.login}
          element={
            <PrivateRoute routLoggedIn={ROUTE_CONSTANTS.invoices}>
              <Login/>
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTE_CONSTANTS.invoices}
          element={
            <PrivateRoute routNotLoggedIn={ROUTE_CONSTANTS.login}>
              <Invoices/>
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
