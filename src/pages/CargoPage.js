import React, { useEffect, useState } from "react";
import UserContacts from "../components/UserContacts";

import { RiChat4Fill, RiFlag2Fill } from "react-icons/ri";
import {
  IoCalendarOutline,
  IoChevronBackSharp,
  IoChevronForwardSharp,
  IoCube,
  IoEllipsisVertical,
  IoLocationSharp,
  IoTimeOutline,
  IoWarning,
} from "react-icons/io5";
import { IconContext } from "react-icons";

import useAxiosPrivate from "../hooks/axiosPrivate";
import { useSelector, useDispatch } from "react-redux";
import { setAlert } from "../store/actions/alert";
import { Swiper } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { useParams } from "react-router-dom";
import { getCargo, reportCargo } from "../API/cargo";
import { getDateUI, getTimeUI } from "../helpers/formatingDate";
import { getRoute, icons } from "../helpers/cargo";
import { createResponse } from "../API/response";
import Loader from "../components/Loader";
import { Alert } from "react-bootstrap";
import CustomModal from "../components/utilities/CustomModal";

import { optionsLoadingPeriodType } from "../components/utilities/data";

SwiperCore.use([Navigation, Pagination]);

export default function CargoPage() {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state?.currentUser?.data?.user);
  const { id: cargoId } = useParams();

  const [cargo, setCargo] = useState({
    isLoading: false,
    error: null,
    item: null,
  });

  const [showModalReport, setShowModalReport] = useState(false);

  const [alertResponse, setAlertResponse] = useState({
    alertShow: false,
    complete: null,
  });

  const [alertReport, setAlertReport] = useState({
    alertShow: false,
    complete: null,
  });

  const response = () => {
    currentUser &&
      createResponse(axiosPrivate, {
        cargoId: parseInt(cargoId),
        userId: currentUser?.id,
      })
        .then(() => dispatch(setAlert("success", "Отклик успешно отправлен")))
        .catch(() =>
          dispatch(setAlert("danger", "Не удалось отправить отклик"))
        );
  };

  useEffect(() => {
    alertReport.alertShow &&
      setTimeout(() => {
        setShowModalReport(false);
        setAlertReport((prevState) => ({
          ...prevState,
          alertShow: false,
        }));
      }, 1500);
  }, [alertReport.alertShow]);

  const [dataReport, setDataReport] = useState({
    fromId: currentUser?.id,
    cargoId: cargoId,
  });

  useEffect(() => {
    alertResponse.alertShow &&
      setTimeout(
        () =>
          setAlertResponse((prevState) => ({
            ...prevState,
            alertShow: false,
          })),
        1300
      );
  }, [alertResponse.alertShow]);

  useEffect(() => {
    getCargo(cargoId)
      .then((result) =>
        setCargo((prev) => ({ ...prev, isLoading: true, item: result }))
      )
      .catch((error) =>
        setCargo((prev) => ({ ...prev, isLoading: true, error }))
      );
  }, [cargoId]);

  const getPeriodType = (periodType) => {
    if (periodType === null) return null;

    const result = optionsLoadingPeriodType.reduce((accumulator, current) => {
      if (current.value === periodType.toString()) return current.label;
      return accumulator;
    }, null);

    return result;
  };

  console.log(cargo.item);

  return (
    <main className="bg-white">
      {cargo.isLoading ? (
        <section id="sec-8" className="container py-4 py-sm-5">
          <div className="d-flex align-items-center justify-content-between mb-4 mb-sm-5">
            <h1 className="mb-0">
              Груз № {cargo?.item?.id} {getRoute(cargo?.item, true)}
            </h1>
            <div className="dropdown d-block d-md-none">
              <button
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                className="dropdown-toggle"
              >
                <IconContext.Provider value={{ className: "green icon-20" }}>
                  <IoEllipsisVertical />
                </IconContext.Provider>
              </button>
              <div className="dropdown-menu">
                <button
                  type="button"
                  className="gray-3 d-flex align-items-center"
                  onClick={() => setShowModalReport(true)}
                >
                  <IconContext.Provider value={{ className: "gray-4 icon" }}>
                    <IoWarning />
                  </IconContext.Provider>
                  <span className="ms-2">Подать жалобу</span>
                </button>
              </div>
            </div>
          </div>
          <div className="row flex-md-row-reverse">
            <div className="col-md-5 col-xl-4 col-xxl-3 d-flex flex-column">
              <div className="order-3 order-md-1 mb-4 mb-xxl-5">
                <h5 className="mb-2 mb-lg-3">Маршрут</h5>
                <div className="box p-3">
                  <div className="mb-2">{getRoute(cargo?.item)}</div>
                </div>
              </div>
              <div className="order-2 mb-4 mb-lg-5">
                <h5 className="mb-2 mb-lg-3">Оплата</h5>
                <div className="box p-3">
                  <div className="d-flex justify-content-between fs-13 fw-5 mb-3">
                    <div>{cargo?.item?.vatPrice} ₽ с НДС</div>
                    <div>(80 ₽/км)</div>
                  </div>
                  <div className="d-flex justify-content-between fs-13 fw-5 mb-3">
                    <div>{cargo?.item?.noVatPrice} ₽ без НДС</div>
                    <div>(78 ₽/км)</div>
                  </div>
                  <div className="d-flex justify-content-between fs-13 fw-5">
                    <div>
                      {cargo?.item?.bargainType ? "Есть торг" : "Без торга"}
                    </div>
                  </div>
                </div>
              </div>
              <UserContacts
                className="order-1 order-md-3 mb-4 mb-md-0"
                img={cargo?.item?.user?.avatar}
                title={cargo?.item?.user?.fullName}
                company={cargo?.item?.user?.companyName}
                subject={cargo?.item?.user?.subject}
                contacts={[{ phone: cargo?.item?.user?.phone }]}
                id={cargo?.item?.user?.id}
              />
              <button
                type="button"
                className="d-none d-md-block order-4 gray-3 mx-auto mt-3 fs-11 d-flex align-items-center"
                onClick={() => setShowModalReport(true)}
              >
                <IconContext.Provider value={{ className: "gray-4 icon" }}>
                  <IoWarning />
                </IconContext.Provider>
                <span className="ms-2">Подать жалобу</span>
              </button>
            </div>
            <div className="col-md-7 col-xl-8 col-xxl-9">
              {cargo?.item?.loadings?.length &&
                cargo.item.loadings.map((item, index) => (
                  <div key={item.id}>
                    <div className="d-flex mb-2 mb-lg-3">
                      <IconContext.Provider
                        value={{ className: "green icon me-2 me-sm-3" }}
                      >
                        <RiFlag2Fill />
                      </IconContext.Provider>
                      <h5 className="mb-0">Загрузка {index + 1}</h5>
                    </div>
                    <div className="box p-3 p-lg-4 mb-4 mb-lg-5">
                      <div className="d-flex flex-wrap align-items-center">
                        <IconContext.Provider
                          value={{ className: "gray-4 icon me-2 me-sm-3" }}
                        >
                          <IoCalendarOutline />
                        </IconContext.Provider>
                        <span className="fw-5 me-2">Дата: </span>
                        <time>
                          {item.date || item.periodType !== null
                            ? getDateUI(
                                item.date,
                                getPeriodType(item.periodType)
                              )
                            : "не указано"}
                        </time>
                      </div>
                      <div className="d-flex flex-wrap align-items-center mt-2 mt-sm-3">
                        <IconContext.Provider
                          value={{ className: "gray-4 icon me-2 me-sm-3" }}
                        >
                          <IoTimeOutline />
                        </IconContext.Provider>
                        <span className="fw-5 me-2">Время загрузки: </span>
                        {item.isAllDay ? (
                          <time>Круглосуточно</time>
                        ) : (
                          <time>
                            {item.timeFrom && item.timeTo
                              ? `${getTimeUI(item.timeFrom)} - ${getTimeUI(
                                  item.timeTo
                                )}`
                              : "не указано"}
                          </time>
                        )}
                      </div>
                      <div className="d-flex flex-wrap align-items-center mt-2 mt-sm-3">
                        <IconContext.Provider
                          value={{ className: "gray-4 icon me-2 me-sm-3" }}
                        >
                          <IoLocationSharp />
                        </IconContext.Provider>
                        <span className="fw-5 me-2">Место загрузки: </span>
                        <span>
                          {item.town && item.address
                            ? `г. ${item.town}, ${item.address}`
                            : item.town
                            ? `г. ${item.town}`
                            : item.address
                            ? item.address
                            : "не указано"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

              {cargo?.item?.unloadings?.length &&
                cargo.item.unloadings.map((item, index) => (
                  <div key={item.id}>
                    <div className="d-flex mb-2 mb-lg-3">
                      <IconContext.Provider
                        value={{ className: "green icon me-2 me-sm-3" }}
                      >
                        <RiFlag2Fill />
                      </IconContext.Provider>
                      <h5 className="mb-0">Разгрузка {index + 1}</h5>
                    </div>
                    <div className="box p-3 p-lg-4 mb-4 mb-lg-5">
                      <div className="d-flex flex-wrap align-items-center">
                        <IconContext.Provider
                          value={{ className: "gray-4 icon me-2 me-sm-3" }}
                        >
                          <IoCalendarOutline />
                        </IconContext.Provider>
                        <span className="fw-5 me-2">Дата: </span>
                        <time>
                          {item.dateFrom && item.dateTo
                            ? `${getDateUI(item.dateFrom)} - ${getDateUI(
                                item.dateTo
                              )}`
                            : "не указано"}
                        </time>
                      </div>
                      <div className="d-flex flex-wrap align-items-center mt-2 mt-sm-3">
                        <IconContext.Provider
                          value={{ className: "gray-4 icon me-2 me-sm-3" }}
                        >
                          <IoTimeOutline />
                        </IconContext.Provider>
                        <span className="fw-5 me-2">Время разгрузки: </span>
                        {item.isAllDay ? (
                          <time>Круглосуточно</time>
                        ) : (
                          <time>
                            {item.timeFrom && item.timeTo
                              ? `${getTimeUI(item.timeFrom)} - ${getTimeUI(
                                  item.timeTo
                                )}`
                              : "не указано"}
                          </time>
                        )}
                      </div>
                      <div className="d-flex flex-wrap align-items-center mt-2 mt-sm-3">
                        <IconContext.Provider
                          value={{ className: "gray-4 icon me-2 me-sm-3" }}
                        >
                          <IoLocationSharp />
                        </IconContext.Provider>
                        <span className="fw-5 me-2">Место разгрузки: </span>
                        <span>
                          {item.town && item.address
                            ? `г. ${item.town}, ${item.address}`
                            : item.town
                            ? `г. ${item.town}`
                            : item.address
                            ? item.address
                            : "не указано"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

              {cargo?.item?.items?.length &&
                cargo.item.items.map((item, index) => (
                  <div key={item.id}>
                    <div className="d-flex mb-2 mb-lg-3">
                      <IconContext.Provider
                        value={{ className: "green icon me-2 me-sm-3" }}
                      >
                        <IoCube />
                      </IconContext.Provider>
                      <h5 className="mb-0">Груз {index + 1}</h5>
                    </div>
                    <div className="box p-3 px-sm-4 p-lg-4 px-xl-5 mb-4 mb-lg-5">
                      <div className="d-flex flex-wrap align-items-center">
                        <span className="fw-5 me-2">Тип груза: </span>
                        <span>{item?.type?.name || "не указано"}</span>
                      </div>
                      <div className="d-flex flex-wrap align-items-center mt-2 mt-sm-3">
                        <span className="fw-5 me-2">Объем: </span>
                        <span>
                          {item.capacity || "не указано"} м<sup>3</sup>
                        </span>
                      </div>
                      <div className="d-flex flex-wrap align-items-center mt-2 mt-sm-3">
                        <span className="fw-5 me-2">Вес: </span>
                        <span>{item.weight || "не указано"} т</span>
                      </div>
                      <div className="d-flex flex-wrap align-items-center mt-2 mt-sm-3">
                        <span className="fw-5 me-2">Габариты: </span>
                        <span>
                          {item.width && item.height && item.length
                            ? `${item?.width}/${item?.height}/${item?.length} м`
                            : "не указано"}
                        </span>
                      </div>
                      <div className="d-flex flex-wrap align-items-center mt-2 mt-sm-3">
                        <span className="fw-5 me-2">Упаковка: </span>
                        <span>
                          {item.packageType?.name && item.packageCount
                            ? `${item?.packageType?.name} ${item?.packageCount} шт`
                            : "не указано"}
                        </span>
                      </div>
                      <div className="d-flex flex-wrap align-items-center mt-2 mt-sm-3">
                        <span className="fw-5 me-2">Особые пометки: </span>
                        {item.noteType !== null
                          ? icons.map((i) => {
                              return (
                                i.id === item.noteType && (
                                  <div
                                    key={i.id}
                                    className="d-flex align-items-center ms-1"
                                  >
                                    <span>{i.text}</span>
                                    {i.element && (
                                      <div className="icon ms-1">
                                        {i.element}
                                      </div>
                                    )}
                                  </div>
                                )
                              );
                            })
                          : "нет"}
                      </div>
                      <div className="d-flex flex-wrap align-items-center mt-2 mt-sm-3">
                        <span className="fw-5 me-2">Требования к машине: </span>
                        <span>Изотермический, Рефрижератор 0-5°C</span>
                      </div>
                    </div>
                  </div>
                ))}

              <div className="d-flex mb-2 mb-lg-3">
                <IconContext.Provider
                  value={{ className: "green icon me-2 me-sm-3" }}
                >
                  <RiChat4Fill />
                </IconContext.Provider>
                <h5 className="mb-0">Примечание</h5>
              </div>
              <div className="box p-3 px-sm-4 p-lg-4 px-xl-5 mb-4 mb-lg-5">
                <div>{cargo?.note || "Примечания нет"}</div>
              </div>

              <div className="d-flex flex-column flex-xl-row align-items-center align-items-md-stretch justify-content-end">
                <div className="d-flex align-items-center">
                  <button
                    type="button"
                    className="btn btn-1 fs-12"
                    onClick={() => {
                      response();
                    }}
                  >
                    ОТКЛИКНУТЬСЯ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="w-100 d-flex justify-content-center p-5">
          <Loader color="#545454" />
        </div>
      )}

      <section className="sec-3 container mt-5 mb-6">
        <h2>Похожие объявления</h2>
        <div className="position-relative mb-4">
          <Swiper
            className="swiper-4"
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
              },
            }}
            pagination={{
              el: ".swiper-pagination",
              type: "bullets",
              clickable: true,
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
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
        <button
          type="button"
          className="btn btn-2 fs-12 text-uppercase mx-auto"
        >
          Найти груз
        </button>
      </section>
      <CustomModal
        className="modal__routeErrorValid"
        isShow={showModalReport}
        setIsShow={setShowModalReport}
        closeButton={true}
        centered={false}
        size={"lg"}
      >
        <div>
          {alertReport?.complete && (
            <Alert
              show={alertReport?.alertShow}
              variant="success"
              className="end-0 mb-2 p-2"
            >
              <div>
                <span>Жалоба отправлена</span>
              </div>
            </Alert>
          )}
          {alertReport?.complete === false && (
            <Alert
              show={alertReport?.alertShow}
              variant="danger"
              className="end-0 m-0 p-2"
            >
              <div>
                <span>Что-то пошло не так...</span>
              </div>
            </Alert>
          )}
          <form>
            <textarea
              placeholder="Опишите вашу жалобу"
              rows="3"
              className="mb-4"
              onChange={(e) =>
                setDataReport((prevState) => ({
                  ...prevState,
                  report: e.target.value,
                }))
              }
            />
            <div className="row row-cols-2">
              <div>
                <button
                  type="button"
                  className="btn btn-1 w-100"
                  onClick={() => setShowModalReport(false)}
                >
                  Отменить
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-2 w-100"
                  onClick={() => {
                    reportCargo(axiosPrivate, dataReport)
                      .then(() =>
                        setAlertReport({ alertShow: true, complete: true })
                      )
                      .catch(() =>
                        setAlertReport({ alertShow: true, complete: false })
                      );
                  }}
                >
                  Подать жалобу
                </button>
              </div>
            </div>
          </form>
        </div>
      </CustomModal>
    </main>
  );
}
