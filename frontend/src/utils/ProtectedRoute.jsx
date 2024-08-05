import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";


const ProtectedRoute = ({ children }) => {
    const { authToken } = useContext(AuthContext);

    return authToken ? <Navigate to={'/dashboard'} /> : children;
}


export default ProtectedRoute;