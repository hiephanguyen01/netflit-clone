import Head from "next/head";
import Banner from "../compoments/Banner";
import Header from "../compoments/Header";
import { Movie } from "../typings";
import requests from "../utils/request";
import Link from "next/link";
import { SearchIcon, BellIcon } from "@heroicons/react/solid";

import Image from "next/image";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { baseUrl } from "../contants/movie";

import { FaPlay } from "react-icons/fa";
import { InformationCircleIcon } from "@heroicons/react/outline";
import Row from "../compoments/Row";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import Thumbnail from "../compoments/Thumbnail";

interface Props {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
}

const Home = ({
  netflixOriginals,
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  romanceMovies,
  topRated,
  trendingNow,
}: Props) => {
  const title = "Trending";
  const movies = trendingNow;

  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const [movie, setMovie] = useState<Movie | null>(null);
  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals?.length)]
    );
  }, [netflixOriginals]);

  // row
  const rowRef = useRef<HTMLDivElement>(null)
  const [isMoved, setIsMoved] = useState(false)

  const handleClick = (direction: string) => {
    setIsMoved(true)
    if (rowRef.current) {
      const { scrollLeft, clientWidth} = rowRef.current
      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth
      rowRef.current.scrollTo({ left: scrollTo,behavior: 'smooth' })
    }
  }

  // end row

  return (
    <div className="relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]">
      <Head>
        <title>Netflit | Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* start header */}
      <header className={`${isScrolled && "bg-[#141414]"}`}>
        <div className=" flex items-center space-x-2 md:space-x-10">
          <img
            src="https://rb.gy/ulxxee"
            width={100}
            height={100}
            className="cursor-pointer object-contain"
          />
          <ul className="hidden md:flex space-x-4">
            <li className="headerLink cursor-default font-semibold text-white hover:text-white">
              Home
            </li>
            <li className="headerLink ">TV Shows</li>
            <li className="headerLink">Movies</li>
            <li className="headerLink">New & Popular</li>
            <li className="headerLink">My List</li>
          </ul>
        </div>

        <div className="flex items-center space-x-4 text-sm font-light">
          <SearchIcon className="sm hidden h-6 w-6 sm:inline" />
          <BellIcon className="h-6 w-6" />
          <p className="hidden lg:inline">Kids</p>

          <Link href="/account">
            <img
              src="https://rb.gy/g1pwyx"
              alt=""
              className="cursor-pointer rounded"
            />
          </Link>
        </div>
      </header>
      {/* End Header */}

      <main className="relative pl-4 pb-24  lg:pl-16">
        {/* banner start */}
        <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[75vh] lg:justify-end lg:pt-12">
          <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
            <Image
              layout="fill"
              objectFit="cover"
              src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
            />
          </div>
          <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <p
            className="max-w-xs text-xs md:max-w-lg md:text-lg lg:max-w-2xl
      lg:text-2xl"
          >
            {movie?.overview}
          </p>
          <div className="flex space-x-3">
            <button className="bannerButton bg-white text-black">
              <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" />
              Play
            </button>

            <button
              className="bannerButton bg-[gray]/70"
              // onClick={() => {
              //   setCurrentMovie(movie)
              //   setShowModal(true)
              // }}
            >
              More Info
              <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" />
            </button>
          </div>
        </div>
        {/* banner end */}

{/* start row */}
        <section className="md:space-y-24">
          <div className="h-40 space-y-0.5 md:space-y-2">
            <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
              {title}
            </h2>
            <div className="group relative md:-ml-2">
              <ChevronLeftIcon
                className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
                  !isMoved && 'hidden'
                } '
          `}
                  onClick={() => handleClick('left')}
              />
              <div
                className="flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2"
                  ref={rowRef}
              >
                {movies.map((movie) => (
                  <div
                  key={movie.id}
                  className={`relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105`}
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${
                      movie.backdrop_path || movie.poster_path
                    }`}
                    className="rounded-sm object-cover md:rounded"
                    layout="fill"
                  />
                </div>
                ))}
              </div>
              <ChevronRightIcon
                className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
                  onClick={() => handleClick('right')}
              />
            </div>
          </div>
          {/* end row */}

          {/* <Row title="Trending Now" movies={trendingNow} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action Thrillers" movies={actionMovies} />
          My List
          {list.length > 0 && <Row title="My List" movies={list} />}

          <Row title="Comedies" movies={comedyMovies} />
          <Row title="Scary Movies" movies={horrorMovies} />
          <Row title="Romance Movies" movies={romanceMovies} />
          <Row title="Documentaries" movies={documentaries} /> */}
        </section>
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ]);

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    },
  };
};
