import React from 'react'
import Page from '../components/ui/Page'
import Card from '../components/ui/Card'
import Form from '../components/ui/Form'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { toast } from 'react-toastify'
import axiosClient from '../axios-client'
import { useStateContext } from '../context/ContextProvider'

const AdminAccountSettings = () => {
    const [loading, setLoading] = React.useState(false);
    const { id, name, setName } = useStateContext();
    const [username, setUsername] = React.useState("");
    const [data, setData] = React.useState({
        password: "",
        password_confirmation: "",
    });

    React.useEffect(() => {
        if(name){
            setUsername(name);
        }
    }, [name]);

    console.log(id);

    const [errors, setErrors] = React.useState({});

    const notify = (message) => toast(message);
 
    const handleChange = (e) => {
        const { name, value } = e.target;

        if(name === "username"){
            setUsername(value);
        } else {
            setData((prev) => {
                return {
                    ...prev,
                    [name]: value
                }
            });
        }
    }

    const updateUsername = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = {
            username: username
        }

        try {
            const res = await axiosClient.put(`/updateuser/${id}`, data);
            console.log(res);
            notify(res.data.message);
            setName(res.data.user.username);
            setLoading(false);
        } catch (err) {
            console.log(err);
            notify(err.message);
            setLoading(false);
        }
    }

    const updatePassword = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = {
            password: data.password,
            password_confirmation: data.password_confirmation,
        }

        try {
            const res = await axiosClient.put(`/changepassword/${id}`, form);
            console.log(res);
            notify(res.data.message);
            setLoading(false);
            setErrors({});
            setData({
                password: "",
                password_confirmation: "",
            });
        } catch (err) {
            setErrors(err.response.data.message);
            console.log(err);
            notify(err.message);
            setLoading(false);
        }
    }

  return (
    <Page className={"flex flex-col gap-4"}>
        <Card title={"Account Settings"} className={"w-full"}>
            <Form onSubmit={updateUsername}>
                <Input
                    id={"username"}
                    name={"username"}
                    onChange={handleChange}
                    value={username}
                    placeholder={"Username"}
                    disabled={loading}
                    // error={errors.username}
                />
                <Button
                    loading={loading}
                    disabled={loading || !username}
                    type={"submit"}
                    className={"bg-primary text-white w-full flex justify-center"}
                    label={"Update Username"}
                />
            </Form>
        </Card>
        <Card title={"Password Settings"} className={"w-full"}>
            <Form onSubmit={updatePassword}>
                <Input
                    id={"password"}
                    name={"password"}
                    onChange={handleChange}
                    value={data.password}
                    placeholder={"Password"}
                    disabled={loading}
                />
                <Input
                    id={"password_confirmation"}
                    name={"password_confirmation"}
                    onChange={handleChange}
                    value={data.password_confirmation}
                    placeholder={"Password Confirmation"}
                    disabled={loading}
                    error={errors.password}
                />
                <Button
                    loading={loading}
                    disabled={loading}
                    type={"submit"}
                    className={"bg-primary text-white w-full flex justify-center"}
                    label={"Change Password"}
                />
            </Form>
        </Card>
    </Page>
  )
}

export default AdminAccountSettings
