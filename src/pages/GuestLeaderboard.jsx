import React from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import axiosClient from '../axios-client';
import Page from '../components/ui/Page';
import RenderLeaderboard from '../components/RenderLeaderboard';
import AdminUpdateLeaderboardPlayers from '../components/AdminUpdateLeaderboardPlayers';
import Button from '../components/ui/Button';

const GuestLeaderboard = () => {
    const { id } = useParams();
    const [leaderboard, setLeaderboard] = React.useState();
    const [users, setUsers] = React.useState();
    const [loading, setLoading] = React.useState(true);
    const { settings, settingsLoading } = useOutletContext();

    const navigate = useNavigate();

    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        const res = await axiosClient.get(`/guestleaderboards/${id}`);
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
        <div className='p-6 min-h-[80svh] flex flex-col gap-4 items-center justify-center text-center'>
          <span className='font-bold text-2xl'>Sorry, we can't find that leaderboard.</span>
          <Button
            label={"Go to Leaderboards"}
            className={"bg-primary"}
            onClick={() => navigate('/leaderboards')} 
          />
        </div>
      )
    }

    return (
      <Page className={"flex flex-col gap-8 w-full"}>
          <Button
              className={"bg-tertiary text-white w-fit"}
              label={"Back To Latest Leaderboards"}
              onClick={() => navigate(-1)}
          />
        <RenderLeaderboard leaderboard={leaderboard} users={users} loading={loading} setLoading={setLoading} settings={settings} settingsLoading={settingsLoading} />
      </Page>
    )
}

export default GuestLeaderboard
