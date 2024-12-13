import React, {ReactElement} from "react";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {RootState} from "../../store/store";

interface PrivateRouteProps {
  /** Route to serve if the user is logged in */
  routLoggedIn?: string | null;
  /** Route to serve if the user is not logged in */
  routNotLoggedIn?: string | null;
  /** Child elements to serve if the token based routes are not triggered or not set */
  children: ReactElement;
}

/**
 * Reusable routing component that allows for redirecting the user to specific routes based on the logged in status of
 * the user. For example, developers may want to route the user to the profile page if a logged-in user visits the
 * login page. Another example would be redirecting not logged-in users to the login page if they try to access a page
 * that is restricted for logged-in users.
 * @param children The child elements of the component to serve if neither route is triggered or set
 * @param routLoggedIn (optional) Route to serve if the user is logged in
 * @param routNotLoggedIn (optional) Route to serve if the user is not logged in
 * @constructor
 */
const PrivateRoute: React.FC<PrivateRouteProps> = ({children, routLoggedIn = null, routNotLoggedIn = null}) => {
  /** The Jwt auth token of the current user (null if not logged in) */
  const token = useSelector((state: RootState) => state.auth.token);
  
  // Check if the user is logged in and serve the set routes accordingly
  if (token) {
    if (routLoggedIn) {
      // Navigate here if the user is logged in, and we have set a specific route
      return <Navigate to={`${routLoggedIn}`}/>;
    }
  } else {
    if (routNotLoggedIn) {
      // Navigate here if the user is not logged in, and we have set a specific route
      return <Navigate to={`${routNotLoggedIn}`}/>;
    }
  }
  
  // Return the child elements of the component if neither of the set routes above are triggered
  return children;
};

export default PrivateRoute;



