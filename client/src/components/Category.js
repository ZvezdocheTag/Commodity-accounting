import React from 'react';

const Item = (props) => (<li className="category-list__item category-item">
    <a className="category-item__delete">x</a>
    <a className="category-item__link" href="">{`Category ${props.title}`}</a>
</li>)

export const List = () => {
    const arr = [1, 2];
    return (
        <ul className="category-list">
            {
                arr.map((item,i) => <Item title={item} key={i}/>)
            }
        </ul>
    )
}