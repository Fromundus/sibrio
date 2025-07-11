import React, { useEffect, useState } from 'react';
import axiosClient from '../axios-client';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Textarea from '../components/ui/Textarea';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Form from '../components/ui/Form';
import Page from '../components/ui/Page';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import { format, formatDistanceToNow } from "date-fns";
import { FaClock } from 'react-icons/fa';
import Modal from '../components/ui/Modal';
import { FaCoins } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import { IoIosHelpCircle } from "react-icons/io";

export default function AdminSiteSettings() {
    const { settings, setSettings, settingsLoading, leaderboard, setLeaderboard} = useOutletContext();
    const [loading, setLoading] = React.useState(false);
    const [declareModal, setDeclareModal] = React.useState(false);
    const [users, setUsers] = React.useState([]);
    const [helpModal, setHelpModal] = React.useState(false);
    const [topThree, setTopThree] = React.useState([]);

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    // console.log(settings);
    // console.log("users", users);
    // console.log("leaderboard", leaderboard);

    const [cookie, setCookie] = useState("");
    const [cookieErrors, setCookieErrors] = useState("");
    
    const [form, setForm] = useState({
        referral_code: '',
        referral_link: '',
    });

    const [errors, setErrors] = useState({
        referral_code: '',
        referral_link: '',
    });
    
    const notify = (message) => toast(message);

    useEffect(() => {
        if(settings){
            setForm(settings)
        }
    }, [settings]);

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        setErrors({});
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleCookieChange = (e) => {
        const { value } = e.target;
        setCookieErrors("");
        setCookie(value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        const data = form;

        console.log(data);

        try {
            const res = await axiosClient.post('/updatesettings', data);
            setSettings(res.data.settings);
            console.log(res);
            setLoading(false);
            notify(res.data.message);
        } catch (err) {
            console.log(err);
            setErrors(err.response.data.message);
            setLoading(false);
            notify(err.message);
        }
    };

    const updateLeaderboard = async (e) => {
        e.preventDefault();
        setLoading(true);
        setCookieErrors("");

        const data = {
            "has_cookie": leaderboard?.cookie_status === "active" ? "no" : "yes",
            "cookie": cookie,
        };

        console.log(data);

        try {
            const res = await axiosClient.post('/updateleaderboard', data);
            console.log(res);
            setLoading(false);
            setLeaderboard(res.data.leaderboard);
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
            "has_cookie": leaderboard?.cookie_status === "active" ? "no" : "yes",
            "cookie": cookie,
        };

        console.log(data);

        try {
            const res = await axiosClient.post('/updateleaderboard', data);
            console.log(res);
            document.body.classList.add('no-scroll');
            setDeclareModal(true);
            setLoading(false);
            setLeaderboard(res.data.leaderboard);
            setUsers(res.data.leaderboard.referred_users);
            setTopThree(res.data.top_three);
            notify(res.data.message);
            
            if(res.data.message === "Cookie Expired"){
                handleCloseDeclareModal();
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
            const res = await axiosClient.put('/declarewinner');
            console.log(res);
            handleCloseDeclareModal();
            setLoading(false);
            // setLeaderboard(res.data.leaderboard);
            // setUsers(res.data.leaderboard.referred_users);
            notify(res.data.message);
        } catch (err) {
            console.log(err);
            setCookieErrors(err.response.data.message);
            setLoading(false);
            notify(err.message);
        }
    };

    const options = [
        {name: "Daily", value: "daily"},
        {name: "Weekly", value: "weekly"},
        {name: "Monthly", value: "monthly"},
    ];

    // console.log(form);
    // console.log(cookieErrors);

    const handleOpenDeclareModal = () => {
        updateAndDeclareLeaderboard();
    }

    const handleCloseDeclareModal = () => {
        document.body.classList.remove('no-scroll');
        setDeclareModal(false);
    }

    const handleOpenHelpModal = () => {
        document.body.classList.add('no-scroll');
        setHelpModal(true);
    }

    const handleCloseHelpModal = () => {
        document.body.classList.remove('no-scroll');
        setHelpModal(false);
    }

    console.log("settings", settings);
    console.log("topThree", topThree);

    return (
        <Page>
            {/* {settings && !settingsLoading ? <Card title={
                <div className='w-full flex justify-between items-center'>
                    <span>Leaderboard Settings</span>
                    {(!leaderboard?.created_at || leaderboard?.cookie_status !== "active") && <button className='text-sm font-normal flex items-center gap-1 border rounded-lg px-4 p-1.5 border-border hover:bg-background' onClick={handleOpenHelpModal}>Help <IoIosHelpCircle className='text-lg' /></button>}
                </div>
            }>
                {!leaderboard?.created_at && <span className='text-textSecondary'>Click help to see how to update the leaderboard using cookie.</span>}
                <div className='flex flex-col gap-2 mt-4'>
                    {leaderboard?.created_at && <div className="flex items-center gap-2 text-sm py-2">
                        <FaClock className="text-tertiary" />
                        <span className="font-medium">Last updated: <span className="text-textSecondary">{format(leaderboard?.created_at, "MMMM d, yyyy – hh:mm a")} · {formatDistanceToNow(leaderboard?.created_at, { addSuffix: true })}</span></span>
                    </div>}
                    {leaderboard?.cookie_status !== "active" && !settingsLoading && <Input
                        id={"cookie"}
                        name={"cookie"}
                        onChange={handleCookieChange}
                        value={cookie}
                        placeholder={"Cookie"}
                        disabled={loading}
                        error={cookieErrors.cookie}
                    />}

                    <Button
                        loading={loading}
                        disabled={loading}
                        type={"button"}
                        onClick={updateLeaderboard}
                        className={"bg-primary text-white w-full flex justify-center"}
                        label={"Update"}
                    />

                    <Button
                        loading={loading}
                        disabled={loading}
                        type={"button"}
                        onClick={handleOpenDeclareModal}
                        className={"bg-accent text-white w-full flex justify-center"}
                        label={"Update & Declare"}
                    />
                </div>
            </Card>
            :
            !settingsLoading && !settings &&
            <Card tcenter={1} title={"Set Up the Website Settings First."}>
                <div className="text-sm text-white mt-2 text-center">
                    <p className="text-textSecondary">Please set up the website settings to access the leaderboard settings.</p>
                </div>
            </Card>
            } */}
            <Card title={"Website Settings"}>
                <Form onSubmit={handleSubmit}>
                    <Input
                        id={"referral_code"}
                        name={"referral_code"}
                        onChange={handleChange}
                        value={form?.referral_code}
                        placeholder={"Referral Code"}
                        disabled={loading || settingsLoading}
                        error={errors.referral_code}
                    />

                    <Input
                        id={"referral_link"}
                        name={"referral_link"}
                        onChange={handleChange}
                        value={form?.referral_link}
                        placeholder={"Referral Link"}
                        disabled={loading || settingsLoading}
                        error={errors.referral_link}
                    />

                    {/* <Input
                        type={"number"}
                        id={"first_prize"}
                        name={"first_prize"}
                        onChange={handleChange}
                        value={form?.first_prize}
                        placeholder={"First Prize Amount"}
                        disabled={loading || settingsLoading}
                        error={errors.first_prize}
                    />

                    <Input
                        type={"number"}
                        id={"second_prize"}
                        name={"second_prize"}
                        onChange={handleChange}
                        value={form?.second_prize}
                        placeholder={"Second Prize Amount"}
                        disabled={loading || settingsLoading}
                        error={errors.second_prize}
                    />

                    <Input
                        type={"number"}
                        id={"third_prize"}
                        name={"third_prize"}
                        onChange={handleChange}
                        value={form?.third_prize}
                        placeholder={"Third Prize Amount"}
                        disabled={loading || settingsLoading}
                        error={errors.third_prize}
                    />

                    <Input
                        type={"datetime-local"}
                        id={"leaderboard_ends_at"}
                        name={"leaderboard_ends_at"}
                        onChange={handleChange}
                        value={form?.leaderboard_ends_at}
                        placeholder={"Leaderboard Ends At"}
                        disabled={loading || settingsLoading}
                        error={errors.leaderboard_ends_at}
                    />

                    <label className="flex items-center gap-2 mb-4">
                        <input type="checkbox" className='rounded h-5 w-5' name="is_active" checked={form?.is_active} onChange={handleChange} />
                        Enable Leaderboard
                    </label> */}

                    <Button
                        loading={loading}
                        disabled={loading || settingsLoading}
                        label={"Save Settings"}
                        type={"submit"}
                        className={"bg-primary text-white flex justify-center"}
                    />
                </Form>
            </Card>
                        
            {declareModal && 
            <Modal title={"Declare Winners"} onClose={handleCloseDeclareModal}>
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
                                    <FaCoins className="text-[#ed9c07]" /> {Number(user?.total_wagered * 0.01).toFixed(2)}
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
            <Modal title={"How to update leaderboard using cookie."} onClose={handleCloseHelpModal}>
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
                            <span><button className='text-accent font-bold' onClick={handleCloseHelpModal}>Close this modal</button> and paste the cookie on the cookie input in the Leaderboard Settings.</span>
                        </div>
                    </div>
                </div>
            </Modal>}

        </Page>

    );
}
