
import React, { useState, useEffect, useContext } from 'react'
import "./Style.css"
import { FirebaseContext } from '../../Firebase/FirebaseProvider'; 
import { getDocs, orderBy, query, limit, startAfter } from 'firebase/firestore';
import { NavLink, useNavigate } from "react-router-dom";

import { useParams } from 'react-router-dom'
import Ticket from '../Components/Moviepage/Cart movies/Ticket';

export default function MoreMovie() {
    let navigate = useNavigate()
    const { messCollect } = useContext(FirebaseContext);
    const [carouselItems, setCarouselItems] = useState([]);

    let param = useParams()
    console.log(param.id)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const q = query(messCollect, limit(4));
                const snapshot = await getDocs(q);
                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setCarouselItems(data);
            }
            catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, [messCollect, param.id]);
    let randomFilm = []
    for (let i = 0; i < 4; i++) {
        let random = Math.floor(Math.random() * carouselItems.length)
        randomFilm.push(carouselItems[random])

    }
    console.log(randomFilm)
    const [selectedMovie, setSelectedMovie] = useState(null);
    const handleBookingClick = (movie) => {
        setSelectedMovie(movie);
      }
    return (
        <div>
            <div className="more-movie">
                {carouselItems.map((item) => (
                    <div key={item.id} className="more-item">
                        <NavLink to={`/movies/${item.id}`}>
                            <img src={item.img} alt={item.nameFilm} />
                        </NavLink>
                        <div className="more-item-contain">
                            <div className="more-item-info">
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
                                <p> / </p>
                                <p>{item.infoFilm.time}</p>
                            </div>
                            <button onClick={() => {
                                navigate(`/movies/${item.id}`)
                                window.location.reload()
                            }} className='name-movie'>
                                <h3>{item.nameFilm}</h3>
                            </button>
                            <button className='get-ticket' onClick={() => handleBookingClick(item)}>Đặt vé</button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedMovie && (
        <Ticket      
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
        />
      )}
        </div>
    )
}
