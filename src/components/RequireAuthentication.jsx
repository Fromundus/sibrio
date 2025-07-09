import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

export default function RequireAuthentication({ allowedRoles }){
    const { role, id } = useStateContext();

    return (
        !role || !id ? <Navigate to="/" />
        : role === `${allowedRoles}`
            ? <Outlet />
            : <Navigate to="/unauthorized" />
    )
}