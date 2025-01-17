import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {IconContext} from "react-icons";
import {IoAddCircleSharp} from "react-icons/io5";
import Pagination from "../../components/Pagination";
import usePagination from "../../hooks/pagination";
import {deleteRoute, getArchiveRoutes, getUserRoutes, unArchivedRoutes} from "../../API/route";
import {useSelector} from "react-redux";
import useAxiosPrivate from "../../hooks/axiosPrivate";
import Loader from "../../components/Loader";
import CustomModal from "../../components/utilities/CustomModal";
import RouteCard from "../../components/RouteCard";
import {useDispatch} from "react-redux/es/exports";
import {setAlert} from "../../store/actions/alert";

const initialPageLimit = 6;

const UserRoutes = () => {

    const dispatch = useDispatch()
    const [tab, setTab] = useState("active");
    const routesPagination = usePagination(initialPageLimit);
    const archiveRoutesPag = usePagination(initialPageLimit)
    const [routes, setRoutes] = useState({
        isLoading: false,
        data: [],
        meta: []
    });
    const [archiveRoutes, setArchiveRoutes] = useState({
        isLoading: false,
        data: [],
        meta: []
    })
    const currentUser = useSelector(state => state?.currentUser?.data?.user)
    const axiosPrivate = useAxiosPrivate()
    const [isShowRouteModal, setIsShowRouteModal] = useState(false)
    const [routeId, setRouteId] = useState(null)

    useEffect(() => {
        (currentUser.roleId !== 2) && getUserRoutes( axiosPrivate, currentUser?.id, routesPagination.currentPage, routesPagination.pageLimit)
            .then(r => setRoutes(prevState => ({
                ...prevState,
                data: r?.data?.body?.data,
                meta: r?.data?.body?.meta,
                isLoading: true
            })))
            .catch(error => console.log(error))
    }, [currentUser,  currentUser?.roleId, routesPagination.pageLimit, routesPagination.currentPage])

    useEffect(() => {
        (currentUser.roleId !== 2) && getArchiveRoutes(archiveRoutesPag.pageLimit, archiveRoutesPag.currentPage, currentUser?.id, axiosPrivate)
            .then(r => setArchiveRoutes(prevState => ({
                ...prevState,
                data: r?.data?.body?.data,
                meta: r?.data?.body?.meta,
                isLoading: true
            })))
            .catch(error => console.log(error))
    }, [currentUser?.roleId, archiveRoutesPag.currentPage, archiveRoutesPag.pageLimit, currentUser])

    const onDeleteRoute = (id) => {
        deleteRoute(id, axiosPrivate).then(() => {
                if (tab === 'active') getUserRoutes(axiosPrivate, currentUser?.id, routesPagination.currentPage, routesPagination.pageLimit)
                    .then(r => setRoutes(prevState => ({
                        ...prevState,
                        data: r?.data?.body?.data,
                        meta: r?.data?.body?.meta,
                        isLoading: true
                    })))
                    .catch(error => console.log(error))
                else {
                    getArchiveRoutes(archiveRoutesPag.pageLimit, archiveRoutesPag.currentPage, currentUser?.id, axiosPrivate)
                        .then(r => setArchiveRoutes(prevState => ({
                            ...prevState,
                            data: r?.data?.body?.data,
                            meta: r?.data?.body?.meta,
                            isLoading: true
                        })))
                        .catch(error => console.log(error))
                }
                dispatch(setAlert('success', 'Успешно удалено'))
            }
        ).catch(() => {
            dispatch(setAlert('danger', 'Произошла ошибка'))
        })
    }

    const [isShowRouteUnArchive, setIsShowRouteUnArchive] = useState(false)

    const unArchiveRoute = () => {
        unArchivedRoutes(axiosPrivate, routeId)
            .then(() => {
                getArchiveRoutes(archiveRoutesPag.pageLimit, archiveRoutesPag.currentPage, currentUser?.id, axiosPrivate)
                    .then(r => setArchiveRoutes(prevState => ({
                        ...prevState,
                        data: r?.data?.body?.data,
                        meta: r?.data?.body?.meta,
                        isLoading: true
                    })))
                    .catch(error => console.log(error))
                getUserRoutes(axiosPrivate, currentUser?.id, routesPagination.currentPage, routesPagination.pageLimit)
                    .then(r => setRoutes(prevState => ({
                        ...prevState,
                        data: r?.data?.body?.data,
                        meta: r?.data?.body?.meta,
                        isLoading: true
                    })))
                    .catch(error => console.log(error))
                dispatch(setAlert('success', 'Успешно убрано из архива'))
            })
            .catch(() => {
                dispatch(setAlert('danger', 'Произошла ошибка'))
            })
    }
    
    useEffect(() => {
        if(routes.data.length === 0) {
            routesPagination.setCurrentPage(1)
            routesPagination.setStartingPage(1)
        }
    }, [routes.data.length])

    useEffect(() => {
        if(archiveRoutes?.data?.length === 0) {
            archiveRoutesPag.setStartingPage(1)
            archiveRoutesPag.setCurrentPage(1)
        }
    }, [archiveRoutes?.data?.length])

    return (
        <div className="box px-0 p-sm-4 p-xl-5">
            <Link
                to="/personal-account"
                className="fs-12 fw-5 d-block d-lg-none mb-3 mb-sm-5"
            >
                <span className="green fs-15 me-2">⟵</span> Назад
            </Link>
            <h1 className="dark-blue text-center d-lg-none">Мои маршруты</h1>
            <div className="d-md-flex flex-row-reverse justify-content-between align-items-center mb-4 mb-xl-5">
                <Link to="/add-route" className="btn btn-2 fs-12 px-4 mb-4 mb-md-0">
                    <IconContext.Provider
                        value={{className: "icon-15 white", title: "Добавить машину"}}
                    >
                        <IoAddCircleSharp/>
                    </IconContext.Provider>
                    <span className="ms-2">Добавить маршрут</span>
                </Link>
                <div className="d-flex align-items-center fs-12 fw-5 title-font">
                    <button
                        type="button"
                        className={tab === "active" ? "active tab-btn" : "tab-btn"}
                        onClick={() => setTab("active")}
                    >
                        {`Активные объявления (${routes?.meta?.total ? routes.meta.total : '0'})`}
                    </button>
                    <button
                        type="button"
                        className={
                            tab === "archive"
                                ? "active tab-btn ms-3 ms-sm-4 ms-xl-5"
                                : "tab-btn ms-3 ms-sm-4 ms-xl-5"
                        }
                        onClick={() => setTab("archive")}
                    >
                        {`Архив (${archiveRoutes?.meta?.total ? archiveRoutes.meta.total : '0'})`}
                    </button>
                </div>
            </div>
            {tab === "active" &&
                <>
                    <div className="row row-cols-2 row-cols-xxl-3 g-1 g-sm-3 g-md-4">
                        {routes.isLoading
                            ? routes?.data?.length
                                ? routes?.data.map((i, index) => (
                                    <div key={index}>
                                        <RouteCard
                                            id={i.id}
                                            type="route"
                                            className=""
                                            title={`${i.fromRoute} - ${i.toRoute}`}
                                            route={`${i.fromRoute} - ${i.toRoute}`}
                                            size={i.car?.capacity}
                                            carrying={i.car?.carrying}
                                            notes="cold"
                                            carType={i.carBodyType?.name}
                                            dimensions={`${i.car?.height}/${i.car?.width}/${i.car?.length}`}
                                            date={i.dateType? "постоянно" : 'единожды'}
                                            url={`/route-page/${i.id}`}
                                            profileView='active'
                                            callbackForDelete={(id) => {
                                                setIsShowRouteModal(true)
                                                setRouteId(id)
                                            }}
                                            callbackForUnArchive={id => {
                                                setIsShowRouteUnArchive(true)
                                                setRouteId(id)
                                            }}
                                            inProfile={true}
                                        />
                                    </div>
                                ))
                                : <h6 className='text-center w-100 p-5'>У вас пока нет маршрутов</h6>
                            : <div className='w-100 d-flex justify-content-center'><Loader color='#545454'/></div>
                        }
                    </div>
                    {(routes?.meta?.total > 0) && (
                        <Pagination
                            className='mt-4'
                            pageLimit={routesPagination.pageLimit}
                            currentPage={routesPagination.currentPage}
                            setCurrentPage={routesPagination.setCurrentPage}
                            pagesDisplayedLimit={3}
                            itemsAmount={routes?.meta?.total || 0}
                            startingPage={routesPagination.startingPage}
                            setStartingPage={routesPagination.setStartingPage}
                        />
                    )}
                </>
            }
            {tab === 'archive' &&
                <>
                    <div className="row row-cols-2 row-cols-xxl-3 g-1 g-sm-3 g-md-4">
                        {archiveRoutes.isLoading
                            ? archiveRoutes?.data?.length
                                ? archiveRoutes?.data.map((i, index) => (
                                    <div key={index}>
                                        <RouteCard
                                            id={i.id}
                                            type="route"
                                            className=""
                                            title={`${i.fromRoute} - ${i.toRoute}`}
                                            route={`${i.fromRoute} - ${i.toRoute}`}
                                            size={i.car?.capacity}
                                            carrying={i.car?.carrying}
                                            notes="cold"
                                            carType={i.carBodyType?.name}
                                            dimensions={`${i.car?.length}/${i.car?.width}/${i.car?.height}`}
                                            date={i.dateType ? 'единожды' : 'постоянно'}
                                            url={`/route-page/${i.id}`}
                                            profileView='archive'
                                            callbackForDelete={(id) => {
                                                setIsShowRouteModal(true)
                                                setRouteId(id)
                                            }}
                                            callbackForUnArchive={id => {
                                                setIsShowRouteUnArchive(true)
                                                setRouteId(id)
                                            }}
                                            inProfile={true}
                                        />
                                    </div>
                                ))
                                : <h6 className='text-center w-100 p-5'>У вас пока нет маршрутов</h6>
                            : <div className='w-100 d-flex justify-content-center'><Loader color='#545454'/></div>
                        }
                    </div>
                    {(archiveRoutes?.meta?.total > 0) && (
                        <Pagination
                            className='mt-4'
                            pageLimit={archiveRoutesPag.pageLimit}
                            currentPage={archiveRoutesPag.currentPage}
                            setCurrentPage={archiveRoutesPag.setCurrentPage}
                            pagesDisplayedLimit={3}
                            itemsAmount={archiveRoutes?.meta?.total || 0}
                            startingPage={archiveRoutesPag.startingPage}
                            setStartingPage={archiveRoutesPag.setStartingPage}
                        />
                    )}
                </>
            }
            <CustomModal
                className='modal__deleteRoute'
                isShow={isShowRouteModal}
                setIsShow={setIsShowRouteModal}
                closeButton={true}
                centered={false}
            >
                <div className="pt-0 pe-5 pb-5 ps-5">
                    <div className="dark-blue fs-12 fw-7 title-font text-center">
                        Вы действительно хотите удалить маршрут?
                    </div>
                    <div className="d-flex justify-content-center mt-4 fs-12">
                        <div>
                            <button
                                type="button"
                                className="btn btn-1 w-100 px-4 mb-3 mb-sm-0"
                                onClick={() => {
                                    onDeleteRoute(routeId)
                                    setIsShowRouteModal(false)
                                }}
                            >
                                Удалить
                            </button>
                        </div>
                    </div>
                </div>
            </CustomModal>
            <CustomModal
                className='modal__unArchive'
                isShow={isShowRouteUnArchive}
                setIsShow={setIsShowRouteUnArchive}
                closeButton={true}
                centered={false}
            >
                <div className="pt-0 pe-5 pb-5 ps-5">
                    <div className="dark-blue fs-12 fw-7 title-font text-center">
                        Убрать маршрут из архива?
                    </div>
                    <div className="d-flex justify-content-evenly mt-4 fs-12">
                        <div>
                            <button
                                type="button"
                                className="btn btn-1 w-100 px-4 mb-3 mb-sm-0"
                                onClick={() => {
                                    setIsShowRouteUnArchive(false)
                                }}
                            >
                                Отмена
                            </button>
                        </div>
                        <div>
                            <button
                                type="button"
                                className="btn btn-1 w-100 px-4 mb-3 mb-sm-0"
                                onClick={() => {
                                    setIsShowRouteUnArchive(false)
                                    unArchiveRoute()
                                }}
                            >
                                Убрать
                            </button>
                        </div>

                    </div>
                </div>
            </CustomModal>
        </div>
    );
};

export default UserRoutes;