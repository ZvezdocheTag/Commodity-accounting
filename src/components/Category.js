import React, { Component } from 'react';

const Item = (props) => (<li className="category-list__item">
    <a href="#">x</a>
    <a href="">{`Category ${props.title}`}</a>
</li>)

export const List = () => {
    const arr = [1, 2];

    return (
        <ul className="category-list">
            {
                arr.map(item => <Item title={item}/>)
            }
        </ul>
    )
}