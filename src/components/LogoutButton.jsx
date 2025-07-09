import React from 'react'
import { useNavigate } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../context/ContextProvider';
import { MdLogout } from "react-icons/md";
import Button from './ui/Button';

function LogoutButton({ className }) {
    const navigate = useNavigate();
    const { setName, setToken, setRole, setId, setEmail } = useStateContext();

    function logout(){

        axiosClient.post("/logout")
            .then( (res) => {
                // console.log(res);
                setName(null);
                setToken(null);
                setRole(null);
                setId(null);
                setEmail(null);
                navigate("/login");
            })
            .catch( (err) => {
                // console.log(err);
                setName(null);
                setToken(null);
                setRole(null);
                setId(null);
                setEmail(null);
                navigate("/login");
            })
    }

    return (
        <div>
            {/* <button className={`${className} font-[700] px-5 hover:opacity-90 transition text-[14px] rounded-md py-2 font-nunito flex items-center gap-1.5 justify-center`} style={{boxShadow: "rgba(0, 0, 0, 0.25) 0px -2px 0px inset, rgba(255, 255, 255, 0.25) 0px 1.5px 0px inset", padding: "0.5rem 1rem"}} onClick={logout}>Logout</button> */}
            <Button
                type={"button"}
                label={"Logout"}
                className={className}
                onClick={logout}
            />
        </div>
    )
}

export default LogoutButton