import { useLocation, Route } from "preact-iso";
import { useAuth } from "../../utils/auth-manager";
import { useProfile } from "../api/queryHooks";

export const ProtectedRoute = (props) => {
  const location = useLocation();
  const { isAuth } = useAuth();

  if (!isAuth) {
    location.route("/login");
  }

  return <Route {...props} />;
};

export const AdminRoute = (props) => {
  const location = useLocation();
  const { isAuth, userId } = useAuth();
  const { data } = useProfile(userId!, Boolean(userId));

  if (!isAuth && data?.role !== "admin") {
    location.route("/login");
  }

  return <Route {...props} />;
};
