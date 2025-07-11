import React from 'react'
import { useNavigate } from 'react-router-dom'
import { format, formatDistanceToNow } from 'date-fns';
import trophy from "../assets/trophy.png";
import coins from "../assets/coins.png";
import Button from './ui/Button';
import Modal from './ui/Modal';
import axiosClient from '../axios-client';
import notify from '../lib/notify';
import Form from './ui/Form';
import Input from './ui/Input';

const LeaderboardCard = ({ item, setLeaderboards, view }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const [editModal, setEditModal] = React.useState(false);
    const [data, setData] = React.useState({
        name: item?.name ?? "",
        cookie: item?.cookie ?? "",
        first_prize: item?.first_prize ?? "",
        second_prize: item?.second_prize ?? "",
        third_prize: item?.third_prize ?? "",
        leaderboard_ends_at: item?.leaderboard_ends_at ?? "",
        // status: true,
        description: item?.description ?? "",
    });

    const [errors, setErrors] = React.useState({
        name: "",
        cookie: "",
        first_prize: "",
        second_prize: "",
        third_prize: "",
        leaderboard_ends_at: "",
        // status: "",
        description: "",
    });

    const handleToggleEditModal = (action) => {
        action ? document.body.classList.add('no-scroll') : document.body.classList.remove('no-scroll');
        setEditModal(action ? true : false);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleUpdateLeaderboard = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            const res = await axiosClient.put(`/updateleaderboardsettings/${item.id}`, data);
            console.log(res);
            setLeaderboards(res.data.data);
            notify(res.data.message);
            handleToggleEditModal(false);
            setLoading(false);
        } catch (err){
            console.log(err);
            setErrors(err.response.data.message);
            notify(err.response.data.message);
            setLoading(false);
        }
    }

    return (
        <>
            <div className="flex flex-col rounded-2xl items-center flex-shrink-0 border-2 border-b-0 rounded-es-none rounded-ee-none border-purple-300 bg-gradient-to-b from-purple-900 to-transparent bg-opacity-50 hover:scale-105 transition-all relative cursor-pointer">
                <img className='absolute w-32 -top-8 -left-10' src={trophy} alt="" />

                <div className='border-b border-purple-700 w-full p-4 flex justify-end'>
                    {/* <span className='uppercase font-medium text-xs'>{format(item?.created_at, "MMMM d, yyyy | hh:mm:a")}</span> */}
                    {item.status === "active" && <span className='uppercase font-bold text-xs bg-green-500 py-1 px-2 rounded-full'>{item.status}</span>}
                    {item.status === "ended" && <span className='uppercase font-bold text-xs bg-red-500 py-1 px-2 rounded-full'>{item.status}</span>}
                    {item.status === "paused" && <span className='uppercase font-bold text-xs bg-gray-500 py-1 px-2 rounded-full'>{item.status}</span>}
                </div>
                <div className='flex justify-center items-center flex-col w-[300px] pb-4'>
                    <p className="mt-8 font-semibold text-lg">{item.name}</p>
                    {/* <span className='text-textSecondary text-xs font-semibold'>WINNER</span> */}
                    <div className="py-1 px-4 rounded-xl font-semibold mt-2 w-full flex flex-col gap-1 items-center">
                        {item?.top_referred_users[0] && <div className='flex items-center justify-between w-full border border-red-500 bg-red-900 rounded-lg p-2'>
                            <div className='flex items-center gap-2'>
                                <span>{1}</span>
                                <img className='w-6 rounded-full' src={item?.top_referred_users[0]?.avatar} alt="" />
                                <span>{item?.top_referred_users[0]?.name}</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <div className='flex items-center gap-2'>
                                    <img className='w-4' src={coins} alt="" />
                                    {item.first_prize}
                                </div>
                            </div>
                        </div>}

                        {item?.top_referred_users[1] && <div className='flex items-center justify-between w-full border border-blue-500 bg-blue-900 rounded-lg p-2'>
                            <div className='flex items-center gap-2'>
                                <span>{2}</span>
                                <img className='w-6 rounded-full' src={item?.top_referred_users[1]?.avatar} alt="" />
                                <span>{item?.top_referred_users[1]?.name}</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <div className='flex items-center gap-2'>
                                    <img className='w-4' src={coins} alt="" />
                                    {item.second_prize}
                                </div>
                            </div>
                        </div>}

                        {item?.top_referred_users[2] && <div className='flex items-center justify-between w-full border border-green-500 bg-green-900 rounded-lg p-2'>
                            <div className='flex items-center gap-2'>
                                <span>{3}</span>
                                <img className='w-6 rounded-full' src={item?.top_referred_users[2]?.avatar} alt="" />
                                <span>{item?.top_referred_users[2]?.name}</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <div className='flex items-center gap-2'>
                                    <img className='w-4' src={coins} alt="" />
                                    {item.third_prize}
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>
                {(item.status === "active" || item.status === "ended") && <span className='font-semibold uppercase text-textSecondary'>{item.status === "ended" ? "Ended" : "Ends"} {formatDistanceToNow(item.leaderboard_ends_at, {addSuffix: true})}</span>}
                <div className='w-full p-4 flex gap-2 items-center'>
                    {item.status === "active" && <Button
                        label={"Update"}
                        className={"bg-tertiary text-white w-full flex items-center justify-center"}
                        onClick={() => handleToggleEditModal(true)}
                    />}
                    {view && <Button
                        label={"View"}
                        className={"bg-accent text-white w-full flex items-center justify-center"}
                        onClick={() => navigate(`/admin/leaderboards/${item.id}`)}
                    />}
                </div>
            </div>

            {editModal && 
            <Modal title={`Update ${item.name}`} onClose={() => handleToggleEditModal(false)}>
                <Form onSubmit={handleUpdateLeaderboard}>
                    <Input
                        id={"name"}
                        name={"name"}
                        onChange={handleChange}
                        value={data.name}
                        placeholder={"Name"}
                        disabled={loading}
                        error={errors.name}
                    />

                    <Input
                        type={"number"}
                        id={"first_prize"}
                        name={"first_prize"}
                        onChange={handleChange}
                        value={data.first_prize}
                        placeholder={"First Prize Amount"}
                        disabled={loading}
                        error={errors.first_prize}
                    />

                    <Input
                        type={"number"}
                        id={"second_prize"}
                        name={"second_prize"}
                        onChange={handleChange}
                        value={data.second_prize}
                        placeholder={"Second Prize Amount"}
                        disabled={loading}
                        error={errors.second_prize}
                    />

                    <Input
                        type={"number"}
                        id={"third_prize"}
                        name={"third_prize"}
                        onChange={handleChange}
                        value={data.third_prize}
                        placeholder={"Third Prize Amount"}
                        disabled={loading}
                        error={errors.third_prize}
                    />

                    <Input
                        type={"datetime-local"}
                        id={"leaderboard_ends_at"}
                        name={"leaderboard_ends_at"}
                        onChange={handleChange}
                        value={data.leaderboard_ends_at}
                        placeholder={"Leaderboard Ends At"}
                        disabled={loading}
                        error={errors.leaderboard_ends_at}
                    />

                    <Input
                        id={"description"}
                        name={"description"}
                        onChange={handleChange}
                        value={data.description}
                        placeholder={"Description"}
                        disabled={loading}
                        error={errors.description}
                    />

                    {/* <label className="flex items-center gap-2 mb-4">
                        <input type="checkbox" className='rounded h-5 w-5' name="status" checked={data.status} onChange={handleChange} />
                        Enable Leaderboard
                    </label> */}

                    <Button
                        loading={loading}
                        disabled={loading}
                        label={"Save Settings"}
                        type={"submit"}
                        className={"bg-primary text-white flex justify-center"}
                    />
                </Form>
            </Modal>}
        </>
    )
}

export default LeaderboardCard
