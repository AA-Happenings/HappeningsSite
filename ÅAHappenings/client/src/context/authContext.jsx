import { createContext, useReducer, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [admin, setAdmin] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      dispatch({ type: 'LOGIN', payload: user });
    }

    if (user.admin) [
        setAdmin(true)
    ]

    setIsLoading(false); // Set loading to false once the data is fetched
  }, []);

  console.log('AuthContext state:', state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch, isLoading, admin }}>
      {children}
    </AuthContext.Provider>
  );
};