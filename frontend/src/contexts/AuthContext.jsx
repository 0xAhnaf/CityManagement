import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/AxiosInstance";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/user/profile");
        const { data } = response;
        setUser(data);
      } catch (err) {
        if (err.response) {
          setUser(null);
          // navigate("/");
        } else {
          toast.error("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const signup = async (name, email, password) => {
    try {
        const response = await axiosInstance.post("/auth/signup", {
            name, email, password
        });
        const { data } = response;
        setUser(data);
        navigate("/");
        toast.success("Signup successful");
    } catch (error) {
        toast.error(error.response.data.message);
    }
  }

  const login = async (email, password) => {
    try {
        const response = await axiosInstance.post("/auth/login", {
            email, password
        });
        const { data } = response;
        setUser(data);
        navigate(data.role === "admin" ? "/admin" : "/");
        toast.success("Login successful");
    } catch (error) {
        toast.error(error.response.data.message);
    }
  }

  const logout = async () => {
    setUser(null);
    try {
      const response = await axiosInstance.post("/auth/logout", {});
      const { data } = response;
      toast.success(data.message);
      setUser(null);
      navigate("/login");
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.error);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, signup, logout, setUser }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
}