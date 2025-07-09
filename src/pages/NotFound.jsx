import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'

function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="grid h-screen place-content-center bg-background px-4">
            <div className="text-center">
                <h1 className="text-9xl font-black text-gray-200">404</h1>

                <p className="text-2xl font-bold tracking-tight text-textSecondary sm:text-4xl">Uh-oh!</p>

                <p className="mt-4 text-white">We can't find that page.</p>

                {/* <Link
                to={'/'}
                className="mt-6 inline-block rounded bg-primary px-5 py-3 text-sm font-medium text-white hover:bg-accent focus:outline-none focus:ring"
                >
                Go Back Home
                </Link> */}
                <div className='w-full flex justify-center mt-8'>
                    <Button
                        type={"button"}
                        className={"bg-primary text-white"}
                        label={"Go Back Home"}
                        onClick={() => navigate('/')}
                    />
                </div>
            </div>
        </div>
    )
}

export default NotFound