import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Err404() {
    return (
        <div className='err404'>
            <div className="err-content">
                <h1 data-title="404">404</h1>
                <h4>Opps! Page not found</h4>
                <div className="err-btn">
                    <NavLink to={("/")}><button>Home</button></NavLink>
                </div>
            </div>
        </div>
    )
}
