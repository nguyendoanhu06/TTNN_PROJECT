import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../Firebase/FirebaseProvider";
import { PiFilmReelBold } from "react-icons/pi";
import "../styles/Comingsoon.css";
import { query, orderBy, getDocs, limit } from "firebase/firestore";
import { NavLink } from "react-router-dom";
import Trailer from "./Trailer";

export default function Moviecomingsoon() {
  const { messCollect } = useContext(FirebaseContext);
  const [comingSoonMovies, setComingSoonMovies] = useState([]);
  // handle trailer popup
  const [selectedVideoUrl, setSelectedVideoUrl] = useState("");
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(messCollect, limit(10));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const moviesSlice = data.slice(5, 10);
        setComingSoonMovies(moviesSlice);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [messCollect]);
  // handle watch trailer
  const handleWatchTrailer = (videoUrl) => {
    setSelectedVideoUrl(videoUrl);
    setIsTrailerOpen(true);
  };

  //close watch trailer
  const handleCloseTrailer = () => {
    setIsTrailerOpen(false);
  };

  return (
    <div className="coming-soon-section">
      <div className="coming-soon-container">
        <div className="coming-soon-context">
          <div className="coming-soon-wrap">
            <div className="coming-soon-header">
              <div className="coming-soon-header-container">
                <div className="coming-soon-heading">
                  <div className="icon">
                    <PiFilmReelBold className="icon-film" />
                  </div>
                  <div className="top-heading">
                    <h3 className="sub-title">Phim sắp ra mắt</h3>
                    <h2 className="title">Phim sắp được chiếu</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="coming-soon-body">
              <div className="coming-soon-body-container">
                <div className="coming-soon-body-outer">
                  <div className="coming-soon-stage">
                    <div className="now-playing-item">
                      {comingSoonMovies.map((item) => (
                        <div className="content-item" key={item.id}>
                          <NavLink to={`/movies/${item.id}`}>
                            <div className="now-playing-img">
                              <img src={item.img} alt={item.nameFilm} />
                            </div>
                          </NavLink>
                          <div className="now-playing-info">
                            <div className="categories-and-time">
                              <div className="movie-category-now-playing">
                                {item.infoFilm.catagory.map(
                                  (category, index) => (
                                    <React.Fragment key={index}>
                                      <NavLink
                                        to={`/movies-category/${category}`}
                                      >
                                        {category}
                                      </NavLink>
                                      {index !==
                                        item.infoFilm.catagory.length - 1 && (
                                        <span>, </span>
                                      )}
                                    </React.Fragment>
                                  )
                                )}
                                <span> / </span>
                                <span className="running-time">
                                  {item.infoFilm.time}
                                </span>
                              </div>
                            </div>
                            <NavLink to={`/movies/${item.id}`}>

                              <h3 className="movie-now-title">
                                {item.nameFilm}
                              </h3>
                            </NavLink>
                            <button
                              className="booking watch-trailer-btn "
                              onClick={() =>
                                handleWatchTrailer(item.videoTrailer)
                              }
                            >
                              Watch trailer
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Trailer popup */}
      <Trailer
        isOpen={isTrailerOpen}
        selectedVideoUrl={selectedVideoUrl}
        handleClosePopup={handleCloseTrailer}
      />
      {selectedMovie && <Ticket selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} />} 

    </div>

  );
}
