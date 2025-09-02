
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendAdminAuthRequest } from "../../api-helpers/api-helpers";
import { adminActions } from "../../store";
import AuthForm from "./AuthForm";

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    const { success, data: resData } = await sendAdminAuthRequest(data.inputs, !data.addAdmin);

    if (!success) {
      alert(resData.message || "Request failed");
      return;
    }

    if (data.addAdmin) {
      // Signup
      alert("Signup successful! Please login.");
      navigate("/admin/login");
      return;
    }

    // Login
    if (!resData.token) {
      alert("Login failed. Token not received.");
      return;
    }

    localStorage.setItem("adminId", resData.id);
    localStorage.setItem("token", resData.token);
    dispatch(adminActions.login());
    navigate("/admin/dashboard");
  };

  return <AuthForm onSubmit={handleSubmit} isAdmin={false} />;
};

export default Admin;
