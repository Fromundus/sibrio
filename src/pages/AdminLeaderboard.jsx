import React from 'react'
import { useOutletContext, useParams } from 'react-router-dom'
import axiosClient from '../axios-client';
import Page from '../components/ui/Page';
import RenderLeaderboard from '../components/RenderLeaderboard';
import AdminUpdateLeaderboardPlayers from '../components/AdminUpdateLeaderboardPlayers';

const AdminLeaderboard = () => {
    const { id } = useParams();
    const [leaderboard, setLeaderboard] = React.useState();
    const [users, setUsers] = React.useState();
    const [loading, setLoading] = React.useState(true);
    const { settings, settingsLoading } = useOutletContext();

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

    return (
      <Page className={"flex flex-col gap-8 w-full"}>
        {leaderboard.status === "active" && <AdminUpdateLeaderboardPlayers leaderboard={leaderboard} setLeaderboard={setLeaderboard} users={users} setUsers={setUsers} />}
        <RenderLeaderboard leaderboard={leaderboard} users={users} loading={loading} settings={settings} settingsLoading={settingsLoading} />
      </Page>
    )
}

export default AdminLeaderboard
