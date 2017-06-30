import React from 'react';
import food from './food.svg';

export const Logo = (props) => {
    const handleHome = () => {
        props.eventFilter("all")
    }
    return (
        <div className="logo" onClick={handleHome}>
            <a href="#">HappyShop<img src={food} className="App-logo" alt="logo" /></a>
        </div>
    )
}