import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/AxiosInstance";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);

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
      setAuthLoading(true);
      const response = await axiosInstance.post("/auth/signup", {
        name,
        email,
        password,
      });
      toast.success(response.data.message);
      navigate("/verify-email", { state: { email } }); // pass email for the notice page
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setAuthLoading(false);
    }
  };

  const resendVerification = async (email) => {
  try {
    setAuthLoading(true);
    const response = await axiosInstance.post("/auth/resend-verification", { email });
    toast.success(response.data.message);
  } catch (error) {
    if (error.response?.status === 429) {
      toast.error(error.response.data.message); // cooldown message
    } else {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  } finally {
    setAuthLoading(false);
  }
};


  const login = async (email, password) => {
    try {
      setAuthLoading(true);

      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      const { data } = response;
      setUser(data);
      navigate(data.role === "admin" ? "/admin" : "/");
      toast.success("Login successful");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setAuthLoading(false);
    }
  };

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

  const forgotPassword = async (email) => {
    try {
      setAuthLoading(true);
      const response = await axiosInstance.post("/auth/forgot-password", {
        email,
      });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setAuthLoading(false);
    }
  };

  const resetPassword = async (token, password) => {
    try {
      setAuthLoading(true);
      const response = await axiosInstance.post(
        `/auth/reset-password/${token}`,
        { password },
      );
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authLoading,
        login,
        signup,
        logout,
        setUser,
        forgotPassword,
        resetPassword,
        resendVerification
      }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
