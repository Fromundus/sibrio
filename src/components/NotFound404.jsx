import React from 'react'
import { Link } from 'react-router-dom'

function NotFound404({message, bottomMessage, link, buttonLabel}) {
    return (
        <div className="bg-white px-4 w-full mt-60">
            <div className="text-center">
                {/* <h1 className="text-9xl font-black text-gray-200">404</h1> */}
                {/* <img src="https://ouch-cdn2.icons8.com/IOds4411cSfE88VtPkCNcWMSZI6df99GgsA-SfI_D9o/rs:fit:368:368/extend:false/wm:1:re:0:0:0.8/wmid:ouch2/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvODIv/NTgwYWNkMTctMjFj/NS00NzEwLWIzNDct/MTdiMjZiYjcyY2Zm/LnN2Zw.png" alt="" /> */}

                {/* <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Ooops!</p> */}

                <p className="mt-4 font-semibold">{message}</p>
                <p className="mt-4 text-gray-500">{bottomMessage}</p>
                {buttonLabel && <Link
                to={link}
                className="mt-6 inline-block rounded bg-primary px-5 py-3 text-sm font-medium text-white hover:bg-accent focus:outline-none focus:ring"
                >
                {buttonLabel}
                </Link>}
            </div>
        </div>
    )
}

export default NotFound404