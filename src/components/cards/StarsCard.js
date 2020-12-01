import React from 'react'
import ButtonOutline from '../buttons/ButtonOutline'

function StarsCard({ number, name, distance, temp, radius, onClick }) {
    return (
        <div className="flex flex-col md:flex-row justify-between my-10">
            <div className="flex flex-row">
                <h2 className="font-AbrilFatface text-5xl text-white mr-6">{number}</h2>
                <div className="flex flex-col">
                    <h2 className="font-AbrilFatface text-5xl text-white">{name}</h2>
                    <h4 className="font-Rajdhani text-white text-2xl">Distance From Earth: {distance} Light Years</h4>
                    <h4 className="font-Rajdhani text-white text-2xl">Temperature : {temp} Kelvin</h4>
                    <h4 className="font-Rajdhani text-white text-2xl">Radius : { radius }</h4>
                </div>
            </div>

            <ButtonOutline 
                title="Detail"
                onClick={onClick}
            />
        </div>
    )
}

export default StarsCard
