import Image from "next/image";
import React, { useState } from "react";
import { useEffect } from "react";
import { baseUrl } from "../contants/movie";
import { Movie } from "../tyings";

interface Props {
  netflixOriginals: Movie[];
}
function Banner({ netflixOriginals }: Props) {
  const [movie, setMovie] = useState<Movie | null>(null);
  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    );
  }, [netflixOriginals]);
  return (
    <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
      <Image
        layout="fill"
        objectFit="cover"
        src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
      />
    </div>
  );
}

export default Banner;
