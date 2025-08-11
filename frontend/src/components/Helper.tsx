import { useContext } from "react";
import { TokenContext } from "../App";

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "";
}

export const useTokenContext = () => {
    const context = useContext(TokenContext);
    if (!context) {
        throw new Error("useTokenContext must be used within a TokenProvider");
    }
    return context;
};

