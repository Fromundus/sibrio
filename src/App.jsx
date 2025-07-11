import React from 'react';
import "./App.css";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { ContextProvider } from './context/ContextProvider';
import Unauthorized from './pages/Unauthorized';
import NotFound from './pages/NotFound';
import GuestLayout from './layouts/GuestLayout';
import Landing from './pages/Landing';
import RequireAuthentication from './components/RequireAuthentication';
import AdminLayout from './layouts/AdminLayout';
import Login from './pages/Login';
import AdminSiteSettings from './pages/AdminSiteSettings';
import AdminAccountSettings from './pages/AdminAccountSettings';
import AdminLeaderboard from './pages/AdminLeaderboard';
import GuestLatestLeaderboard from './pages/GuestLatestLeaderboard';
import AdminLeaderboards from './pages/AdminLeaderboards';
import GuestLeaderboard from './pages/GuestLeaderboard';

const roles = {
    admin: "admin",
}

const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path='/' element={<GuestLayout />}>
            <Route index element={<Landing />} />
            <Route path='leaderboards' element={<GuestLatestLeaderboard />} />
            <Route path='leaderboards/:id' element={<GuestLeaderboard />} />
            <Route path='login' element={<Login />} />
            {/* <Route path="signup" element={<Signup />} /> */}
        </Route>

        <Route element={<RequireAuthentication allowedRoles={roles.admin} />}>
            <Route path={`${roles.admin}`} element={<AdminLayout />}>
                {/* <Route index element={<Home />} /> */}
                <Route index element={<AdminSiteSettings />} />
                {/* <Route path='leaderboards' element={<Leaderboard userType={1} />} /> */}
                <Route path='leaderboards' element={<AdminLeaderboards />} />
                <Route path='leaderboards/:id' element={<AdminLeaderboard /> } />
                <Route path='account' element={<AdminAccountSettings userType={1} />} />
            </Route>
        </Route>

        {/* <Route element={<RequireAuthentication allowedRoles={roles.user} />}>
            <Route path={`${roles.user}`} element={<UserLayout />}>
                <Route index element={<UserHome />} />
            </Route>
        </Route> */}

        <Route path='unauthorized' element={<Unauthorized />} />

        <Route path="*" element={<NotFound />} />
    </>
))

function App() {
    return (
        <ContextProvider>
            <RouterProvider router={router} />
        </ContextProvider>
    )
}

export default App