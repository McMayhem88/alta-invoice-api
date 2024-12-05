import {Link, useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState} from "../../store/store";
import {useAppDispatch} from "../../hooks/dispatch.hook";
import {logout} from "../../store/auth/auth.slice";
import {ROUTE_CONSTANTS} from "../../constants/constants.ts";

const Header = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    dispatch(logout());
    navigate(ROUTE_CONSTANTS.login);
  };
  
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="content-container flex justify-between">
        <Link to={ROUTE_CONSTANTS.home} className="font-bold">
          Altametrics Invoice App
        </Link>
        <nav>
          {token ? (
            <>
              <Link to={ROUTE_CONSTANTS.invoices} className="mr-4 hover:text-blue-200">Invoices</Link>
              <button className="hover:text-blue-200" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link className="hover:text-blue-200" to={ROUTE_CONSTANTS.login}>Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;