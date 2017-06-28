import React from 'react';
import food from './food.svg';

export const Logo = (props) => {
    return (
        <div className="logo">
            HappyShop<img src={food} className="App-logo" alt="logo" />
        </div>
    )
}