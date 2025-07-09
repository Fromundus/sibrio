import React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axiosClient from '../axios-client';
import { motion } from 'framer-motion';

import ct from "../assets/csgoect.png";
import t from "../assets/csgoet.png";

import m4 from "../assets/guns/m4.png";
import awp from "../assets/guns/awp.png";
import crate from "../assets/guns/crate.png";
import crate2 from "../assets/guns/crate2.png";
import deagle from "../assets/guns/deagle.png";
import karambit from "../assets/guns/karambit.png";
import ak47 from "../assets/guns/ak47.webp";

function GuestLayout() {
    const { role } = useStateContext();
    const [settings, setSettings] = React.useState();
    const [settingsLoading, setSettingsLoading] = React.useState(true);
    
    React.useEffect(() => {
        // axiosClient.get('/settings').then(res => {
        //     console.log(res);
        //     setSettings(res.data.settings);
        // });
        axiosClient.get('/settings')
            .then((res) => {
                console.log(res);
                setSettings(res.data.settings);
                setSettingsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setSettingsLoading(false);
            });
    }, []);

    React.useEffect( () => {
        document.body.classList.remove('no-scroll');
    }, []);

    if(role){
        return <Navigate to={`${role}`} />
    }

    return (
        <div className="bg-background text-textPrimary overflow-x-hidden bg[url('https://i.pinimg.com/1200x/fd/36/34/fd363452b137ba4f37585288f3b0d116.jpg')] bg-cover bg-center bg-fixed transition-all">
            <Navbar />
            <div className='min-h-[100svh] pt-[72px]'>
                <Outlet context={{
                    settings, settingsLoading
                }} />
            </div>
            <Footer />
        </div>
    )
}

export default GuestLayout