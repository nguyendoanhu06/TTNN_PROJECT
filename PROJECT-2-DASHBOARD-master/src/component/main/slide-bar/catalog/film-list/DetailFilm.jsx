import React, { useContext, useEffect, useState } from 'react'
import SlideBar from '../../../SlideBar'
import SlideContent from '../../../SlideContent'
import { useParams } from 'react-router-dom';
import { FirebaseContext } from '../../../../context/FirebaseProvider';
import { doc, getDoc } from 'firebase/firestore';

export default function DetailProduct() {
    let param = useParams()

    // ----- Call data -----//
    const { messCollect } = useContext(FirebaseContext)

    let singledoc = doc(messCollect, param.id)
    let [mess, setmess] = useState(null)
    useEffect(() => {
        let getmess = async () => {
            const data = await getDoc(singledoc)
            setmess(data.data())
        }
        getmess()
    }, [])
    console.log(mess)
    // ----- Set up btn Close && Dark theme -----//
    const [slideBarClosed, setSlideBarClosed] = useState(false);
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        const storedDarkMode = localStorage.getItem('darkMode');
        if (storedDarkMode !== null) {
            setDarkMode(JSON.parse(storedDarkMode));
        }
    }, []);

    const closeSlideBar = () => {
        setSlideBarClosed(!slideBarClosed);
    };

    const toggleTheme = () => {
        const updatedDarkMode = !darkMode;
        setDarkMode(updatedDarkMode);
        localStorage.setItem('darkMode', JSON.stringify(updatedDarkMode));
    };

    const renderDetail = () => {
        if (mess !== null) {
            let parts = mess?.videoTrailer.split("/");
            let videoId = parts[parts.length - 1];
            return <div className='detai-content' key={mess.id}>
                <div className="detail-left">
                    <div className="detail-banner">
                        <img src={mess.img} alt="banner" />
                    </div>
                    <div className="hr-detail"></div>
                    <div className="review-content">
                        <h3 data-bs-toggle="modal" data-bs-target="#exampleModal">Watch trailer!</h3>
                        <div>
                            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-lg">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="exampleModalLabel">{mess.nameFilm}</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                        </div>
                                        <div className="modal-body">
                                            <iframe width="560" height="315" src={`https://www.youtube.com/embed/${videoId}`} frameborder="0" allowfullscreen></iframe>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="detail-review">
                        <div id="carouselExampleFade" className="carousel slide carousel-fade">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src={mess.subImg[0]} className="d-block w-100" alt="..." />
                                </div>
                                <div className="carousel-item">
                                    <img src={mess.subImg[1]} className="d-block w-100" alt="..." />
                                </div>
                                <div className="carousel-item">
                                    <img src={mess.subImg[2]} className="d-block w-100" alt="..." />
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true" />
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true" />
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="detail-right">
                    <div className="detail-info">
                        <h1>{mess.nameFilm}</h1>
                        <p>{mess.infoFilm.story}</p>
                        <table className='inf-film'>
                            <tbody>
                                <tr>
                                    <td><span>Overall: </span>{mess.ratedView?.imdb}</td>
                                    <td><span>Duration: </span>{mess.infoFilm?.time}</td>
                                </tr>
                                <tr>
                                    <td><span>User: </span>{mess.ratedView?.user}</td>
                                    <td><span>Country: </span>{mess.infoFilm?.country}</td>
                                </tr>
                                <tr>
                                    <td><span>Category: </span>{mess.infoFilm.catagory ? mess.infoFilm.catagory.join(' / ') : null}</td>
                                    <td><span>Release: </span>{mess?.release}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="list-characters">
                            {mess.infoFilm.cast.map((character, index) => (
                                <div className="characters" key={index}>
                                    <div className="actor-information">
                                        <div className="actor-icon">
                                            <img src={character.img} alt="actors" />
                                        </div>
                                        <div className="role-actor">
                                            <div className="actor-name">
                                                <h6>{character.name}</h6>
                                            </div>
                                            <div className="role">
                                                <h6>as..</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="character-name">
                                        <h6>{character.role}</h6>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        }
    }
    return (
        <div className='home'>
            <div className={slideBarClosed ? 'slide-bar close' : 'slide-bar'}>
                <SlideBar darkMode={!darkMode} toggleTheme={toggleTheme} />
            </div>
            <div className={darkMode ? 'slide-content sun' : 'slide-content moon'} >
                <SlideContent closeSlideBar={closeSlideBar} />
                <div className="slide-container">
                    {renderDetail()}
                </div>
            </div>
        </div>
    )
}
