import React, {ReactElement} from "react";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {RootState} from "../../store/store";

interface PrivateRouteProps {
  routLoggedIn?: string | null;
  routNotLoggedIn?: string | null;
  children: ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({children, routLoggedIn = null, routNotLoggedIn = null}) => {
  const token = useSelector((state: RootState) => state.auth.token);
  
  if (token) {
    if (routLoggedIn) {
      return <Navigate to={`${routLoggedIn}`}/>;
    }
  } else {
    if (routNotLoggedIn) {
      return <Navigate to={`${routNotLoggedIn}`}/>;
    }
  }
  
  return children;
};

export default PrivateRoute;



