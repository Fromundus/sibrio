import React from 'react'
import { useOutletContext, useParams } from 'react-router-dom'
import axiosClient from '../axios-client';
import Page from '../components/ui/Page';
import RenderLeaderboard from '../components/RenderLeaderboard';

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
    }, []);

    return (
      <Page>
        <RenderLeaderboard leaderboard={leaderboard} users={users} loading={loading} settings={settings} settingsLoading={settingsLoading} />
      </Page>
    )
}

export default AdminLeaderboard
