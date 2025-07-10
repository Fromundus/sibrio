import React, { useContext } from "react";
import { createContext } from "react";
import axiosClient from "../axios-client";

const StateContext = createContext({});

export function ContextProvider({children}){
    const [name, setName] = React.useState();
    const [email, setEmail] = React.useState();
    const [role, _setRole] = React.useState(localStorage.getItem("role"));
    const [id, _setId] = React.useState(localStorage.getItem("id"));
    const [token, _setToken] = React.useState(localStorage.getItem("token"));

    // console.log(role);
    // console.log(token);
    // console.log(id);

    React.useEffect( () => {
        const fetchUser = async () => {
            try {
                const res = await axiosClient.get('/user')
                console.log(res);
                if(res.status === 200){
                    setName(res.data.username);
                    setEmail(res.data.email);
                    setRole(res.data.role);
                    setId(res.data.id);
                }
            } catch (err) {
                console.log(err);
            }
        }

        role && id && token && fetchUser();
    }, [role, id, token]);

    function setRole(role){
        _setRole(role)

        if(role){
            localStorage.setItem("role", role);
        } else {
            localStorage.removeItem("role");
        }
    }

    function setId(id){
        _setId(id)

        if(id){
            localStorage.setItem("id", id);
        } else {
            localStorage.removeItem("id");
        }
    }

    function setToken(token){
        _setToken(token)

        if(token){
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }

    return (
        <StateContext.Provider value={{
            name,
            setName,
            email,
            setEmail,
            role,
            setRole,
            id,
            setId,
            token,
            setToken,
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);