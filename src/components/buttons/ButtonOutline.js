import React from 'react'
import { Link } from 'react-router-dom';

function ButtonOutline({ title, onClick }) {
    return (
        <div>
            <Link className="border-white border-2 py-4 px-16 flex flex-row md:self-start mt-10 rounded-md w-full hover:bg-white hover:text-black transition  duration-500 ease-in-out" to={onClick}>
                <p className="font-AbrilFatface text-white hover:text-black w-full">{ title }</p>
            </Link>
        </div>
    )
}

export default ButtonOutline
