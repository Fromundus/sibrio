import React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axiosClient from '../axios-client';
import { Bounce, ToastContainer } from 'react-toastify';

function AdminLayout() {
    const [settingsLoading, setSettingsLoading] = React.useState(true);
    const [leaderboard, setLeaderboard] = React.useState({});
    const [settings, setSettings] = React.useState({
        referral_code: '',
        referral_link: '',
        leaderboard_type: '',
        first_prize: '',
        second_prize: '',
        third_prize: '',
        terms: '',
        is_active: true,
    });
    
    React.useEffect(() => {
        setSettingsLoading(true);

        axiosClient.get('/settings-with-leaderboard').then(res => {
            console.log(res);
            setSettings(res.data.settings);
            setLeaderboard(res.data.leaderboard);
            setSettingsLoading(false)
        }).catch((err) => {
            console.log(err);
            setSettingsLoading(false)
        })
    }, []);

    React.useEffect( () => {
        document.body.classList.remove('no-scroll');
    }, []);

    return (
        <div className='bg-background text-textPrimary overflow-x-hidden'>
            <Navbar userType={1} />
            <div className='min-h-[100svh] pt-[72px]'>
                <Outlet context={{
                    settings, setSettings, settingsLoading, leaderboard, setLeaderboard
                }} />
            </div>
            <Footer userType={1} />
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="dark"
                transition={Bounce}
                />
        </div>
    )
}

export default AdminLayout