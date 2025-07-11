import React from 'react'
import Page from '../components/ui/Page'
import { useOutletContext } from 'react-router-dom';
import axiosClient from '../axios-client';
import RenderLeaderboard from '../components/RenderLeaderboard';

const GuestLeaderboard = () => {
  const [leaderboard, setLeaderboard] = React.useState();
  const [users, setUsers] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const { settings, settingsLoading } = useOutletContext();

  const fetchLeaderboard = async () => {
    try {
      const res = await axiosClient.get(`/latestleaderboard`);
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

export default GuestLeaderboard
