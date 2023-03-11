import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Fragment } from "react";
import noImg from "../assets/noimage.jpg";
import "../Style/TrendsStyle.css";
import { Container } from "./Navbar";
import { useContext } from "react";
import YouTube from "react-youtube";

const Trends = () => {
  const Api = " https://api.themoviedb.org/3";
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original/";

  const Image = "https://image.tmdb.org/t/p/w500";
  const { toggle, inPutValue } = useContext(Container);
  const shown = inPutValue ? "search" : "discover";
  const Trends = `/${shown}/movie`;
  const [trailer, setTrailer] = useState(false);
  const [trendData, setTrendData] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [playTrailer, setPlayTrailer] = useState(false);
  const [trendTitle, setTrendTitle] = useState("");
  const ApiTrends = async () => {
    const trendApi = await axios.get(`${Api}${Trends}`, {
      params: {
        api_key: "516a2c26472f6e733afe2625212a373f",
        query: inPutValue,
      },
    });
    const results = trendApi.data.results;
    setTrendData(results);
    setSelectedMovie(results[0]);
    console.log(results);
  };
  const fetchMovie = async (id) => {
    const { data } = await axios.get(`${Api}/movie/${id}`, {
      params: {
        api_key: "516a2c26472f6e733afe2625212a373f",
        append_to_response: "videos",
      },
    });
    return data;
  };
  const selectMovie = async (movie) => {
    setPlayTrailer(false);
    const data = await fetchMovie(movie.id);
    setSelectedMovie(data);
    console.log("movie data", data);
  };
  useEffect(() => {
    setTimeout(() => {
      ApiTrends();
    }, 1000);
  }, [inPutValue]);

  // const TrendTitle = (index) => {
  //   setSelectedMovie(index);
  // };
  const renderTrailer = () => {
    const trailer = selectedMovie.videos.results.find(
      (vid) => vid.name === "Official Trailer"
    );

    const key = trailer ? trailer.key : selectedMovie.videos.results[0].key;
    // return Youtube container params
    return (
      <YouTube
        videoId={key}
        containerClassName={"youtube-container"}
        opts={{
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: 1,
            controls: 0,
          },
        }}
      />
    );
  };
  return (
    <Fragment>
      <div>
        <div
          className={"poster-trends"}
          style={{
            backgroundImage: `url(${IMAGE_PATH}${selectedMovie.backdrop_path})`,
          }}
        >
          <div className="content-trends">
            <button className={"button"} onClick={() => setPlayTrailer(true)}>
              Play Trailer
            </button>
            {playTrailer ? (
              <button
                className={"button button--close"}
                onClick={() => setPlayTrailer(false)}
              >
                Close
              </button>
            ) : null}
            {selectedMovie.videos && playTrailer ? renderTrailer() : null}
            <h2>{selectedMovie.title || selectedMovie.name}</h2>
            <p>{selectedMovie.overview}</p>
          </div>
        </div>
        <div
          className={toggle ? "trends-container" : "trends-container-second"}
        >
          {trendData.map((index) => {
            return (
              <Fragment key={index.id}>
                <div className="container">
                  <FaPlay fontSize={25} id="playmusic" />
                  <img
                    src={
                      index.poster_path ? `${Image}${index.poster_path}` : noImg
                    }
                    alt=""
                    onClick={() => selectMovie(index)}
                  />
                  <h3>{index.title || index.name}</h3>
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default Trends;
