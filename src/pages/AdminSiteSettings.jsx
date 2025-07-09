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

export default function AdminSiteSettings() {
    const { settings, setSettings, settingsLoading, leaderboard, setLeaderboard} = useOutletContext();
    const [loading, setLoading] = React.useState(false);
    const [declareModal, setDeclareModal] = React.useState(false);
    const [users, setUsers] = React.useState([]);

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
        leaderboard_type: '',
        first_prize: '',
        second_prize: '',
        third_prize: '',
        terms: '',
        is_active: true,
    });

    const [errors, setErrors] = useState({
        referral_code: '',
        referral_link: '',
        leaderboard_type: '',
        first_prize: '',
        second_prize: '',
        third_prize: '',
        terms: '',
        is_active: '',
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

    console.log(form);

    return (
        <Page>
            <Card title={"Leaderboard Settings"}>
                <div className='flex flex-col gap-2'>
                    {leaderboard?.created_at && <div className="flex items-center gap-2 text-sm py-2">
                        <FaClock className="text-tertiary" />
                        <span className="font-medium">Last updated: <span className="text-textSecondary">{format(leaderboard?.created_at, "MMMM d, yyyy – hh:mm a")} · {formatDistanceToNow(leaderboard?.created_at, { addSuffix: true })}</span></span>
                    </div>}
                    {leaderboard?.cookie_status !== "active" && <Input
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
            <Card className={"mt-4"} title={"Website Settings"}>
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

                    <Select
                        id={"leaderboard_type"}
                        name={"leaderboard_type"}
                        onChange={handleChange}
                        value={form?.leaderboard_type}
                        placeholder={"Leaderboard Type"}
                        disabled={loading || settingsLoading}
                        error={errors.leaderboard_type}
                        options={options}
                        defaultOption={{value: "", name: "Please Select a type"}}
                    />

                    <Input
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

                    <Textarea
                        id={"terms"}
                        name={"terms"}
                        onChange={handleChange}
                        value={form?.terms}
                        placeholder={"Terms & Conditions"}
                        disabled={loading || settingsLoading}
                        error={errors.terms}
                    />

                    <label className="flex items-center gap-2 mb-4">
                        <input type="checkbox" className='rounded h-5 w-5' name="is_active" checked={form?.is_active} onChange={handleChange} />
                        Enable Leaderboard
                    </label>

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
                {users?.splice(0, 3).map((user, index) => (
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
                                <FaCoins className="text-[#ed9c07]" /> {Number(user?.total_wagered).toFixed(2)}
                            </div>
                        </div>
                    </motion.div>
                ))}

                <Button
                    loading={loading}
                    disabled={loading}
                    type={"button"}
                    onClick={declareWinner}
                    className={"bg-tertiary text-white w-full flex justify-center mt-4"}
                    label={"Declare Winners"}
                />
            </Modal>}

        </Page>

    );
}
