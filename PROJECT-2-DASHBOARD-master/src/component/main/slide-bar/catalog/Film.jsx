import React, { useState, useEffect, useContext } from 'react';
import SlideBar from '../../SlideBar.jsx';
import SlideContent from '../../SlideContent.jsx';
import { FirebaseContext } from '../../../context/FirebaseProvider.jsx';
import { addDoc, deleteDoc, onSnapshot, query, doc, updateDoc } from 'firebase/firestore';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
export default function Film() {

    const { messCollect } = useContext(FirebaseContext)
    const { values, handleChange, errors, setFieldValue } = useFormik({
        initialValues: {
            id: "8cb9",
            img: "",
            videoTrailer: "",
            nameFilm: "",
            director: "",
            rating: "",
            time: "",
            story: "",
            category: "",
            country: "",
            release: ""
        }
    });
    const [movieShowSchedule, setmovieShowSchedule] = useState([])
    const [subImg, setSubImg] = useState([])
    const [Schedule, setSchedule] = useState(
        {
            dayShow: "",
            discount: "",
            location: "",
            room: "",
            timeShow: "",
            price: "",

        }
    )
    const handleChange2 = (e) => {
        console.log(e.target.value)
        let newData = { ...Schedule }
        setSchedule({
            ...newData,
            [e.target.name]: e.target.value
        })
    }
    const addSlote = () => {
        let newmovieShowSchedule = [...movieShowSchedule]
        newmovieShowSchedule.push(Schedule)
        setmovieShowSchedule(newmovieShowSchedule)
        setSchedule({
            dayShow: "",
            discount: "",
            location: "",
            room: "",
            timeShow: "",
            price: "",
        })
    }
    const [listcast, setlistcast] = useState([])
    const [cast, setcast] = useState(
        {
            name: "",
            img: "",
            role: ""
        }
    )
    const handleChange3 = (e) => {
        console.log(e.target.value, e.target.name)
        let newData = { ...cast }
        setcast({
            ...newData,
            [e.target.name]: e.target.value
        })
    }
    const addcast = () => {
        let newlistcast = [...listcast]
        newlistcast.push(cast)
        setlistcast(newlistcast)
        setcast({
            name: "",
            img: "",
            role: ""
        })
        console.log(newlistcast)
    }
    const renderAddCast = () => {
        return listcast.map((actor, index) => (
            <div key={index}>
                <img src={actor.img} alt={actor.name} />
                {actor.name}
            </div>
        ));
    };
    const [ratedView, setRatedView] = useState([]);
    const [rated, setRated] = useState({
        imdb: "",
        user: "",
    });

    const handleChange4 = (e) => {
        const { name, value } = e.target;
        setRated(prevRated => ({
            ...prevRated,
            [name]: value
        }));
    };

    const addRated = () => {
        const newRatedView = [...ratedView, rated];
        setRatedView(newRatedView);
        setRated({
            imdb: "",
            user: "",
        });
        console.log(newRatedView);
    };

    const renderRatedView = () => {
        return ratedView.map((item, index) => (
            <div key={index}>
                <p>IMDB: {item.imdb}</p>
            </div>
        ));
    };
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


    const handleChangeImg = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        try {
            const response = await fetch('https://api.imgbb.com/1/upload?key=e1a924df0500430ca758b4cc03d468bc', {
                method: 'POST',
                body: formData
            });


            if (response.ok) {
                const data = await response.json();
                let newImg = [...subImg]
                newImg.push(data.data.url)
                setSubImg(newImg)
            } else {
                console.error('Upload failed:', response.statusText);
            }
        } catch (error) {
            console.error('Upload failed:', error);
        }


    }

    const addFilm = async () => {
        let info = { ...values };
        info.category = info.category.split(",");
        let data = {
            nameFilm: info.nameFilm,
            img: info.img,
            videoTrailer: info.videoTrailer,
            infoFilm: {
                category: info.category,
                cast: listcast,
                country: info.country,
                director: info.director,
                rating: info.rating,
                release: info.release,
                story: info.story,
                time: info.time,
            },
            movieShowSchedule: movieShowSchedule,
            ratedView: ratedView,
            subImg: subImg
        };

        console.log(data);
        await addDoc(messCollect, data);
    };
    console.log(values, cast, Schedule, rated)
    return (
        <div className='home'>
            <div className={slideBarClosed ? 'slide-bar close' : 'slide-bar'}>
                <SlideBar darkMode={!darkMode} toggleTheme={toggleTheme} />
            </div>
            <div className={darkMode ? 'slide-content sun' : 'slide-content moon'} >
                <SlideContent closeSlideBar={closeSlideBar} />
                <div className="slide-container">
                    <form>
                        <div className="formik-t">
                            <div>
                                <p>Name Film</p>
                                <input id='nameFilm' onChange={handleChange} value={values.nameFilm}></input>
                                <p></p>
                            </div>
                            <div>
                                <p>Description</p>
                                <input id='story' onChange={handleChange} value={values.story}></input>
                                <p></p>
                            </div>
                            <div>
                                <p>Director</p>
                                <input id='director' onChange={handleChange} value={values.director}></input>
                                <p></p>
                            </div>
                            <div>
                                <p>Video trailer</p>
                                <input id='videoTrailer' onChange={handleChange} value={values.videoTrailer}></input>
                                <p></p>
                            </div>
                            <div>
                                <p>Banner image </p>
                                <input id='img' onChange={handleChange} value={values.img}></input>
                                <p></p>
                            </div>
                            <div>
                                <p>Rating</p>
                                <input type='number' id='rating' onChange={handleChange} value={values.rating}></input>
                                <p></p>
                            </div>
                            <div>
                                <p>Release</p>
                                <input type='date' id='release' onChange={handleChange} value={values.release}></input>
                                <p></p>
                            </div>
                            <div>
                                <p>Time</p>
                                <input type='time' id='time' onChange={handleChange} value={values.time}></input>
                                <p></p>
                            </div>
                            <div>
                                <p>Category</p>
                                <input id='category' onChange={handleChange} value={values.category}></input>
                            </div>
                            <div>
                                <p>Country</p>
                                <input id='country' onChange={handleChange} value={values.country}></input>
                                <p></p>
                            </div>
                        </div>
                        <div>
                            {subImg.map((it) => {
                                return <  img style={{ width: "100px" }} src={it} />
                            })}
                            <p>Sub img </p>
                            <input type='file' onChange={handleChangeImg} ></input>
                            <p></p>
                        </div>
                        <div className="formik-b">
                            <div>
                                {movieShowSchedule.map((it) => {
                                    return <span>{it.day}</span>
                                })}
                                <br />
                                <span className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Add slot</span>
                                {/* Modal */}
                                <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                            </div>
                                            <div>
                                                <p>Day</p>
                                                <input type='date' name='day' onChange={handleChange2} value={Schedule.day}></input>
                                            </div>
                                            <div>
                                                <p>Locale</p>
                                                <input type='string' name='locale' onChange={handleChange2} value={Schedule.locale}></input>
                                            </div>
                                            <div>
                                                <p>Name Cinema</p>
                                                <input type='string' name='nameCinema' onChange={handleChange2} value={Schedule.nameCinema}></input>
                                            </div>
                                            <div>
                                                <p>Time Show</p>
                                                <input type='time' name='timeShow' onChange={handleChange2} value={Schedule.timeShow}></input>
                                            </div>
                                            <div>
                                                <p>Price</p>
                                                <input type='number' name='price' onChange={handleChange2} value={Schedule.price}></input>
                                            </div>
                                            <div>
                                                <p>Discount</p>
                                                <input type='string' name='discount' onChange={handleChange2} value={Schedule.discountiscount}></input>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => { addSlote() }}>Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {renderAddCast()}
                                <span className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal2"  >Add cast</span>
                                {/* Modal */}
                                <div className="modal fade" id="exampleModal2" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                            </div>
                                            <div>
                                                <p>Name</p>
                                                <input type='string' name='name' onChange={handleChange3} value={cast.name}></input>
                                            </div>
                                            <div>
                                                <p>img</p>
                                                <input type='string' name='img' onChange={handleChange3} value={cast.img}></input>
                                            </div>
                                            <div>
                                                <p>Role</p>
                                                <input type='string' name='role' onChange={handleChange3} value={cast.role}></input>
                                            </div>


                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => { addcast() }}>Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {renderRatedView()}
                                <span className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal3"  >Add reatedView</span>
                                {/* Modal */}
                                <div className="modal fade" id="exampleModal3" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                            </div>
                                            <div>
                                                <p>Overall</p>
                                                <input type='number' name='imdb' onChange={handleChange4} value={rated.imdb}></input>
                                            </div>
                                            <div>
                                                <p>User</p>
                                                <input type='number' name='user' onChange={handleChange4} value={rated.user}></input>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => { addRated() }}>Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </form>
                    <button className='add-film' onClick={() => { addFilm(); Swal.fire({ title: "Add!", text: "Thêm thành công!", icon: "success" }) }}>Add Film </button>
                </div>
            </div>
        </div>
    )
}
