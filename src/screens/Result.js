import React, { useState, useEffect } from 'react'

import { Helmet } from "react-helmet";
import { Link, useParams, useHistory } from 'react-router-dom';
import { AiOutlineSearch, AiOutlineRight } from 'react-icons/ai'
import Footer from '../components/Footer';
import StarsCard from '../components/cards/StarsCard';

function Result() {
    const { name } = useParams();

    useEffect(() => {
        getAllStar();
    }, [name]);

    //get all star
    const [stars, setStars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState([]);
    const [number, setNumber] = useState(1);

    //search box
    const [query, setQuery] = useState("");
    const history = useHistory();

    const getAllStar = async () => {
        let res = await fetch(`http://webdevelopertest.playfusionservices.com/webapptest/stars?size=2368`, {
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setStars(result);
                filterStar(result);
            }).finally(() => {
                setLoading(false)
            });

        return res;
    }

    const filterStar = async (data) => {
        let query = name;
        let find = await data._embedded.stars.filter((star) => {
            return star.name.toLowerCase().includes(query.toLowerCase());
        })

        if(find !== null){
            setResult(find);
        }else{
            setResult([]);
        }
    }

    const onSubmit = (event) => {
        event.preventDefault();
        getAllStar();
        setLoading(true);
        history.push(`/Result/${query}`);
    }

    return (
        <div className="bg-black">
            <Helmet>
                <title>Exoplanet - Result Search</title>
                <meta name="description" content="Exoplanet Homepage" />
                <style type="text/css">
                    {`
                    body{
                        background-color: black;
                    }
                `}
                </style>
            </Helmet>

            <nav className="fixed w-full z-30 py-6 bg-black px-10 md:px-0">
                <div className="container mx-auto flex flex-row justify-between items-center">
                    <Link to="/">
                        <h4 className="font-Rajdhani text-white text-2xl">EXOPLANET</h4>
                    </Link>
                    <div className="flex flex-row justify-center items-center">
                        <form onSubmit={onSubmit}>
                            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} name="" placeholder="Search Planet..." className="bg-black mr-10 px-6 py-2 font-Rajdhani text-white" id="" />
                        </form>
                        <AiOutlineSearch size={34} className="cursor-pointer text-white" />
                    </div>
                </div>
            </nav>

            <section className="py-20 bg-black">
                <div className="flex flex-col container mx-auto px-10 md:px-0 h-full">
                    <div className="flex flex-row items-center mt-16">
                        <Link to="/">
                            <h3 className="font-Rajdhani text-white text-xl">Home</h3>
                        </Link>

                        <AiOutlineRight size={16} className="text-white font-Rajdhani mx-2" />

                        <h3 className="font-Rajdhani text-white font-bold text-xl">Result Search</h3>
                    </div>

                    {
                        (!loading) ?
                            <div>
                                <h1 className="font-AbrilFatface text-4xl text-white mt-20">Result For '{name}'</h1>
                                <hr className="bg-white h-1 w-3/12 mt-6 mb-10" />
                                {
                                    (result.length > 0) ?
                                        result.map((data, index) => {
                                            let pk = data._links.self.href;
                                            let result = pk.substr(pk.lastIndexOf('/') + 1);
                                            return (
                                                <StarsCard
                                                    key={index.toString()}
                                                    key={index.toString()}
                                                    number={number + (index)}
                                                    name={data.name}
                                                    distance={(data.distance !== null) ? data.distance : 'unkown'}
                                                    temp={(data.temperature !== null) ? data.temperature : 'unkown'}
                                                    radius={(data.radius !== null) ? data.radius : 'unkown'}
                                                    onClick={`/DetailPlanet/${result}`}
                                                />
                                            )
                                        })
                                        :
                                        <h1 className="text-white font-Rajdhani text-3xl" >No Result Found :(</h1>
                                }

                            </div>
                            :
                            <div className="flex flex-col justify-center items-center h-full md:mt-64">
                                <h1 className="text-white font-Rajdhani text-3xl" >Loading...</h1>
                            </div>
                    }
                </div>
            </section>
        </div>
    )
}

export default Result
