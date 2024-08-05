import React, { useContext, useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import { FirebaseContext } from "../../Firebase/FirebaseProvider";
import { query, limit, getDocs } from "firebase/firestore";
import { NavLink } from "react-router-dom";
import Ticket from "./Moviepage/Cart movies/Ticket";
export default function Nowplaying({ activeDot, handleDotClick }) {
  const { messCollect } = useContext(FirebaseContext);
  const [carouselItems, setCarouselItems] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(messCollect, limit(5));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCarouselItems(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [messCollect]);

  const handleBookingClick = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div className="playing-now">
      <div className="now-playing-container">
        <div className="now-playing-item">
          {carouselItems.slice(activeDot, activeDot + 4).map((item) => (
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
                        {index !== item.infoFilm.catagory.length - 1 && (
                          <span>, </span>
                        )}
                      </React.Fragment>
                    ))}
                    <span> / </span>
                    <span className="running-time">{item.infoFilm.time}</span>
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
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedMovie && <Ticket selectedMovie={selectedMovie} />}
    </div>
  );
}
