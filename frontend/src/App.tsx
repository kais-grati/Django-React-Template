import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./components/UX/Routes";
import {
    createContext,
    useEffect,
    useState,
    type Dispatch,
    type SetStateAction,
} from "react";
import api, { setApiToken } from "./components/UX/Interceptor";

type ContexType = {
    accessToken: string;
    setAccessToken: Dispatch<SetStateAction<string>>;
    isAuthenticated: boolean;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
};

export const TokenContext = createContext<ContexType | undefined>(undefined);

function App() {
    const router = createBrowserRouter(routes);
    const [accessToken, setAccessToken] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

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

    useEffect(() => {
        refreshToken();
    }, []);

    return (
        <TokenContext.Provider
            value={{
                accessToken,
                setAccessToken,
                isAuthenticated,
                setIsAuthenticated,
            }}
        >
            <RouterProvider router={router} />;
        </TokenContext.Provider>
    );
}

export default App;
