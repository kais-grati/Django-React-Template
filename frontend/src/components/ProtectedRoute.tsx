import { useState } from "react";

interface ProtectedRouteProps{
    children: React.ReactNode;
}

function ProtectedRoute({children} : ProtectedRouteProps){

    const [isAuthenticated, setIsAuthenticated] = useState(false);



    return ;
}
export default ProtectedRoute;