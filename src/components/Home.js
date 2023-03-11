import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import noImg from "../assets/noimage.jpg";
import { Fragment } from "react";
import { FaPlay } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import "../Style/HomeStyle.css";
import { Container } from "./Navbar";

const Home = () => {
  const { toggle, inPutValue } = useContext(Container);
  const shown = inPutValue ? "search" : "discover";
  const Api = `https://api.themoviedb.org/3/${shown}/tv`;

  const Image = "https://image.tmdb.org/t/p/w500";
  const [ApiHome, setApiHome] = useState([]);
  const [trailer, setTrailer] = useState(false);
  const HomeApiCall = async () => {
    const dataHome = await axios.get(Api, {
      params: {
        api_key: "516a2c26472f6e733afe2625212a373f",
        query: inPutValue,
      },
    });
    const results = dataHome.data.results;
    setApiHome(results);
  };

  useEffect(() => {
    setTimeout(() => {
      HomeApiCall();
    }, 500);
  }, [inPutValue]);
  const HomeTitle = () => {
    setTrailer(true);
  };
  return (
    <Fragment>
      <AiOutlineClose
        onClick={() => setTrailer(true)}
        id={trailer ? "hide" : "close-modal"}
      />
      <div id={trailer ? "" : "NoContainer"} onClick={() => HomeTitle()}>
        <div className={toggle ? "home-container" : "home-container-second"}>
          {ApiHome.map((listHome) => {
            return (
              <Fragment key={listHome.id}>
                <div className="container">
                  <FaPlay fontSize={25} id="playmusic" />
                  <img
                    src={
                      listHome.poster_path
                        ? `${Image}${listHome.poster_path}`
                        : noImg
                    }
                    alt=""
                  />
                  <h3>{listHome.original_name}</h3>
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
