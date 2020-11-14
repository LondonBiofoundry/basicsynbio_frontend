import React from 'react';
import Copyable from './copyable';


export default function Shop(props) {
    return <Copyable droppableId="SHOP" className="shop" items={props.items} />;
}