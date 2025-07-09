import React from 'react'
import axiosClient from '../axios-client';
import { useStateContext } from '../context/ContextProvider';
import { Link } from 'react-router-dom';
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
        email: "",
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
                // console.log(err)
                if(err.response.status === 422){
                    setErrors("Invalid Credentials")
                }
                setIsloading(false);
            })
    }

    return (
        // <div className="flex flex-col w-full max-w-md p-4 mx-auto mt-24">
        //     <div className='flex flex-col items-center w-full'>
        //         <span className='text-3xl font-semibold'>Admin Login</span>
        //         <form className='flex flex-col gap-4 mt-8 text-black w-full z-50' onSubmit={handleSubmit}>
        //             {errors && <span className='text-center bg-red-500 p-2 rounded text-white font-semibold mb-2'>{errors}</span>}

        //             <Input 
        //                 id="email"
        //                 type={"email"}
        //                 name={"email"}
        //                 placeholder={"email"}
        //                 onChange={handleChange}
        //                 value={data.email}
        //                 error={errors.email}
        //             />

        //             <Input 
        //                 id="password"
        //                 type={"password"}
        //                 name={"password"}
        //                 placeholder={"password"}
        //                 onChange={handleChange}
        //                 value={data.password}
        //                 error={errors.password}
        //             />

        //             <Button
        //                 label={"Login"}
        //                 className={"bg-primary text-white flex justify-center"}
        //                 type={"submit"}
        //                 disabled={data.email.length === 0 || data.password.length === 0 || isLoading}
        //                 loading={isLoading}
        //             />
        //         </form>
        //     </div>
        // </div>
        <Page>
            <Card title={"Admin Login"} tcenter={1} className={"mt-20"}>
                <Form onSubmit={handleSubmit}>
                     <Input 
                         id="email"
                         type={"email"}
                         name={"email"}
                         placeholder={"email"}
                         onChange={handleChange}
                         value={data.email}
                         error={errors.email}
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
                         disabled={data.email.length === 0 || data.password.length === 0 || isLoading}
                         loading={isLoading}
                     />
                </Form>
            </Card>
        </Page>
    )
}

export default Login