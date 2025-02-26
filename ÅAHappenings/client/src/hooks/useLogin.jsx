import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // default to false
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:5050/organizer/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
      return false;
    }
    if (response.ok) {
      // Save user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // Update authContext
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
      return json; // return the user data (truthy value)
    }
  };

  return { login, isLoading, error };
};
