import { Navigate } from "react-router-dom";
import { routes } from "../../config/router";
import { PrivateRouterProps } from "../../interfaces/childrendInterface";
import { ToastError } from "../../utils/toast";
import { accountService } from "../../services/accountService";
import { useEffect, useState, useRef } from "react";

function PrivateRouter({ children, permistion }: PrivateRouterProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const token = accountService.accountValue;

  const hasShownToast = useRef(false);

  useEffect(() => {
    if (!token && !hasShownToast.current) {
      ToastError(" Vui lòng đăng nhập !");
      hasShownToast.current = true;
      setIsAuthenticated(false);
    }    
  }, [token]);
  
  
  if(!token) return <Navigate to={routes.home} />;
  
  if(permistion == true ){
    if (token?.user?.max_level_security != 1) {
      return <Navigate to={routes.home} />;
    }
  }

  if (!isAuthenticated) {
    return <Navigate to={routes.home} />;
  }

  return children;
}

export default PrivateRouter;
