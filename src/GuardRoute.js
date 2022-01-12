import { useSelector } from "react-redux";
import { Navigate } from "react-router";


function GuardRoute({ children }) {
    const user = useSelector((state) => state.user);
  
    return user
      ? children
      : <Navigate to='/' />;
  }

export default GuardRoute;