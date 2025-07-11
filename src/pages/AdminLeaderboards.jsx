import React from 'react'
import Page from '../components/ui/Page'
import { useNavigate, useOutletContext } from 'react-router-dom'
import Card from '../components/ui/Card';
import { IoSettingsSharp } from 'react-icons/io5';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Form from '../components/ui/Form';
import axiosClient from '../axios-client';
import Input from '../components/ui/Input';
import notify from '../lib/notify';
import LeaderboardCard from '../components/LeaderboardCard';
import { FaCircleInfo, FaInfo } from 'react-icons/fa6';

const AdminLeaderboards = () => {
    const { settings, settingsLoading } = useOutletContext();
    const [loading, setLoading] = React.useState(false);
    const [createModal, setCreateModal] = React.useState(false);
    const [leaderboards, setLeaderboards] = React.useState([]);
    const [data, setData] = React.useState({
        name: "",
        cookie: "",
        first_prize: "",
        second_prize: "",
        third_prize: "",
        leaderboard_ends_at: "",
        // status: true,
        description: "",
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

    const fetchLeaderboards = async () => {
        try {
            const res = await axiosClient.get('/leaderboards');
            console.log(res);
            setLeaderboards(res.data.data);
        } catch (err){
            console.log(err);
        }
    }

    React.useEffect(() => {
        fetchLeaderboards();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleToggleCreateModal = (action) => {
        action ? document.body.classList.add('no-scroll') : document.body.classList.remove('no-scroll');
        setCreateModal(action ? true : false);
    }

    const handleCreateLeaderboard = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            const res = await axiosClient.post('/createleaderboard', data);
            console.log(res);
            setLeaderboards(res.data.data);
            notify(res.data.message);
            handleToggleCreateModal(false);
            setLoading(false);
        } catch (err){
            console.log(err);
            setErrors(err.response.data.message);
            notify(err.response.data.message);
            setLoading(false);
        }
    }

    const activeLeaderboards = leaderboards.filter((item) => {
        if(item.status === "active"){
            return item;
        }
    });

    if(!settings && !settingsLoading){
        return (
            <Page className={"flex flex-col min-h-[80svh] items-center justify-center"}>
                {/* <Card tcenter={1} title={"Set Up the Website Settings First."}>
                    <div className="text-sm text-white mt-2 text-center">
                        <p className="text-textSecondary">Please set up the website settings to access the leaderboard settings.</p>
                    </div>
                </Card> */}
                <Card tcenter={1} title={
                    <span className="flex flex-col md:flex-row lg:flex-row items-center gap-4">
                        <IoSettingsSharp className="w-8 h-8 text-yellow-500 animate-spin" />
                        <span>Leaderboards Not Yet Ready</span>
                    </span>
                }>
                    <div className="text-sm text-white mt-2 text-center">
                        {/* <p className="mb-3">We're setting things up!</p> */}
                        <p className="text-textSecondary">Leaderboard settings haven’t been configured yet. Please set up the website settings to access the leaderboard settings.</p>
                    </div>
                </Card>
            </Page>
        )
    }

    const renderLeaderBoards = leaderboards?.map((item, idx) => {
        return (
            <LeaderboardCard key={idx} item={item} setLeaderboards={setLeaderboards} />
        )
    });

    return (
        <Page>
            <div>
                <Button
                    className={"bg-primary text-white"}
                    label={"Start New Leaderboard"}
                    onClick={() => handleToggleCreateModal(true)}
                />
                
                <div className='flex flex-wrap items-center justify-center w-full gap-10 mt-14'>
                    {renderLeaderBoards}
                </div>
            </div>

            {createModal && 
            <Modal title={"Create Leaderboard"} onClose={() => handleToggleCreateModal(false)}>
                {activeLeaderboards?.length > 0 ?
                    <span className='flex items-center gap-4'><FaCircleInfo className='text-lg flex flex-shrink-0 text-accent' /> Please end all active leaderboards before starting a new one.</span>
                    :
                    <Form onSubmit={handleCreateLeaderboard}>
                        <Input
                            id={"name"}
                            name={"name"}
                            onChange={handleChange}
                            value={data.name}
                            placeholder={"Name"}
                            disabled={loading || settingsLoading}
                            error={errors.name}
                        />

                        <Input
                            id={"cookie"}
                            name={"cookie"}
                            onChange={handleChange}
                            value={data.cookie}
                            placeholder={"Cookie"}
                            disabled={loading || settingsLoading}
                            error={errors.cookie}
                        />

                        <Input
                            type={"number"}
                            id={"first_prize"}
                            name={"first_prize"}
                            onChange={handleChange}
                            value={data.first_prize}
                            placeholder={"First Prize Amount"}
                            disabled={loading || settingsLoading}
                            error={errors.first_prize}
                        />

                        <Input
                            type={"number"}
                            id={"second_prize"}
                            name={"second_prize"}
                            onChange={handleChange}
                            value={data.second_prize}
                            placeholder={"Second Prize Amount"}
                            disabled={loading || settingsLoading}
                            error={errors.second_prize}
                        />

                        <Input
                            type={"number"}
                            id={"third_prize"}
                            name={"third_prize"}
                            onChange={handleChange}
                            value={data.third_prize}
                            placeholder={"Third Prize Amount"}
                            disabled={loading || settingsLoading}
                            error={errors.third_prize}
                        />

                        <Input
                            type={"datetime-local"}
                            id={"leaderboard_ends_at"}
                            name={"leaderboard_ends_at"}
                            onChange={handleChange}
                            value={data.leaderboard_ends_at}
                            placeholder={"Leaderboard Ends At"}
                            disabled={loading || settingsLoading}
                            error={errors.leaderboard_ends_at}
                        />

                        <Input
                            id={"description"}
                            name={"description"}
                            onChange={handleChange}
                            value={data.description}
                            placeholder={"Description"}
                            disabled={loading || settingsLoading}
                            error={errors.description}
                        />

                        {/* <label className="flex items-center gap-2 mb-4">
                            <input type="checkbox" className='rounded h-5 w-5' name="status" checked={data.status} onChange={handleChange} />
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
                }
            </Modal>}
        </Page>
    )
}

export default AdminLeaderboards
