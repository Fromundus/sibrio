import React from 'react'
import axiosClient from '../axios-client';
import notify from '../lib/notify';
import Card from './ui/Card';
import { FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { IoIosHelpCircle } from "react-icons/io";
import { format, formatDistanceToNow } from "date-fns";
import Button from './ui/Button';
import Input from './ui/Input';
import Modal from './ui/Modal';
import coins from '../assets/coins.png'
import { useNavigate } from 'react-router-dom'

const AdminUpdateLeaderboardPlayers = ({ leaderboard, setLeaderboard, users, setUsers }) => {
    const [loading, setLoading] = React.useState(false);
    const [helpModal, setHelpModal] = React.useState(false);
    const [declareModal, setDeclareModal] = React.useState(false);
    
    const [topThree, setTopThree] = React.useState([]);

    const [cookie, setCookie] = React.useState("");
    const [cookieErrors, setCookieErrors] = React.useState("");

    const navigate = useNavigate();

    const updateLeaderboardPlayers = async (e) => {
        e.preventDefault();
        setLoading(true);
        setCookieErrors("");

        const data = {
            "cookie_still_active": leaderboard?.cookie_status === "active" ? "yes" : "no",
            "cookie": cookie,
        };

        console.log(data);

        try {
            const res = await axiosClient.put(`/updateleaderboardplayers/${leaderboard?.id}`, data);
            console.log(res);
            setLoading(false);
            setLeaderboard(res.data.leaderboard);
            setUsers(res.data.users);
            setTopThree(res.data.top_three);
            notify(res.data.message);
        } catch (err) {
            console.log(err);
            setCookieErrors(err.response.data.message);
            setLoading(false);
            notify(err.message);
        }
    };

    const updateAndDeclareLeaderboard = async () => {
        setLoading(true);
        setCookieErrors("");

        const data = {
            "cookie_still_active": leaderboard?.cookie_status === "active" ? "yes" : "no",
            "cookie": cookie,
        };

        console.log(data);

        try {
            const res = await axiosClient.put(`/updateleaderboardplayers/${leaderboard?.id}`, data);
            console.log(res);
            document.body.classList.add('no-scroll');
            handleToggleDeclareModal(true);
            setLoading(false);
            setLeaderboard(res.data.leaderboard);
            setUsers(res.data.users);
            setTopThree(res.data.top_three);
            notify(res.data.message);
            
            if(res.data.message === "Cookie Expired"){
                handleToggleDeclareModal(false);
            }
        } catch (err) {
            console.log(err);
            setCookieErrors(err.response.data.message);
            setLoading(false);
            notify(err.message);
        }
    };

    const declareWinner = async () => {
        setLoading(true);
        setCookieErrors("");

        try {
            const res = await axiosClient.put(`/declarewinner/${leaderboard?.id}`);
            console.log(res);
            handleToggleDeclareModal(false);
            setLoading(false);
            // setLeaderboard(res.data.leaderboard);
            // setUsers(res.data.users);
            navigate('/admin/leaderboards')
            notify(res.data.message);
        } catch (err) {
            console.log(err);
            setCookieErrors(err.response.data.message);
            setLoading(false);
            notify(err.message);
        }
    };

    const pauseLeaderboard = async () => {
        setLoading(true);
        setCookieErrors("");

        try {
            const res = await axiosClient.put(`/pauseleaderboard/${leaderboard?.id}`);
            console.log(res);
            setLoading(false);
            setLeaderboard(res.data.leaderboard);
            // setUsers(res.data.users);
            notify(res.data.message);
        } catch (err) {
            console.log(err);
            setCookieErrors(err.response.data.message);
            setLoading(false);
            notify(err.message);
        }
    };

    const handleCookieChange = (e) => {
        const { value } = e.target;
        setCookieErrors("");
        setCookie(value)
    }

    const handleToggleHelpModal = (action) => {
        action ? document.body.classList.add('no-scroll') : document.body.classList.remove('no-scroll');
        setHelpModal(action ? true : false);
    }

    const handleToggleDeclareModal = (action) => {
        action ? document.body.classList.add('no-scroll') : document.body.classList.remove('no-scroll');
        setDeclareModal(action ? true : false);
    }

    return (
        <>
            <Card className={"w-full"} title={
                <div className='w-full flex justify-between items-center'>
                    <span>Player Update Settings</span>
                    {(!leaderboard?.created_at || leaderboard?.cookie_status !== "active") && <button className='text-sm font-normal flex items-center gap-1 border rounded-lg px-4 p-1.5 border-border hover:bg-background' onClick={() => handleToggleHelpModal(true)}>Help <IoIosHelpCircle className='text-lg' /></button>}
                </div>
            }>
                {!leaderboard?.created_at && <span className='text-textSecondary'>Click help to see how to update the leaderboard using cookie.</span>}
                <div className='flex flex-col gap-2 mt-4'>
                    {leaderboard?.updated_at && <div className="flex items-center gap-2 text-sm py-2">
                        <FaClock className="text-tertiary" />
                        <span className="font-medium">Last updated: <span className="text-textSecondary">{format(leaderboard?.updated_at, "MMMM d, yyyy – hh:mm a")} · {formatDistanceToNow(leaderboard?.updated_at, { addSuffix: true })}</span></span>
                    </div>}
                    {leaderboard?.cookie_status !== "active" &&
                    <Input
                        id={"cookie"}
                        name={"cookie"}
                        onChange={handleCookieChange}
                        value={cookie}
                        placeholder={"Cookie"}
                        disabled={loading}
                        error={cookieErrors.cookie}
                    />}

                    {leaderboard.status === "active" &&
                    <Button
                        loading={loading}
                        disabled={loading}
                        type={"button"}
                        onClick={pauseLeaderboard}
                        className={"bg-tertiary text-white w-full flex justify-center"}
                        label={"Pause"}
                    />}

                    <Button
                        loading={loading}
                        disabled={loading}
                        type={"button"}
                        onClick={updateLeaderboardPlayers}
                        className={"bg-primary text-white w-full flex justify-center"}
                        label={leaderboard.status === "paused" ? "Update and Play" : "Update"}
                    />

                    {leaderboard.status === "active" &&
                    <Button
                        loading={loading}
                        disabled={loading}
                        type={"button"}
                        onClick={updateAndDeclareLeaderboard}
                        className={"bg-accent text-white w-full flex justify-center"}
                        label={"Update & Declare"}
                    />}
                </div>
            </Card>

            {declareModal && 
            <Modal title={"Declare Winners"} onClose={() => handleToggleDeclareModal(false)}>
                <div className='flex flex-col gap-2'>
                    {topThree?.map((user, index) => (
                        <motion.div
                            initial={{ x: 50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            key={user?.name}
                            className="flex items-center justify-between bg-gray-900 bg-opacity-80 px-4 py-2 rounded-lg shadow border border-gray-700"
                        >
                            <div className="flex items-center">
                                <span className="text-lg font-bold w-6 text-center mr-4 text-white">
                                    {index + 1}
                                </span>
                                <img
                                    src={user?.avatar}
                                    alt={user?.name}
                                    className="w-10 h-10 rounded-full mr-4 border-2 border-gray-700"
                                />
                                <span className="font-medium text-white">{user?.name}</span>
                            </div>
                            <div className={`py-1 px-2 rounded-xl flex flex-col items-center`}>
                                <div className="flex items-center gap-2">
                                    <img src={coins} className='w-4' alt="" /> {Number(user?.wagered_in_leaderboard * 0.01).toFixed(2)}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <Button
                    loading={loading}
                    disabled={loading}
                    type={"button"}
                    onClick={declareWinner}
                    className={"bg-tertiary text-white w-full flex justify-center mt-4"}
                    label={"Declare Winners"}
                />
            </Modal>}

            {helpModal && 
            <Modal title={"How to update leaderboard using cookie."} onClose={() => handleToggleHelpModal(false)}>
                <div className='w-full justify-center flex text-center'>
                    <span className='text-textSecondary'><strong className='text-red-500'>NOTE:</strong> You must use a pc or laptop to update the leaderboard.</span>
                </div>
                <div className='flex flex-col gap-8 mt-8'>
                    <div className='flex items-center gap-4 w-full'>
                        <div className='w-1/6 flex justify-center'> 
                            <div className='w-5 h-5 flex rounded-full border-2 items-center justify-center'>
                                <span className='text-xs font-bold'>1</span>
                            </div>
                        </div>
                        <div className='w-5/6'>
                            <span>Sign in to your CSGO Empire Account.</span> <a className='text-tertiary font-semibold underline' target='_blank' href="https://csgoempire.com/">CSGO Empire</a>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 w-full'>
                        <div className='w-1/6 flex justify-center'> 
                            <div className='w-5 h-5 flex rounded-full border-2 items-center justify-center'>
                                <span className='text-xs font-bold'>2</span>
                            </div>
                        </div>
                        <div className='w-5/6'>
                            <span>Visit this page</span> <a className='text-tertiary text-wrap font-semibold underline' href="https://csgoempire.com/api/v2/referrals/referred-users?per_page=100&page=1" target='_blank'>CSGO Empire Referred Users</a>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 w-full'>
                        <div className='w-1/6 flex justify-center'> 
                            <div className='w-5 h-5 flex rounded-full border-2 items-center justify-center'>
                                <span className='text-xs font-bold'>3</span>
                            </div>
                        </div>
                        <div className='w-5/6 flex flex-col'>
                            <span>
                                Right-click anywhere on the page and choose Inspect, or press:
                            </span>
                            <div className='flex flex-col'>
                                <span>
                                    <strong>Windows/Linux:</strong> Ctrl + Shift + I  
                                </span>
                                <span>
                                    <strong>macOS:</strong> Cmd + Option + I
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 w-full'>
                        <div className='w-1/6 flex justify-center'> 
                            <div className='w-5 h-5 flex rounded-full border-2 items-center justify-center'>
                                <span className='text-xs font-bold'>4</span>
                            </div>
                        </div>
                        <div className='w-5/6'>
                            <span>Go to <strong>Network Tab</strong> and refresh the page.</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 w-full'>
                        <div className='w-1/6 flex justify-center'> 
                            <div className='w-5 h-5 flex rounded-full border-2 items-center justify-center'>
                                <span className='text-xs font-bold'>5</span>
                            </div>
                        </div>
                        <div className='w-5/6'>
                            <span>On the table below click <strong className='text-primary'>referred-users?per_page=100&page=1</strong></span>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 w-full'>
                        <div className='w-1/6 flex justify-center'> 
                            <div className='w-5 h-5 flex rounded-full border-2 items-center justify-center'>
                                <span className='text-xs font-bold'>6</span>
                            </div>
                        </div>
                        <div className='w-5/6'>
                            <span>Go to Headers Tab and Find Request Headers</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 w-full'>
                        <div className='w-1/6 flex justify-center'> 
                            <div className='w-5 h-5 flex rounded-full border-2 items-center justify-center'>
                                <span className='text-xs font-bold'>7</span>
                            </div>
                        </div>
                        <div className='w-5/6'>
                            <span>Find the Cookie and copy it. It usually starts with <span className='text-green-500'>"_ga=GA*********************"</span></span>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 w-full'>
                        <div className='w-1/6 flex justify-center'> 
                            <div className='w-5 h-5 flex rounded-full border-2 items-center justify-center'>
                                <span className='text-xs font-bold'>7</span>
                            </div>
                        </div>
                        <div className='w-5/6'>
                            <span><button className='text-accent font-bold' onClick={() => handleToggleHelpModal(false)}>Close this modal</button> and paste the cookie on the cookie input in the Leaderboard Settings.</span>
                        </div>
                    </div>
                </div>
            </Modal>}
        </>
    )
}

export default AdminUpdateLeaderboardPlayers
