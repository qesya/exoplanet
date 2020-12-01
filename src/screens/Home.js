import React, { useState, useEffect, useRef } from 'react'
import { Helmet } from "react-helmet";
import { Link, useHistory } from 'react-router-dom';
import { AiOutlineSearch, AiOutlineAlignRight, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import StarsCard from '../components/cards/StarsCard';
import Footer from '../components/Footer';
import ButtonOutline from '../components/buttons/ButtonOutline';

function Home() {

    //store stars
    const [listStars, setListStars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currPage, setCurrPage] = useState(1);
    const displayRef = useRef(null);
    const [number, setNumber] = useState(1);

    //store planet
    const [loading2, setLoading2] = useState(true);
    const [listPlanets, setListPlanets] = useState([]);

    //search box
    const [query, setQuery] = useState("");
    const history = useHistory();

    useEffect(() => {
        getAllStars();
        getAllPlanet();
    }, [currPage]);

    const getAllStars = async () => {
        let res = await fetch(`http://webdevelopertest.playfusionservices.com/webapptest/stars?page=${currPage}&sort=numberOfPlanets`, {
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setListStars(result);
            }).finally(() => {
                setLoading(false)
            });

        return res;
    }

    const getAllPlanet = async () => {
        let res = await fetch(`http://webdevelopertest.playfusionservices.com/webapptest/planets?page=${currPage}`, {
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setListPlanets(result);
            }).finally(() => {
                setLoading2(false)
            });

        return res;
    }

    const onSubmit = (event) => {
        event.preventDefault();
        history.push(`/Result/${query}`);
    }


    return (
        <>
            <Helmet>
                <title>Exoplanet - Home</title>
                <meta name="description" content="Exoplanet Homepage" />
                <style type="text/css">
                    {`
                    body{
                        overflow-x:hidden;
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

            <section className="h-full min-h-full bg-black">
                <div className="container mx-auto flex flex-col h-full justify-around px-10 md:px-0">

                    <div className="flex flex-col mt-48">
                        <h1 className="text-3xl md:text-6xl mt-16 font-AbrilFatface text-white md:w-4/12 leading-none">
                            What is Exoplanet ?
                        </h1>
                        <p className="font-Rajdhani text-white text-base md:w-4/12 mt-10">
                            All of the planets in our solar system orbit around the Sun. Planets that orbit around other stars are called exoplanets
                        </p>

                        <div className="bg-red-600 py-4 px-16 flex self-start mt-10 rounded-md cursor-pointer" onClick={() => {
                            window.scrollTo({
                                behavior: "smooth",
                                top: displayRef.current.offsetTop,
                            });
                        }}>
                            <p className="font-AbrilFatface text-white">Discover</p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row mt-16">
                        <div className="flex flex-row items-center">
                            {
                                (!loading) ?
                                    <h4 className="text-white font-AbrilFatface text-3xl md:text-6xl mr-4">{listStars.page.totalElements}</h4>
                                    : <h4 className="text-white font-AbrilFatface text-3xl md:text-6xl mr-4">0</h4>
                            }
                            <h4 className="text-white font-AbrilFatface text-3xl md:w-3/12 leading-none">Knowns Stars</h4>
                        </div>

                        <div className="flex flex-row items-center">
                            {
                                (!loading2) ?
                                    <h4 className="text-white font-AbrilFatface text-3xl md:text-6xl mr-4">{listPlanets.page.totalElements}</h4>
                                    : <h4 className="text-white font-AbrilFatface text-3xl md:text-6xl mr-4">0</h4>
                            }
                            <h4 className="text-white font-AbrilFatface text-3xl md:w-3/12 leading-none">Knowns Planets</h4>
                        </div>
                    </div>

                    <img src="/images/planet.png" className="hidden md:flex md:absolute md:right-0 md:top-0 -mt-16 -mr-16 md:-z-10 md:bottom-0 select-none" alt="" />
                </div>
            </section>


            <section className="py-48 pb-20 bg-black">
                <div className="container mx-auto flex flex-col h-full px-10 md:px-0" ref={displayRef}>
                    <h1 className="font-AbrilFatface text-4xl text-white mt-20">List Of Known Stars</h1>
                    <hr className="bg-white h-1 w-3/12 mt-6 mb-10" />

                    {
                        (!loading) ?
                            listStars._embedded.stars.map((star, index) => {
                                let pk = star._links.self.href;
                                let result = pk.substr(pk.lastIndexOf('/') + 1);
                                return (
                                    <StarsCard
                                        key={index.toString()}
                                        number={number + (index)}
                                        name={star.name}
                                        distance={(star.distance !== null) ? star.distance : 'unkown'}
                                        temp={(star.temperature !== null) ? star.temperature : 'unkown'}
                                        radius={(star.radius !== null) ? star.radius : 'unkown'}
                                        onClick={`/DetailPlanet/${result}`}
                                    />
                                )
                            }
                            )
                            : null
                    }

                    {
                        (!loading) ?
                            <div className="flex flex-row justify-between items-center">
                                <a className="cursor-pointer p-10"
                                    onClick={() => {
                                        if (currPage <= 1) {
                                            alert('What are you doing ?')
                                        } else {
                                            setCurrPage(currPage - 1);
                                            window.scrollTo({
                                                behavior: "smooth",
                                                top: displayRef.current.offsetTop,
                                            });
                                            setNumber(number - listStars.page.size)
                                        }
                                    }
                                    }
                                >
                                    <AiOutlineLeft className="text-white" size={24} />
                                </a>

                                <div className="flex">
                                    <p className="text-white font-Rajdhani text-xl mt-10">Page : {currPage} of {listStars.page.totalPages}</p>
                                </div>

                                <a className="cursor-pointer p-10"
                                    onClick={() => {
                                        if (currPage > listStars.page.totalPages) {
                                            alert('What are you doing ?')
                                        } else {
                                            setCurrPage(currPage + 1);
                                            window.scrollTo({
                                                behavior: "smooth",
                                                top: displayRef.current.offsetTop,
                                            });
                                            setNumber(number + listStars.page.size)
                                        }
                                    }
                                    }
                                >
                                    <AiOutlineRight className="text-white" size={24} />
                                </a>
                            </div>
                            : null
                    }
                </div>
            </section>

            <Footer />
        </>
    )
}

export default Home
