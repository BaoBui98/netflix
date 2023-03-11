import React, { Fragment, useEffect, useState, useContext } from "react";
import axios from "axios";
import noImg from "../assets/noimage.jpg";
import { FaPlay } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import "../Style/MovieeStyle.css";
import { Container } from "./Navbar";

const Moview = () => {
  const [movieData, setMovieData] = useState([]);
  const { toggle, inPutValue } = useContext(Container);
  const shown = inPutValue ? "search" : "discover";
  const API = ` https://api.themoviedb.org/3/${shown}/movie`;
  const Image = "https://image.tmdb.org/t/p/w500";
  const [trailer, setTrailer] = useState(false);

  const CallApiMovies = async () => {
    const data = await axios.get(API, {
      params: {
        api_key: "516a2c26472f6e733afe2625212a373f",
        query: inPutValue,
      },
    });
    const results = data.data.results;
    setMovieData(results);
  };

  useEffect(() => {
    setTimeout(() => {
      CallApiMovies();
    }, 500);
  }, [inPutValue]);
  const HomeTitle = () => {
    setTrailer(true);
  };
  console.log(movieData);
  return (
    <Fragment>
      <AiOutlineClose
        onClick={() => setTrailer(true)}
        id={trailer ? "hide" : "close-modal"}
      />
      <div id={trailer ? "" : "NoContainer"} onClick={() => HomeTitle()}>
        <div className={toggle ? "container-movie" : "container-movie-second"}>
          {movieData.map((index) => {
            return (
              <Fragment key={index.id}>
                <div className="container">
                  <FaPlay fontSize={30} color="white" id="search" />
                  <img
                    src={
                      index.poster_path ? `${Image}${index.poster_path}` : noImg
                    }
                    alt=""
                  />
                  <h3>{index.title}</h3>
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default Moview;
