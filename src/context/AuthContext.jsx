



import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = () => {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        console.log("Initial user from localStorage:", JSON.parse(storedUser));
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = (data) => {
    console.log("Storing in AuthContext:", data);

    // ✅ Your backend: { user, token }
    if (data.user && data.token) {
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      setUser(data.user);

      console.log("User set in AuthContext:", data.user);
    } else {
      console.error("Invalid login data:", data);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
