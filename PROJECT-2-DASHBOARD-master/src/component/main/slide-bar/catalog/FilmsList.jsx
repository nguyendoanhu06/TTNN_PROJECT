import React, { useState, useEffect, useContext, useRef } from 'react';
import SlideBar from '../../SlideBar.jsx';
import SlideContent from '../../SlideContent.jsx';
import { FirebaseContext } from '../../../context/FirebaseProvider.jsx';
import { addDoc, deleteDoc, onSnapshot, query, doc, updateDoc } from 'firebase/firestore';
import { NavLink, useNavigate } from 'react-router-dom';
import { RiMenuAddFill } from "react-icons/ri";
import { IoSearchSharp } from "react-icons/io5";
import { FaSort } from "react-icons/fa";
import SlideBarFilter from './film-list/SlideBarFilter.jsx';



export default function ProductsList() {
  let navigate = useNavigate()
  //----- Call data -----//
  let [data, setData] = useState([])
  let [preData, setPreData] = useState([])
  const { messCollect } = useContext(FirebaseContext)
  useEffect(() => {
    const q = query(messCollect);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const temp = [];
      querySnapshot.forEach((doc) => {
        temp.push({ ...doc.data(), id: doc.id });
      });
      setData(temp)
      setPreData(temp)
    });
  }, [])

  //-----Slide bar filter open-----//
  const [filterOpen, setFilterOpen] = useState(false);
  const slideBarFilter = () => {
    setFilterOpen(!filterOpen);
  };

  //-----Handle click inside home-content-----//
  const handleClickInsideContent = (event) => {
    const menuIconClicked = event.target.classList.contains('films-menu') || event.target.closest('.films-menu');
    if (!menuIconClicked) {
      setFilterOpen(false);
    }
  };

  //----- Set up btn Close && Dark theme -----//
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

  //----- Focus-search -----//
  const [isActive, setIsActive] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const ref = useRef();

  const search = () => {
    ref.current.focus();
    setIsActive(true);
  };

  const afterSearch = () => {
    setIsActive(false);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    searchFilm(e.target.value);
  };
  // ----- Search -----//
  const searchFilm = (search) => {
    if (search.trim() !== '') {
      const filteredData = preData.filter((film) =>
        film.nameFilm.toLowerCase().includes(search.toLowerCase())
      );
      setData(filteredData);
    }
    else {
      setData(preData);
    }
  };

  //----- Sort name film -----//
  const [sortedByName, setSortedByName] = useState(false);

  const toggleSortName = () => {
    if (data.length > 0) {
      let newData;
      //----- Nếu đã sắp xếp theo tên phim thì lấy dữ liệu ban đầu -----//
      if (sortedByName) {
        newData = [...preData];
      }
      else {
        //----- Ngược lại -----//
        newData = [...data].sort((a, b) => {
          return a.nameFilm.localeCompare(b.nameFilm);
        });
      }
      setData(newData);
      setSortedByName(!sortedByName);
    }
  };

  //----- Sort price -----//
  const [sortedByPrice, setSortedByPrice] = useState(false);

  const toggleSortPrice = () => {
    if (data.length > 0) {
      let newData;
      if (sortedByPrice) {
        newData = [...preData];
      } else {
        newData = [...data].sort((a, b) => {
          return (
            a.movieShowSchedule[0].price -
            a.movieShowSchedule[0].price * (a.movieShowSchedule[0].discount / 100) -
            (b.movieShowSchedule[0].price - b.movieShowSchedule[0].price * (b.movieShowSchedule[0].discount / 100))
          );
        });
      }
      setData(newData);
      setSortedByPrice(!sortedByPrice);
    }
  };

  const deleteFilm = async (id) => {
    await deleteDoc(doc(messCollect, id));
  }


  //----- Render film -----//
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const renderContent = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    return currentItems.map((film, index) => {
      return <tr key={film.id} className='table-film'>
        <td className='table-index'>
          <span>{index + 1 + (currentPage - 1) * itemsPerPage}</span>
        </td>
        <td className='table-tr td'>
          <img src={film.img} alt="film" />
          <div>
            <h5 onClick={() => { navigate(`/detail/${film.id}`) }}>{film.nameFilm}</h5>
            <p>ID:{film.id}</p>
          </div>
        </td>
        <td className='table-tr td'>
        {film.infoFilm && film.infoFilm.catagory && <h5>{film.infoFilm.catagory.join(' / ')}</h5>}
        </td>
        <td className='table-tr td'>{film.movieShowSchedule.length}</td>
        <td className='table-tr td'>{Number(film.movieShowSchedule[0]?.price - (film.movieShowSchedule[0]?.price * film.movieShowSchedule[0]?.discount / 100)).toLocaleString()} VND</td>
        <td className='table-tr td'>
          <div className="dropdown">
            <button className="btn btn-sa-muted btn-sm" type="button" id="product-context-menu-11" data-bs-toggle="dropdown" aria-expanded="true" aria-label="More" fdprocessedid="gqiqa5m"><svg xmlns="http://www.w3.org/2000/svg" width={3} height={13} fill="currentColor"><path d="M1.5,8C0.7,8,0,7.3,0,6.5S0.7,5,1.5,5S3,5.7,3,6.5S2.3,8,1.5,8z M1.5,3C0.7,3,0,2.3,0,1.5S0.7,0,1.5,0 S3,0.7,3,1.5S2.3,3,1.5,3z M1.5,10C2.3,10,3,10.7,3,11.5S2.3,13,1.5,13S0,12.3,0,11.5S0.7,10,1.5,10z" /></svg></button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="product-context-menu-5" style={{ position: 'absolute', inset: '0px auto auto 0px', margin: 0, transform: 'translate(-136px, 30px)' }} data-popper-placement="bottom-end">
              <li><NavLink to={`/edit/${film.id}`} className={"dropdown-item"}>Edit</NavLink></li>
              <li><NavLink to={`/room/${film.id}`} className={"dropdown-item"}>Cinema rooms</NavLink></li>
              <li><hr className="dropdown-divider" /></li>
              <li><NavLink className="dropdown-item text-danger" to="#" onClick={() => { deleteFilm(film.id) }}>Delete</NavLink></li>
            </ul>
          </div>
        </td>
      </tr>
    })
  };

  //----- Next and Previous button -----//
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);


  return (
    <div className='home'>
      <div className={filterOpen ? 'slide-bar-filter open' : 'slide-bar-filter'}>
        <SlideBarFilter slideBarFilter={slideBarFilter} />
      </div>
      <div className="home-content" onClick={handleClickInsideContent}>
        <div className={slideBarClosed ? 'slide-bar close' : 'slide-bar'}>
          <SlideBar darkMode={!darkMode} toggleTheme={toggleTheme} />
        </div>
        <div className={darkMode ? 'slide-content sun' : 'slide-content moon'} >
          <SlideContent closeSlideBar={closeSlideBar} />
          <div className="slide-container">
            <div className="films-container">
              <div className="films-header">
                <div className="col">
                  <nav className="mb-2" aria-label="breadcrumb">
                    <ol className="breadcrumb breadcrumb-sa-simple">
                      <li className="breadcrumb-item">
                        <NavLink to={'/dashboard'}>Dashboard</NavLink>
                      </li>
                      <li className="breadcrumb-item active" aria-current="page">
                        Films
                      </li>
                    </ol>
                  </nav>
                  <h1 className="h3 m-0">Films</h1>
                </div>
                <div className="col-auto d-flex">
                  <NavLink to={"/film"} className="btn btn-secondary me-3">
                    New film
                  </NavLink>
                </div>
              </div>
              <div className="films-content">
                <div className="films-row">
                  <div className="films-menu">
                    <RiMenuAddFill fontSize={22} onClick={slideBarFilter} />
                  </div>
                  <div className={`films-search ${isActive ? 'active' : ''}`} onFocus={search} onBlur={afterSearch}>
                    <IoSearchSharp fontSize={22} color='#8D99A2' />
                    <input type="text" placeholder='Search for the truth' ref={ref} onChange={handleSearchChange} />
                  </div>
                </div>
                <div className="films-table">
                  <table>
                    <thead className='table-thead'>
                      <tr>
                        <th className='table-tr'>
                          <span>No.</span>
                        </th>
                        <th className='table-tr th'>
                          <span>Film</span>
                          <FaSort fontSize={15} color='grey' className='svg-sort' onClick={toggleSortName} />
                        </th>
                        <th className='table-tr th'>
                          <span>Category</span>
                        </th>
                        <th className='table-tr th'>
                          <span>Slot</span>
                        </th>
                        <th className='table-tr th'>
                          <span>Price</span>
                          <FaSort fontSize={15} color='grey' className='svg-sort' onClick={toggleSortPrice} />
                        </th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {renderContent()}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="films-footer">
                <div>
                  {currentPage - 1 !== 0 ? <button onClick={prevPage} disabled={currentPage === -1} className='pagination-button'>{currentPage - 1}</button> : ''}
                </div>
                <div>
                  <button disabled={currentPage === 1} className='pagination-button current'>{currentPage}</button>
                </div>
                <div>
                  <button onClick={nextPage} disabled={currentPage === totalPages} className='pagination-button'>{currentPage + 1}</button>
                </div>
                <div>
                  <span>Page: {currentPage} / {totalPages}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}