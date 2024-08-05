import React, { useState, useEffect, useContext } from 'react';
import SlideContent from './SlideContent';
import SlideBar from './SlideBar';
import '../style/style.css';
import { FirebaseContext } from '../context/FirebaseProvider'
import { addDoc, deleteDoc, onSnapshot, query, doc, updateDoc } from 'firebase/firestore';

export default function HomePage(props) {
    // ----- Call data from FireBase-----//
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

    return (
        <div className='home'>
            <div className={slideBarClosed ? 'slide-bar close' : 'slide-bar'}>
                <SlideBar darkMode={!darkMode} toggleTheme={toggleTheme} />
            </div>
            <div className={darkMode ? 'slide-content sun' : 'slide-content moon'} >
                <SlideContent closeSlideBar={closeSlideBar} />
            </div>
            <div className='wlcm'>
                <div className="wlcm-content">
                    <h1 data-title="wlcm">Welcome</h1>
                    <h4>Demo</h4>
                    <div className="log-out">
                        <button onClick={() => {
                            props.logout()
                            props.logout2()
                        }}>Logout</button>
                    </div>
                </div>
            </div>
        </div>
    );
}