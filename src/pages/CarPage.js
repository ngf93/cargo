import React from 'react';
import UserContacts from '../components/UserContacts';

import { RiChat4Fill, RiMapPinFill, RiCalendarEventFill } from "react-icons/ri";
import { IoChevronBackSharp, IoChevronForwardSharp, IoRepeat, IoShieldCheckmarkSharp, IoWarning, IoEllipsisVertical } from 'react-icons/io5';
import { MdLocalShipping } from "react-icons/md";
import { IconContext } from "react-icons";

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
SwiperCore.use([Navigation, Pagination]);

export default function CarPage() {
    const verified = true; //иконка напротив заголовка, если машина подтвержденная?

    return (
        <main className="bg-white">
            <section id="sec-8" className="container py-4 py-sm-5">
                <div className="d-flex align-items-center justify-content-between mb-4 mb-sm-5">
                    <h1 className="mb-0">
                        Машина № 356790 Казань — Москва
                        {
                            (verified)&&
                            <IconContext.Provider value={{className: "green ms-2 ms-sm-3", size: '1.1em'}}>
                                <IoShieldCheckmarkSharp />
                            </IconContext.Provider>
                        }
                    </h1>
                    <div className="dropdown d-block d-md-none">
                        <button type="button" data-bs-toggle="dropdown" aria-expanded="false" className="dropdown-toggle">
                            <IconContext.Provider value={{className: "green icon-20"}}>
                                <IoEllipsisVertical />
                            </IconContext.Provider>
                        </button>
                        <div className="dropdown-menu">
                            <button type="button" data-bs-toggle="modal" data-bs-target="#report" className="gray-3 d-flex align-items-center">
                                <IconContext.Provider value={{className: "gray-4 icon"}}>
                                    <IoWarning />
                                </IconContext.Provider>
                                <span className="ms-2">Подать жалобу</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row flex-md-row-reverse">
                    <div className="col-md-5 col-xl-4 col-xxl-3 d-flex flex-column">
                        <div className="order-2 mb-4 mb-lg-5">
                            <h5 className="mb-2 mb-lg-3">Оплата</h5>
                            <div className="box p-3">
                                <div className="d-flex justify-content-between fs-13 fw-5 mb-3">
                                    <div>58 000 ₽ с НДС</div>
                                    <div>(80 ₽/км)</div>
                                </div>
                                <div className="d-flex justify-content-between fs-13 fw-5 mb-3">
                                    <div>50 000 ₽ без НДС</div>
                                    <div>(78 ₽/км)</div>
                                </div>
                                <div className="d-flex justify-content-between fs-13 fw-5">
                                    <div>Возможен торг</div>
                                </div>
                            </div>
                        </div>
                        <UserContacts className="order-1 order-md-3 mb-4 mb-md-0" type="car" img="/img/users/photo.jpg" title="Наумова Эльвира" contacts={[{phone: '+ 7 (969) 152 36 95'}]} />
                        <button type="button" data-bs-toggle="modal" data-bs-target="#report" className="d-none d-md-block order-4 gray-3 mx-auto mt-3 fs-11 d-flex align-items-center">
                            <IconContext.Provider value={{className: "gray-4 icon"}}>
                                <IoWarning />
                            </IconContext.Provider>
                            <span className="ms-2">Подать жалобу</span>
                        </button>
                    </div>
                    <div className="col-md-7 col-xl-8 col-xxl-9">
                        <div className="d-flex mb-2 mb-lg-3">
                            <IconContext.Provider value={{className: "green icon me-2 me-sm-3"}}>
                                <RiMapPinFill />
                            </IconContext.Provider>
                            <h5 className="mb-0">Маршрут</h5>
                        </div>
                        <div className="box p-3 px-sm-4 p-lg-4 px-xl-5 mb-4 mb-lg-5">
                            <div><span className="green fw-5">452 км</span> Казань — Москва</div>
                        </div>

                        <div className="d-flex mb-2 mb-lg-3">
                            <IconContext.Provider value={{className: "green icon me-2 me-sm-3"}}>
                                <RiCalendarEventFill />
                            </IconContext.Provider>
                            <h5 className="mb-0">Дата</h5>
                        </div>
                        <div className="box p-3 px-sm-4 p-lg-4 px-xl-5 mb-4 mb-lg-5">
                            <div><span className="fw-5">Постянно:</span> Ежедневно</div>
                        </div>

                        <div className="d-flex mb-2 mb-lg-3">
                            <IconContext.Provider value={{className: "green icon me-2 me-sm-3"}}>
                                <MdLocalShipping />
                            </IconContext.Provider>
                            <h5 className="mb-0">Информация о машине</h5>
                        </div>
                        <div className="box p-3 px-sm-4 p-lg-4 px-xl-5 mb-4 mb-lg-5">
                            <div className="mb-3"><span className="fw-5">Тип кузова:</span> Рефрижератор, Грузовик</div>
                            <div className="mb-3"><span className="fw-5">Объем:</span> 15 м<sup>3</sup></div>
                            <div className="mb-3"><span className="fw-5">Грузоподъемнсть:</span> 20 т</div>
                            <div><span className="fw-5">Габариты кузова:</span> 13/2,45/2,45 м</div>
                        </div>

                        <div className="d-flex mb-2 mb-lg-3">
                            <IconContext.Provider value={{className: "green icon me-2 me-sm-3"}}>
                                <RiChat4Fill />
                            </IconContext.Provider>
                            <h5 className="mb-0">Примечание от владельца</h5>
                        </div>
                        <div className="box p-3 px-sm-4 p-lg-4 px-xl-5 mb-4 mb-lg-5">
                            <div>10 паллет, режим от +20 до -20 градусов, мед.книжка, сан.обработка</div>
                        </div>

                        <div className="d-flex flex-column flex-xl-row align-items-center align-items-md-stretch justify-content-end">
                            <button type="button" data-bs-toggle="offcanvas" data-bs-target="#warning" className="btn btn-1 fs-12">ОТКЛИКНУТЬСЯ</button>
                            <button type="button" className="btn btn-3 fs-12 px-1 px-sm-3 px-lg-4 mt-3 mt-xl-0 ms-xl-3">
                                <IconContext.Provider value={{className: "icon me-1 me-lg-3"}}>
                                    <IoRepeat />
                                </IconContext.Provider>
                                <span>Поиск грузов в обратном направлении</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="sec-3 container mt-5 mb-6">
                <h2>Похожие объявления</h2>
                <div className="position-relative mb-4">
                <Swiper className="swiper-4"
                    spaceBetween={4}
                    slidesPerView={2}
                    breakpoints={{
                        576: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 8,
                        },
                        992: {
                            slidesPerView: 3,
                            spaceBetween: 16,
                        },
                        1400: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        }
                    }}
                    pagination={{
                        el: '.swiper-pagination',
                        type: 'bullets',
                        clickable: true,
                    }}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                >
                    {/* todo: ATTENTION */}
                    {/*<SwiperSlide>*/}
                    {/*    <Card */}
                    {/*        type="cargo"*/}
                    {/*        className=""*/}
                    {/*        title="Продукты питания" */}
                    {/*        route="Казань-Москва"*/}
                    {/*        size="30"*/}
                    {/*        weight="10 т"*/}
                    {/*        notes="cold"*/}
                    {/*        url="/cargo-page"*/}
                    {/*    />*/}
                    {/*</SwiperSlide>*/}
                    {/*<SwiperSlide>*/}
                    {/*    <Card */}
                    {/*        type="cargo"*/}
                    {/*        className=""*/}
                    {/*        title="Оборудование" */}
                    {/*        route="Казань-Москва"*/}
                    {/*        size="30"*/}
                    {/*        weight="10 т"*/}
                    {/*        notes="fragile"*/}
                    {/*        url="/cargo-page"*/}
                    {/*    />*/}
                    {/*</SwiperSlide>*/}
                    {/*<SwiperSlide>    */}
                    {/*    <Card */}
                    {/*        type="cargo"*/}
                    {/*        className=""*/}
                    {/*        title="Стройматериалы" */}
                    {/*        route="Казань-Москва"*/}
                    {/*        size="30"*/}
                    {/*        weight="10 т"*/}
                    {/*        notes="none"*/}
                    {/*        url="/cargo-page"*/}
                    {/*    />*/}
                    {/*</SwiperSlide>*/}
                    {/*<SwiperSlide>*/}
                    {/*    <Card */}
                    {/*        type="cargo"*/}
                    {/*        className=""*/}
                    {/*        title="Трубы" */}
                    {/*        route="Казань-Москва"*/}
                    {/*        size="30"*/}
                    {/*        weight="10 т"*/}
                    {/*        notes="dimensional"*/}
                    {/*        url="/cargo-page"*/}
                    {/*    />*/}
                    {/*</SwiperSlide>*/}
                    {/*<SwiperSlide>*/}
                    {/*    <Card */}
                    {/*        type="cargo"*/}
                    {/*        className=""*/}
                    {/*        title="Продукты питания" */}
                    {/*        route="Казань-Москва"*/}
                    {/*        size="30"*/}
                    {/*        weight="10 т"*/}
                    {/*        notes="cold"*/}
                    {/*        url="/cargo-page"*/}
                    {/*    />*/}
                    {/*</SwiperSlide>*/}
                    {/*<SwiperSlide>*/}
                    {/*    <Card */}
                    {/*        type="cargo"*/}
                    {/*        className=""*/}
                    {/*        title="Оборудование" */}
                    {/*        route="Казань-Москва"*/}
                    {/*        size="30"*/}
                    {/*        weight="10 т"*/}
                    {/*        notes="fragile"*/}
                    {/*        url="/cargo-page"*/}
                    {/*    />*/}
                    {/*</SwiperSlide>*/}
                    <div className="swiper-button-prev">
                        <IoChevronBackSharp />
                    </div>
                    <div className="swiper-button-next">
                        <IoChevronForwardSharp />
                    </div>
                    <div className="swiper-pagination"></div>
                </Swiper>
                </div>
                <button type="button" className="btn btn-2 fs-12 text-uppercase mx-auto">Найти груз</button>
            </section>
        </main>
    )
}
