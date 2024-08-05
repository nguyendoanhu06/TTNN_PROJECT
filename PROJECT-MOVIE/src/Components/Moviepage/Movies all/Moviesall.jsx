import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../Navbar";
import Bannersidepage from "../../Bannersidepage";
import "../Movies all/styles/Moviesall.css";
import "../../../styles/Moviesplaying.css";
import { FirebaseContext } from "../../../../Firebase/FirebaseProvider";
import { getDocs, query } from "firebase/firestore";
import Footer from "../../Footer";
import { NavLink } from "react-router-dom";
import Ticket from "../Cart movies/Ticket";
export default function Moviesall() {
  const { messCollect } = useContext(FirebaseContext);

  const [moviesItems, setMoviesItems] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleBookingClick = (movie) => {
    setSelectedMovie(movie);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(messCollect);
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMoviesItems(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [messCollect]);
  return (
    <div className="movieAll">
      <div className="header">
        <Navbar />
        <Bannersidepage />
      </div>
      <img
        src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/image-lines-header.jpg"
        className="headerimg"
      ></img>

      {/* movie all body */}
      <div className="movieall-body">
        <div className="movieall-body-container">
          <div className="movieall-body-context">
            <div className="movieall-body-wrap">
              <div className="movieall-list-container">
                <div className="movie-list-grid">
                  {moviesItems.map((item) => (
                    <div className="content-item" key={item.id}>
                <NavLink to={`/movies/${item.id}`}>
                        <div className="now-playing-img">
                          <img src={item.img} alt={item.nameFilm} />
                        </div>
                      </NavLink>
                      <div className="now-playing-info">
                        <div className="categories-and-time">
                          <div className="movie-category-now-playing">
                            {item.infoFilm.catagory.map((category, index) => (
                              <React.Fragment key={index}>
                                <NavLink to={`/movies-category/${category}`}>
                                  {category}
                                </NavLink>
                                {index !==
                                  item.infoFilm.catagory.length - 1 && (
                                  <span>, </span>
                                )}
                              </React.Fragment>
                            ))}
                            <span> / </span>
                            <span className="running-time">
                              {item.infoFilm.time}
                            </span>
                          </div>
                        </div>
                        <NavLink to={`/movies/${item.id}`}>
                          <h3 className="movie-now-title">{item.nameFilm}</h3>
                        </NavLink>
                        <button
                          className="booking"
                          onClick={() => handleBookingClick(item)}
                        >
                          Đặt vé
                        </button>{" "}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
      {selectedMovie && (
        <Ticket
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
        />
      )}
    </div>
  );
}
