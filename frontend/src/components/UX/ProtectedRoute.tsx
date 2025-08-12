import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api, { setApiToken } from "./Interceptor";
import { useTokenContext } from "../Helper";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { accessToken, setAccessToken, isAuthenticated, setIsAuthenticated } =
        useTokenContext();
    const location = useLocation();

    if (!accessToken) {
        return (
            <Navigate
                to="/login"
                state={{
                    from: location.pathname,
                    message: "Please log in to access this page",
                }}
                replace
            />
        );
    }

    useEffect(() => {
        setApiToken(accessToken);
        auth();
    }, [accessToken]);

    const auth = async () => {
        try {
            const decodedToken = jwtDecode(accessToken);
            const now = Date.now() / 1000;
            const tokenExpiry = decodedToken.exp ?? now;

            if (tokenExpiry < now) {
                await refreshToken();
            } else {
                setIsAuthenticated(true);
            }
        } catch (error) {
            setIsAuthenticated(false);
        }
    };

    const refreshToken = async () => {
        try {
            const response = await api.post(import.meta.env.VITE_REFRESH_PATH);
            const data = response.data;

            if (data?.accessToken) {
                setAccessToken(data.accessToken);
                setApiToken(data.accessToken);
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        } catch (error) {
            setIsAuthenticated(false);
        }
    };

    if (isAuthenticated === null) {
        return <h1>Loading...</h1>;
    }

    if (isAuthenticated === false) {
        return (
            <Navigate
                to="/login"
                state={{
                    from: location.pathname,
                    message: "Please log in to access this page",
                }}
                replace
            />
        );
    }

    return <>{children}</>;
}

export default ProtectedRoute;
