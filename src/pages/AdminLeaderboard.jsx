import React from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import axiosClient from '../axios-client';
import Page from '../components/ui/Page';
import RenderLeaderboard from '../components/RenderLeaderboard';
import AdminUpdateLeaderboardPlayers from '../components/AdminUpdateLeaderboardPlayers';
import Button from '../components/ui/Button';

const AdminLeaderboard = () => {
    const { id } = useParams();
    const [leaderboard, setLeaderboard] = React.useState();
    const [users, setUsers] = React.useState();
    const [loading, setLoading] = React.useState(true);
    const { settings, settingsLoading } = useOutletContext();

    const navigate = useNavigate();

    const fetchLeaderboard = async () => {
      try {
        const res = await axiosClient.get(`/leaderboards/${id}`);
        console.log(res);
        setLeaderboard(res.data.leaderboard);
        setUsers(res.data.users);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }

    React.useEffect(() => {
      fetchLeaderboard();
    }, [id]);

    if(!leaderboard && !loading){
      return (
        <div className='p-6 min-h-[80svh] flex flex-col gap-4 items-center justify-center'>
          <span className='font-bold text-2xl'>Sorry, we can't find that leaderboard.</span>
          <Button
            label={"Go to Leaderboards"}
            className={"bg-primary"}
            onClick={() => navigate('/admin/leaderboards')} 
          />
        </div>
      )
    }

    return (
      <Page className={"flex flex-col gap-8 w-full"}>
        {(leaderboard?.status === "active" || leaderboard?.status === "paused" ) && <AdminUpdateLeaderboardPlayers leaderboard={leaderboard} setLeaderboard={setLeaderboard} users={users} setUsers={setUsers} />}
        <RenderLeaderboard leaderboard={leaderboard} users={users} loading={loading} settings={settings} settingsLoading={settingsLoading} />
      </Page>
    )
}

export default AdminLeaderboard
