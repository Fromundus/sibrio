import React from 'react'
import { Link } from 'react-router-dom'

function Unauthorized() {
    return (
        <div className="grid h-screen place-content-center bg-white px-4">
            <div className="text-center">
                <h1 className="text-9xl font-black text-gray-200">401</h1>

                <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Oops!</p>

                <p className="mt-4 text-gray-500">You're unauthorized to access this page.</p>

                <Link
                to={'/'}
                className="mt-6 inline-block rounded bg-primary px-5 py-3 text-sm font-medium text-white hover:bg-accent focus:outline-none focus:ring"
                >
                Go Back Home
                </Link>
            </div>
        </div>
    )
}

export default Unauthorized