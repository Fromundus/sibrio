import React from 'react'
import axiosClient from '../axios-client';
import { useStateContext } from '../context/ContextProvider';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Page from '../components/ui/Page';
import Card from '../components/ui/Card';
import Form from '../components/ui/Form';

function Login() {
    React.useEffect( () => {
        window.scrollTo(0 ,0);
    }, [])

    const [isLoading, setIsloading] = React.useState(false);
    const { setToken, setRole, setName, setId } = useStateContext();
    const [data, setData] = React.useState({
        username: "",
        password: "",
    });

    const [errors, setErrors] = React.useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData( (prev) => {
            return {
                ...prev,
                [name]: value
            }
        })

        setErrors("");
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsloading(true);
        setErrors("");

        axiosClient.post("/login", data)
            .then( ({data}) => {
                console.log(data);
                if(data.message === "Invalid Credentials"){
                    setErrors(data.message);
                } else if (data.message === "Pending Account"){
                    setErrors(data.message);
                } else {
                    setErrors("Invalid Account")
                }

                setToken(data.token);
                setRole(data.role);
                setName(data.name);
                setId(data.id);
                setIsloading(false);
            })
            .catch( (err) => {
                console.log(err)
                if(err?.response?.status === 422){
                    setErrors("Invalid Credentials")
                }

                if(err.message === "Network Error"){
                    setErrors("Server Offline")
                }
                setIsloading(false);
            })
    }

    return (
        <Page className={"min-h-[80svh] w-full flex items-center"}>
            <Card title={"Admin Login"} className={"w-full"} tcenter={1}>
                <Form onSubmit={handleSubmit}>
                    {errors && <span className='text-center bg-red-400 p-1.5 rounded text-white font-semibold mb-2'>{errors}</span>}
                     <Input 
                         id="username"
                         type={"text"}
                         name={"username"}
                         placeholder={"username"}
                         onChange={handleChange}
                         value={data.username}
                         error={errors.username}
                     />

                     <Input 
                         id="password"
                         type={"password"}
                         name={"password"}
                         placeholder={"password"}
                         onChange={handleChange}
                         value={data.password}
                         error={errors.password}
                     />

                     <Button
                         label={"Login"}
                         className={"bg-primary text-white flex justify-center"}
                         type={"submit"}
                         disabled={data.username.length === 0 || data.password.length === 0 || isLoading}
                         loading={isLoading}
                     />
                </Form>
            </Card>
        </Page>
    )
}

export default Login