import React from 'react';
import {IoEllipsisVertical, IoShieldCheckmarkSharp} from "react-icons/io5";
import {NavLink} from "react-router-dom";
import {IconContext} from "react-icons";

const RouteCard = (props) => {
    return (
        <div className={"card-mini " + props.className}>
            <div>
                <div className="title mb-2 mb-sm-3">{props.route}</div>
                {props.carType && (
                    <div className="fs-12 mt-1 mt-sm-2">
                        <span className="fw-7 me-2">{props.carType}</span>
                        <span className="green">
                            {props.isVerified && <IoShieldCheckmarkSharp />}
                        </span>
                    </div>
                )}
                {props.date && (
                    <div className="fs-11 mt-1 mt-sm-2">
                        <span className="fw-5">Дата:</span> {props.date}
                    </div>
                )}
                {props.carrying && (
                    <div className="fs-11 mt-1 mt-sm-2">
                        <span className="fw-5">Грузоподъемность:</span> {props.carrying} т
                    </div>
                )}
                {props.size && (
                    <div className="fs-11 mt-1 mt-sm-2">
                        <span className="fw-5">Свободный объем:</span> {props.size} м
                        <sup>2</sup>
                    </div>
                )}
                {props.dimensions && (
                    <div className="fs-11 mt-1 mt-sm-2">
                        <span className="fw-5">Габариты кузова:</span> {props.dimensions}{" "}
                        м
                    </div>
                )}
            </div>
            <NavLink to={`/route-page/${props.id}`} className="btn btn-1 mt-2 mt-sm-3 mt-xl-4">
                Перейти
            </NavLink>
            {props.profileView && (
                <div className="dropdown dropstart">
                    <button
                        type="button"
                        className="dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <IconContext.Provider
                            value={{
                                className: "icon-20 green",
                                title: "Пожаловаться на пользователя",
                            }}
                        >
                            <IoEllipsisVertical />
                        </IconContext.Provider>
                    </button>
                    {props?.inProfile && <ul className="dropdown-menu py-2">
                        {props.profileView === "archive" && (
                            <li>
                                <button
                                    type="button"
                                    onClick={() => {
                                        props?.callbackForUnArchive && props.callbackForUnArchive(props.id)
                                    }}
                                >
                                    Восстановить
                                </button>
                            </li>
                        )}
                        <li>
                            <NavLink to={`/edit-${props.type}/${props.id}`}>Редактировать</NavLink>
                        </li>
                        <li>
                            <button
                                type="button"
                                onClick={() => {
                                    props?.callbackForDelete && props.callbackForDelete(props.id)
                                }}
                            >
                                Удалить
                            </button>
                        </li>
                    </ul>}
                </div>
            )}
        </div>
    );
};

export default RouteCard;