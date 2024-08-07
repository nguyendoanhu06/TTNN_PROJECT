import React, { useState, useEffect, useContext } from 'react';
import SlideBar from '../../../SlideBar.jsx';
import SlideContent from '../../../SlideContent.jsx';
import { FirebaseContext } from '../../../../context/FirebaseProvider.jsx';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { NavLink, useParams } from 'react-router-dom';
import { IoAddOutline } from "react-icons/io5";
import Swal from 'sweetalert2';

export default function Product() {

  let [fomrData, setFormData] = useState({
    dayShow: "",
    discount: "",
    id: Math.floor(Math.random() * 100),
    location: "",
    price: "",
    room: "",
    timeShow: "",
  })
  const handleChangeformData = (e) => {
    const newData = { ...fomrData }
    setFormData({
      ...newData,
      [e.target.name]: e.target.value
    })
  }
  let param = useParams()

  const handleSave = (e) => {
    e.preventDefault()
    const newMess = { ...mess }
    newMess.movieShowSchedule.push(fomrData)
    setmess(newMess)
  }
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


  //-----Change-----//
  const handleChangeTitle = (e) => {
    const newMess = { ...mess };
    newMess.nameFilm = e.target.value;
    setmess(newMess);
  };

  const handleChangeDescription = (e) => {
    const newMess = { ...mess };
    newMess.infoFilm.story = e.target.value;
    setmess(newMess);
  };

  const handleChangeImg = (e) => {
    const newMess = { ...mess };
    newMess.img = [e.target.value];
    setmess(newMess);
  };

  const handleChangeRelease = (e) => {
    const newMess = { ...mess };
    newMess.release = e.target.value;
    setmess(newMess);
  };

  const handleChangeTrailer = (e) => {
    const newMess = { ...mess };
    newMess.videoTrailer = e.target.value;
    setmess(newMess);
  };

  const handleChangeOverall = (e) => {
    const newMess = { ...mess };
    newMess.ratedView.imdb = e.target.value;
    setmess(newMess);
  };

  const handleChangeUser = (e) => {
    const newMess = { ...mess };
    newMess.ratedView.user = e.target.value;
    setmess(newMess);
  };

  const handleChangeDiscount = (e) => {
    const newMess = { ...mess };
    newMess.movieShowSchedule.discount = e.target.value;
    setmess(newMess);
  };

  const handleChangeRoom = (e) => {
    const newMess = { ...mess };
    newMess.movieShowSchedule.room = e.target.value;
    setmess(newMess);
  };

  const handleChangeLocation = (e) => {
    const newMess = { ...mess };
    newMess.movieShowSchedule.location = e.target.value;
    setmess(newMess);
  };

  const handleChangeTimeShow = (e) => {
    const newMess = { ...mess };
    newMess.movieShowSchedule.timeShow = e.target.value;
    setmess(newMess);
  };

  const handleChangeDayShow = (e) => {
    const newMess = { ...mess };
    newMess.movieShowSchedule.discount = e.target.value;
    setmess(newMess);
  };

  const handleRangeChangePrice = (e) => {
    const newMess = { ...mess };
    newMess.movieShowSchedule[e.target.name].price = e.target.value;
    setmess(newMess);
  };

  const handleChangePrice = (e) => {
    const newMess = { ...mess };
    newMess.movieShowSchedule[e.target.name].price = e.target.value;
    setmess(newMess);
  };


  const handleImagineChange = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('https://api.imgbb.com/1/upload?key=77270bd5e152653d2dbfd371a5f94c71', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        const data = await response.json();
        const newMess = { ...mess };
        newMess.subImg.push(data.data.url);
        setmess(newMess);
      } else {
        console.error('Upload failed:', response.statusText);
      }
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  //-----Delete img-----//
  const handleDeleteImg = (index) => {
    let newMess = { ...mess };
    newMess.img.splice(index, 1);
    setmess(newMess);

  };
  //-----Delete sub img-----//
  const handleDeleteSubImg = (index) => {
    let newMess = { ...mess };
    newMess.subImg.splice(index, 1);
    setmess(newMess);
  };

  //-----Delete slot-----//
  const handleDeleteSlot = (index) => {
    let newMess = { ...mess };
    newMess.movieShowSchedule.splice(index, 1);
    setmess(newMess);
  };
console.log(mess?.img)
  //-----Render slot content-----//
  const renderSlot = () => {
    return mess?.movieShowSchedule.map((film, index) => {
      return (
        <div className="tag-slot" key={film.id} >
          <span className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#exampleModal${index}`}>{film.dayShow}</span>
          <div>
            {/* Modal */}
            <div className="modal fade" id={`exampleModal${index}`} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                  </div>
                  <div className="modal-body">
                    <div className="price">
                      <div className="films-edit price-edit">
                        <h5>Price</h5>
                        <div className="edit-content">
                          <div className="price">
                            <div className="form-group">
                              <div className="range-price">
                                <input type="number" className="form-control" id="formGroupExampleInput" inputMode="numeric" value={film.price} onChange={handleChangePrice} name={index} />
                                <div className="slide-filter-price">
                                  <div className="price-header">
                                  </div>
                                  <div className="slider">
                                    <div className="process"></div>
                                  </div>
                                  <div className="range-input">
                                    <input type="range" className='range-min' min={0} max={100000} onChange={handleRangeChangePrice} value={film.price} name={index} />
                                    <p>{mess?.movieShowSchedule[0].price}VND</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="formGroupExampleInput">Discount</label>
                      <input type="number" className="form-control" id="formGroupExampleInput" inputMode="numeric" placeholder='Giảm giá' onChange={handleChangeDiscount} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="formGroupExampleInput">Room</label>
                      <input type="number" className="form-control" id="formGroupExampleInput" inputMode="numeric" placeholder='Nhập số phòng' onChange={handleChangeRoom} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="formGroupExampleInput">Location</label>
                      <input type="text" className="form-control" id="formGroupExampleInput" inputMode="numeric" placeholder='Nhập địa điểm' onChange={handleChangeLocation} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="formGroupExampleInput">Time show</label>
                      <input type="time" className="form-control" id="formGroupExampleInput" inputMode="numeric" onChange={handleChangeTimeShow} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="formGroupExampleInput">Day show</label>
                      <input type="date" className="form-control" id="formGroupExampleInput" inputMode="numeric" onChange={handleChangeDayShow} />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="delete" onClick={() => { handleDeleteSlot(index) }}>
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
          </svg>
        </div>
      );
    });
  };
  //-----Render img-----//
  const renderImg = () => {
    if (!mess || !Array.isArray(mess.img) || mess.img.length === 0) {
      return <input type="text" className="form-control" id="formGroupExampleInput" onChange={handleChangeImg} />;
    } else {
      return mess.img.map((item, index) => (
        <div className='img-bread flex-subimg' key={index}>
          <img src={item} alt="img" />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="delete" onClick={() => { handleDeleteImg(index) }}>
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
          </svg>
        </div>
      ));
    }
  };

  //-----Render subimg-----//
  const renderSubimg = () => {
    return mess?.subImg.map((item, index) => {
      return <div className='img-bread flex-subimg' key={index}><img src={item} alt="subImg" />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="delete" onClick={() => { handleDeleteSubImg(index) }} >
          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
        </svg>
      </div>
    })
  }

  // UPDATE
  const updateItem = async (e) => {
    e.preventDefault();
    console.log(param.id, mess)
    await updateDoc(doc(messCollect, param.id), mess);
    Swal.fire({ title: "Update!", text: "Cập nhật thành công!", icon: "success" });
  }

  return (
    <div className='home'>
      <div className={slideBarClosed ? 'slide-bar close' : 'slide-bar'}>
        <SlideBar darkMode={!darkMode} toggleTheme={toggleTheme} />
      </div>
      <div className={darkMode ? 'slide-content sun' : 'slide-content moon'} >
        <SlideContent closeSlideBar={closeSlideBar} />
        <div className="slide-container">
          <div className="films-header">
            <div className="col">
              <nav className="mb-2" aria-label="breadcrumb">
                <ol className="breadcrumb breadcrumb-sa-simple">
                  <li className="breadcrumb-item">
                    <NavLink to={'/dashboard'}>Dashboard</NavLink>
                  </li>
                  <li className="breadcrumb-item">
                    <NavLink to={'/filmslist'}>Film</NavLink>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Edit Film
                  </li>
                </ol>
              </nav>
              <h1 className="h3 m-0">Edit Film</h1>
            </div>
          </div>
          <div className="films-content">
            <form action="">
              <div className="films-overview">
                <div className="form-group">
                  <label htmlFor="formGroupExampleInput">Title</label>
                  <input type="text" className="form-control" id="formGroupExampleInput" value={mess?.nameFilm} onChange={handleChangeTitle} />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleFormControlTextarea1">Description</label>
                  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={mess?.infoFilm.story} onChange={handleChangeDescription}></textarea>
                </div>
                <div className="films-edit">
                  <h5>Specification</h5>
                  <div className="edit-content">
                    <div className="img-release">
                      <div className="edit-img">
                        <div className="form-group">
                          <label htmlFor="formGroupExampleInput">Imagine</label>
                          <div className="img-edit">
                            {renderImg()}
                          </div>
                        </div>
                      </div>
                      <div className="edit-release">
                        <div className="form-group">
                          <label htmlFor="formGroupExampleInput">Release</label>
                          <input type="date" className="form-control" id="formGroupExampleInput" value="2024-01-20" onChange={handleChangeRelease} />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="formGroupExampleInput">Video trailer</label>
                      <input type="text" className="form-control" id="formGroupExampleInput" value={mess?.videoTrailer} onChange={handleChangeTrailer} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="formGroupExampleInput">Sub imagine</label>
                      <div className="sub-img">
                        {renderSubimg()}
                      </div>
                    </div>
                    <input type="file" onChange={handleImagineChange} className='upload-img' />
                  </div>
                </div>
                <div className="films-edit">
                  <h5>Rate</h5>
                  <div className="edit-content">
                    <div className="rate">
                      <div className="rate-release">
                        <div className="edit-rate">
                          <div className="form-group">
                            <label htmlFor="formGroupExampleInput">Overall</label>
                            <input type="number" className="form-control" id="formGroupExampleInput" inputMode="numeric" placeholder={mess?.ratedView?.imdb + " /10"} onChange={handleChangeOverall} />
                          </div>
                        </div>
                        <div className="edit-release">
                          <div className="form-group">
                            <label htmlFor="formGroupExampleInput">User</label>
                            <input type="number" className="form-control" id="formGroupExampleInput" inputMode="numeric" placeholder={mess?.ratedView?.user + " /10"} onChange={handleChangeUser} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="films-edit">
                  <h5>Slot</h5>
                  <div className="slot-show">
                    {renderSlot()}
                    <div>
                      <IoAddOutline type="button" className="add-slot btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" fontSize={32} />
                      <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                          <form className="modal-content">
                            <div className="modal-header">
                              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                              <div className="form-group">
                                <label htmlFor="formGroupExampleInput">Price</label>
                                <input type="number" className="form-control" id="formGroupExampleInput" inputMode="numeric" onChange={handleChangeformData} name="price" value={fomrData.price} placeholder='Nhập số tiền' />
                              </div>
                              <div className="form-group">
                                <label htmlFor="formGroupExampleInput">Discount</label>
                                <input type="number" className="form-control" id="formGroupExampleInput" inputMode="numeric" onChange={handleChangeformData} name="discount" value={fomrData.discount} placeholder='Giảm giá' />
                              </div>
                              <div className="form-group">
                                <label htmlFor="formGroupExampleInput">Room</label>
                                <input type="number" className="form-control" id="formGroupExampleInput" inputMode="numeric" onChange={handleChangeformData} name="room" value={fomrData.room} placeholder='Nhập số phòng' />
                              </div>
                              <div className="form-group">
                                <label htmlFor="formGroupExampleInput">Location</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" inputMode="numeric" onChange={handleChangeformData} name="location" value={fomrData.location} placeholder='Nhập địa điểm' />
                              </div>
                              <div className="form-group">
                                <label htmlFor="formGroupExampleInput">Time show</label>
                                <input type="time" className="form-control" id="formGroupExampleInput" inputMode="numeric" onChange={handleChangeformData} name="timeShow" value={fomrData.timeShow} />
                              </div>
                              <div className="form-group">
                                <label htmlFor="formGroupExampleInput">Day show</label>
                                <input type="date" className="form-control" id="formGroupExampleInput" inputMode="numeric" onChange={handleChangeformData} name="dayShow" value={fomrData.dayShow} />
                              </div>
                            </div>
                            <div className="modal-footer">
                              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                              <button type="sumit" onClick={handleSave} className="btn btn-primary"  >Save changes</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="footer-edit">
                  <button onClick={updateItem}>Update</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div >
    </div >
  );
}
