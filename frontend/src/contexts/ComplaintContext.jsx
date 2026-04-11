import { Children, createContext, useContext, useState } from "react";
import axiosInstance from "../utils/AxiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const ComplaintContext = createContext();

export const useComplaintContext = () => {
  return useContext(ComplaintContext);
};
export const ComplaintProvider = ({ children }) => {
  const [complaint, setComplaint] = useState({
    title: "",
    category: "",
    location: "",
    evidence: [],
    description: "",
    urgency: "",
    date: "",
  });
  const navigate = useNavigate();

  const submitComplaint = async (submitData) => {
    try {
      const formData = new FormData();

      formData.append("title", submitData.title);
      formData.append("category", submitData.category);
      formData.append("location", submitData.location);
      formData.append("description", submitData.description);
      formData.append("urgency", submitData.urgency);
      formData.append("date", new Date().toISOString());

      // append multiple files
      submitData.evidence.forEach((file) => {
        formData.append("evidence", file);
      });
      const response = await axiosInstance.post(
        "/complaint/submit",
        formData,
      );
      const { data } = response;
      toast.success(data.message);
      navigate("/");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
        
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <ComplaintContext.Provider
      value={{ complaint, setComplaint, submitComplaint }}
    >
      {children}
    </ComplaintContext.Provider>
  );
};
