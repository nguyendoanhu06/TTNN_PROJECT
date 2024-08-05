import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../Navbar";
import Bannersidepage from "../../Bannersidepage";
import "../Movies category/moviescategory.css";
import "../Movies all/styles/Moviesall.css";
import "../../../styles/Moviesplaying.css";
import { FirebaseContext } from "../../../../Firebase/FirebaseProvider";
import { getDocs, query } from "firebase/firestore";
import Footer from "../../Footer";
import { NavLink, useParams } from "react-router-dom";
import Ticket from "../Cart movies/Ticket";
export default function Moviescategory() {
  const { category } = useParams();
  const { messCollect } = useContext(FirebaseContext);
  const [moviesItems, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleBookingClick = (movie) => {
    setSelectedMovie(movie);
  }
  useEffect(() => {
    const fetchMoviesByCategory = async () => {
      try {
        const snapshot = await getDocs(messCollect);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const moviesInCategory = data.filter((movie) =>
          movie.infoFilm.catagory.includes(category)
        );
        setMovies(moviesInCategory);
      } catch (error) {
        console.error("Error fetching movies by category: ", error);
      }
    };

    fetchMoviesByCategory();
  }, [category, messCollect]);
  return (
    <div className="moviescategory">
      <div className="moviescategory-header">
        <Navbar />
        <Bannersidepage />
        <img
          src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/image-lines-header.jpg"
          className="headerimg"
        ></img>
      </div>
      <div className="moviescategory-body">
        <div className="moviescategory-body-container">
          <div className="moviescategory-body-context">
            <div className="moviescategory-body-wrap">
              <div className="moviescategory-grid">
                {moviesItems.map((movie) => (
                  <div className="content-item" key={movie.id}>
                      <NavLink to={`/movies/${movie.id}`}>
                      <div className="now-playing-img">
                        <img src={movie.img} alt={movie.nameFilm} />
                      </div>
                    </NavLink>
                    <div className="now-playing-info">
                      <div className="categories-and-time">
                        <div className="movie-category-now-playing">
                          {movie.infoFilm.catagory.map((category, index) => (
                            <React.Fragment key={index}>
                              <NavLink to={`/movies-category/${category}` } target="_blank">
                                {category}
                              </NavLink>
                              {index !== movie.infoFilm.catagory.length - 1 && (
                                <span>, </span>
                              )}
                            </React.Fragment>
                          ))}
                          <span> / </span>
                          <span className="running-time">
                            {movie.infoFilm.time}
                          </span>
                        </div>
                      </div>
                      <NavLink to={`/movies/${movie.id}`}>
                        <h3 className="movie-now-title">{movie.nameFilm}</h3>
                      </NavLink>
                      <button
                                className="booking"
                                onClick={() => handleBookingClick(movie)}
                              >
                                Đặt vé
                              </button>                         </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
      {selectedMovie && (
        <Ticket
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
        />
      )}
    </div>
  );
}
