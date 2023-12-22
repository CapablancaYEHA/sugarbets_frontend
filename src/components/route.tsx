import { useLocation, Route } from "preact-iso";
import { useAuth } from "../../utils/auth-manager";

export const ProtectedRoute = (props) => {
  const location = useLocation();
  const { isAuth } = useAuth();

  if (!isAuth) {
    location.route("/login");
  }

  return <Route {...props} />;
};
