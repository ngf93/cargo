import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Card(props) {
    return (
        <div className={"card-mini " + props.className}>
            <div className="title mb-2 mb-sm-3">{props.title}</div>
            <div className="fs-11 mt-1 mt-sm-2"><span className="fw-5">Маршут:</span> <span>{props.route}</span></div>
            <div className="fs-11 mt-1 mt-sm-2"><span className="fw-5">Объем:</span> {props.size} м<sup>2</sup></div>
            <div className="fs-11 mt-1 mt-sm-2"><span className="fw-5">Вес:</span> {props.weight}</div>
            <div className="fs-11 mt-1 mt-sm-2"><span className="fw-5">Особые пометки:</span> {props.notes}</div>
            <NavLink to="/card-page" className="btn btn-1 mt-2 mt-sm-4 mt-xl-5">Перейти</NavLink>
        </div>
    )
}
