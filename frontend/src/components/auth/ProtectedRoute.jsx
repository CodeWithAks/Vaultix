import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../../utils/auth";

export default function ProtectedRoute({ children }) { //jo bhi component protected route se wrap hoga wo children ke through pass hoga
  if (!isLoggedIn()) { 
    return <Navigate to="/login" />;
  }
    return children; //agr logged in hai to children ko render karo
}