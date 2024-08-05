import React, { useState, useEffect, useContext } from 'react';
import SlideBar from '../../SlideBar.jsx';
import SlideContent from '../../SlideContent.jsx';
import { FirebaseContext } from '../../../context/FirebaseProvider.jsx';
import { addDoc, deleteDoc, onSnapshot, query, doc, updateDoc } from 'firebase/firestore';

export default function Category() {
  // ----- Call data -----//
  let [data, setData] = useState([])
  const { messCollect } = useContext(FirebaseContext)
  useEffect(() => {
    const q = query(messCollect);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const temp = [];
      querySnapshot.forEach((doc) => {
        temp.push({ ...doc.data(), id: doc.id });
      });
      setData(temp)
    });
  }, [])


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
  console.log(data)

  return (
    <div className='home'>
      <div className={slideBarClosed ? 'slide-bar close' : 'slide-bar'}>
        <SlideBar darkMode={!darkMode} toggleTheme={toggleTheme} />
      </div>
      <div className={darkMode ? 'slide-content sun' : 'slide-content moon'} >
        <SlideContent closeSlideBar={closeSlideBar} />
        <div className="slide-container">
          Category
        </div>
      </div>
    </div>
  )
}
