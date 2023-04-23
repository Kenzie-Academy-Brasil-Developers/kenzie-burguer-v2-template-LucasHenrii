import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import ShopProvider from "../../contexts/ShopContext";
import { UserContext } from "../../contexts/UserContext";

export const ProtectedRoutes = () => {
  const { user } = useContext(UserContext);

  return user ? (
    <ShopProvider>
      {" "}
      <Outlet />
    </ShopProvider>
  ) : (
    <Navigate to="/" />
  );
};
