import React, { useState, useEffect } from 'react'
import { Helmet } from "react-helmet";
import { Link, useParams, useHistory } from 'react-router-dom';
import { AiOutlineSearch, AiOutlineRight } from 'react-icons/ai'
import Footer from '../components/Footer';
import { randomNumber } from '../services/Random';

function DetailPlanet() {

    const { id } = useParams();
    const [randomImg, setRandomImg] = useState(1);
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [loading3, setLoading3] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        getDetailStar();
        getDetailPlanet();
        getDetailAlternate();
        setRandomImg(randomNumber(1, 5))
    }, [])

    //detail star
    const [detailStar, setDetailStar] = useState([]);
    const getDetailStar = async () => {
        let res = await fetch(`http://webdevelopertest.playfusionservices.com/webapptest/stars/${id}`, {
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setDetailStar(result);
            }).finally(() => {
                setLoading(false)
            });

        return res;
    }

    //detail planet
    const [detailPlanet, setDetailPlanet] = useState([]);
    const getDetailPlanet = async () => {
        let res = await fetch(`http://webdevelopertest.playfusionservices.com/webapptest/stars/${id}/planets`, {
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setDetailPlanet(result);
            }).finally(() => {
                setLoading2(false)
            });

        return res;
    }

    //detail alternate name
    const [detailAlternate, setDetailAlternate] = useState([]);
    const getDetailAlternate = async () => {
        let res = await fetch(`http://webdevelopertest.playfusionservices.com/webapptest/stars/${id}/additionalNames`, {
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setDetailAlternate(result);
            }).finally(() => {
                setLoading3(false)
            });

        return res;
    }

    //search box
    const [query, setQuery] = useState("");
    const history = useHistory();

    const onSubmit = (event) => {
        event.preventDefault();
        history.push(`/Result/${query}`);
    }


    return (
        <>
            <Helmet>
                <title>Exoplanet - Detail {id}</title>
                <meta name="description" content="Exoplanet Homepage" />
                <style type="text/css">
                    {`
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

            <section className="h-full min-h-full bg-black py-32">
                <div className="flex flex-col md:flex-row container mx-auto px-10 md:px-0">
                    <div className="flex flex-col md:w-6/12 order-2 md:order-1">

                        <div className="flex flex-row items-center mt-16 md:mt-0">
                            <Link to="/">
                                <h3 className="font-Rajdhani text-white text-xl">Home</h3>
                            </Link>

                            <AiOutlineRight size={16} className="text-white font-Rajdhani mx-2" />
                            {
                                (!loading) ?
                                    <h3 className="font-Rajdhani text-white font-bold text-xl">{detailStar.name}</h3>
                                    : <h3 className="font-Rajdhani text-white font-bold text-xl">-</h3>
                            }
                        </div>

                        {
                            (!loading) ?
                                <h1 className="text-6xl font-AbrilFatface text-white md:mt-24">{detailStar.name}</h1>
                                : <h1 className="text-6xl font-AbrilFatface text-white md:mt-24">-</h1>
                        }

                        {
                            (!loading2) ?
                                <p className="text-white font-Rajdhani text-2xl md:w-8/12 my-4">{detailPlanet._embedded.planets[0].description}</p>
                                : <p className="text-white font-Rajdhani text-2xl md:w-8/12 my-4">-</p>
                        }

                        {
                            (!loading2) ?
                                <p className="text-white font-Rajdhani text-2xl mt-10 md:mt-32">Discover Date :<br />{detailPlanet._embedded.planets[0].discoveryDate}</p>
                                : <p className="text-white font-Rajdhani text-2xl mt-10 md:mt-32">Discover Date :<br />-</p>
                        }


                    </div>

                    <div className="flex flex-col order-1 md:order-2 md:w-6/12 justify-center items-center h-full">
                        <img src={`/images/${randomImg}.png`} className="mt-16" alt="" />
                        <p className="text-white opacity-50 font-Rajdhani text-center">*IMAGE JUST AN ILLUSTRATION</p>
                    </div>
                </div>

            </section>

            <section className="pb-20 bg-black pt-32 md:pt-10">
                <div className="container mx-auto flex flex-col md:flex-row px-10 md:px-0">
                    <div className="flex flex-col md:w-6/12">
                        <h1 className="font-AbrilFatface text-4xl text-white mt-20">More Information</h1>
                        <hr className="bg-white h-1 w-3/12 mt-6 mb-10" />

                        {
                            (!loading && !loading2) ?
                                <div>
                                    <h4 className="font-Rajdhani text-white text-2xl mt-6">Distance From Earth: {(detailStar.distance !== null) ? detailStar.distance : 'unkown'} Light Years</h4>
                                    <h4 className="font-Rajdhani text-white text-2xl">Temperature : {(detailStar.temperature !== null) ? detailStar.temperature : 'unkown'} Kelvin</h4>
                                    <h4 className="font-Rajdhani text-white text-2xl">Radius : {(detailStar.radius !== null) ? detailStar.radius : 'unkown'}</h4>
                                    <h4 className="font-Rajdhani text-white text-2xl">Age : {(detailStar.age !== null) ? detailStar.age : 'unkown'}</h4>
                                    <h4 className="font-Rajdhani text-white text-2xl">MASS : {(detailStar.mass !== null) ? detailStar.mass : 'unkown'}</h4>
                                    <h4 className="font-Rajdhani text-white text-2xl">Discovery Method : {(detailPlanet._embedded.planets[0].discoveryMethod !== null) ? detailPlanet._embedded.planets[0].discoveryMethod : 'unkown'}</h4>
                                    <h4 className="font-Rajdhani text-white text-2xl">List : {(detailPlanet._embedded.planets[0].list !== null) ? detailPlanet._embedded.planets[0].list : 'unkown'}</h4>
                                </div>
                                :
                                <div>
                                    <h4 className="font-Rajdhani text-white text-2xl mt-6">Distance From Earth: - Light Years</h4>
                                    <h4 className="font-Rajdhani text-white text-2xl">Temperature : - Kelvin</h4>
                                    <h4 className="font-Rajdhani text-white text-2xl">Radius : -</h4>
                                    <h4 className="font-Rajdhani text-white text-2xl">Age : -</h4>
                                    <h4 className="font-Rajdhani text-white text-2xl">MASS : -</h4>
                                    <h4 className="font-Rajdhani text-white text-2xl">Discovery Method : -</h4>
                                    <h4 className="font-Rajdhani text-white text-2xl">List : -</h4>
                                </div>
                        }



                    </div>

                    <div className="flex flex-col md:w-6/12">
                        <h1 className="font-AbrilFatface text-4xl text-white mt-20">Alternate Name</h1>
                        <hr className="bg-white h-1 w-3/12 mt-6 mb-10" />
                        {
                            (!loading3) ?
                                detailAlternate._embedded.alternateNames.map((alter, index) => {
                                    return (
                                        <h4 className="font-Rajdhani text-white text-2xl mt-6">{alter.name}</h4>
                                    )
                                })
                                :
                                <h4 className="font-Rajdhani text-white text-2xl">-</h4>
                        }
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default DetailPlanet
