import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import { IoChevronBackSharp, IoChevronForwardSharp } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import SearchInput from "../components/utilities/SearchInput";
import { getAllNews } from "../API/news";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
import { getCargoCount, paginateCargo } from "../API/cargo";
import CargoCard from "../components/CargoCard";
import {
  getGeneralCapacity,
  getGeneralWeight,
  getNotesType,
  getRoute,
} from "../helpers/cargo";
import { getCountRoutes, paginateRoutes } from "../API/route";
import RouteCard from "../components/RouteCard";
import { getCities } from "../API/cities";

SwiperCore.use([Navigation, Pagination]);

export default function Home() {
  const currentUser = useSelector((state) => state.currentUser.data.user);
  const selectedCity = useSelector((state) => state?.selectedCity?.city);
  const [cargoCount, setCargoCount] = useState(null);
  const [countRoute, setCountRoute] = useState(null);
  const [citysForSearch, setCitysForSearch] = useState({
    fromRoute: null,
    toRoute: null,
    date: null,
  });

  const [citys, setCitys] = useState({
    isLoading: false,
    data: [],
  });
  const [cargoSwiperItems, setCargoSwiperItems] = useState({
    isLoading: false,
    error: null,
    items: [],
  });
  const [news, setNews] = useState({
    isLoading: false,
    error: null,
    meta: null,
    items: [],
  });

  useEffect(() => {
    getCountRoutes().then((res) => setCountRoute(res?.data?.body));
    getCargoCount().then((res) => res && setCargoCount(res));
    getAllNews(1, 5, "desc")
      .then((result) =>
        setNews((prev) => ({
          ...prev,
          isLoading: true,
          meta: result?.meta,
          items: result?.data,
        }))
      )
      .catch((error) =>
        setNews((prev) => ({ ...prev, isLoading: true, error }))
      );
  }, []);

  const [routes, setRoutes] = useState({
    isLoading: false,
    data: [],
    meta: [],
  });

  useEffect(() => {
    paginateCargo(selectedCity, 1, 8)
      .then(
        (result) =>
          result &&
          setCargoSwiperItems((prev) => ({
            ...prev,
            isLoading: true,
            items: result?.data,
          }))
      )
      .catch(
        (error) =>
          error &&
          setCargoSwiperItems((prev) => ({ ...prev, isLoading: true, error }))
      );
  }, [selectedCity]);

  useEffect(() => {
    paginateRoutes(selectedCity, 1, 6)
      .then((res) =>
        setRoutes({
          isLoading: true,
          meta: res?.data?.body?.meta,
          data: res?.data?.body?.data,
        })
      )
      .catch((error) => console.log(error));
  }, [selectedCity]);

  useEffect(() => {
    getCities().then(res => setCitys({isLoading: true, data: res?.body}))
  }, []);

  const getDate = (myDate) => {
    const newDate = new Date(myDate);
    return newDate.toLocaleDateString();
  };

  return (
    <main>
      <section id="sec-1" className="py-4 py-sm-5">
        <div className="container">
          <div className="row justify-content-center gx-3">
            <div className="col-lg-8 col-xxl-7">
              <div
                id="slider-1"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-indicators">
                  <button
                    type="button"
                    data-bs-target="#slider-1"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  />
                  <button
                    type="button"
                    data-bs-target="#slider-1"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                  />
                  <button
                    type="button"
                    data-bs-target="#slider-1"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                  />
                </div>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      src="/img/img1.jpg"
                      className="img"
                      alt="слайд 1"
                    />
                    <div className="carousel-item__text">
                      <h2 className="title">
                        Грузоперевозки по России
                      </h2>
                      <p className="description">
                        Биржа грузоперевозок и экосистема
                        сервисов для транспортной логистики в
                        России. Помогаем находить грузы,
                        проверенных перевозчиков и экономить за
                        счёт автоматизации процессов
                      </p>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <img
                      src="/img/img1.jpg"
                      className="img"
                      alt="слайд 2"
                    />
                    <div className="carousel-item__text">
                      <h2 className="title">
                        Грузоперевозки по России
                      </h2>
                      <p className="description">
                        Получите бесплатную
                        консультацию о пользовании системой по
                        телефону +7-927-927-80-23
                      </p>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <img
                      src="/img/img1.jpg"
                      className="img"
                      alt="слайд 3"
                    />
                    <div className="carousel-item__text">
                      <h2 className="title">
                        Грузоперевозки по России
                      </h2>
                      <p className="description">
                        Посетите раздел «форумы»,
                        вступайте в сообщество и находите
                        ответы на все вопросы!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`col-lg-4 col-xxl-3 d-flex flex-lg-column justify-content-between mt-4 mt-lg-0 cargo-count ${
                !cargoCount ? "cargo-count_hasnt" : ""
              }`}
            >
              <div className="box text-center">
                {cargoCount && (
                  <>
                    <div className="title-font dark-blue fw-9 fs-25 mb-2">
                      {cargoCount}
                    </div>
                    <div className="fs-12 mb-3">Грузов доставленно</div>
                  </>
                )}
                {(currentUser.roleId === 2 || currentUser.roleId === 4) && (
                  <Link to="add-cargo" className="btn btn-1 fs-12 w-100 px-2">
                    Добавить груз
                  </Link>
                )}
              </div>
              <div className="box text-center">
                {countRoute && (
                  <>
                    <div className="title-font dark-blue fw-9 fs-25 mb-2">
                      {countRoute}
                    </div>
                    <div className="fs-12 mb-3">Маршрутов на сайте</div>
                  </>
                )}
                {(currentUser.roleId === 3 || currentUser.roleId === 4) && (
                  <Link to="add-route" className="btn btn-1 fs-12 w-100 px-2">
                    Добавить маршрут
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="sec-2" className="mb-5">
        <div className="container py-4 py-sm-5">
          <form>
            <div className="row g-3 g-sm-4 justify-content-center">
              <div className="col-md-4">
                <div className="fs-15 fw-5 mb-1 mb-sm-3">Откуда</div>
                <SearchInput
                  data={citys.data}
                  placeHolder={"Город отправления"}
                  callback={(value) =>
                    setCitysForSearch((prevState) => ({
                      ...prevState,
                      fromRoute: value,
                    }))
                  }
                />
              </div>
              <div className="col-md-4">
                <div className="fs-15 fw-5 mb-1 mb-sm-3">Куда</div>
                <SearchInput
                  data={citys.data}
                  callback={(value) =>
                    setCitysForSearch((prevState) => ({
                      ...prevState,
                      toRoute: value,
                    }))
                  }
                  placeHolder={"Город назначения"}
                />
              </div>
              <div className="col-md-4 col-xl-3 col-xxl-2">
                <div className="fs-15 fw-5 mb-1 mb-sm-3">Дата</div>
                <input
                  type="date"
                  className="fs-15"
                  onChange={(e) => {
                    setCitysForSearch((prevState) => ({
                      ...prevState,
                      dateN: e.target.value,
                      date: getDate(e.target.value),
                    }));
                  }}
                />
              </div>
              <div className="col-12 col-xl-11 col-xxl-10 d-md-flex flex-md-row-reverse justify-content-between fs-12">
                <div className="d-flex">
                  <NavLink
                    to="/search"
                    className="btn btn-1 px-2 px-md-4 px-lg-5"
                    state={{ searchType: "car", ...citysForSearch }}
                  >
                    Найти машину
                  </NavLink>
                  <NavLink
                    to="/search"
                    className="btn btn-1 ms-2 ms-sm-4 px-2 px-md-4 px-lg-5"
                    state={{ searchType: "cargo", ...citysForSearch }}
                  >
                    Найти груз
                  </NavLink>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      {cargoSwiperItems.isLoading ? (
        cargoSwiperItems?.items?.length > 0 ? (
          <section className="sec-3 container mb-6">
            <h2>Грузы в вашем городе</h2>
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
                {cargoSwiperItems.items.map((item) => (
                  <SwiperSlide key={item.id}>
                    <CargoCard
                      id={item.id}
                      title={item?.type?.name}
                      route={getRoute(item, true)}
                      notesType={getNotesType(item?.items)}
                      capacity={getGeneralCapacity(item?.items)}
                      weight={getGeneralWeight(item?.items)}
                      cargo={item}
                    />
                  </SwiperSlide>
                ))}
                <div className="swiper-button-prev">
                  <IoChevronBackSharp />
                </div>
                <div className="swiper-button-next">
                  <IoChevronForwardSharp />
                </div>
                <div className="swiper-pagination"></div>
              </Swiper>
            </div>
            <NavLink
              to="/search"
              className="btn btn-2 fs-12 text-uppercase mx-auto"
            >
              Найти груз
            </NavLink>
          </section>
        ) : null
      ) : (
        <div className="w-100 d-flex justify-content-center p-5">
          <Loader color="#545454" />
        </div>
      )}

      {routes?.isLoading ? (
        routes.data.length > 0 ? (
          <section className="sec-3 container mb-6">
            <h2>Маршруты в Вашем городе</h2>
            <div className="position-relative mb-4">
              <Swiper
                className="swiper-4"
                spaceBetween={4}
                slidesPerView={2}
                freeMode={true}
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
                {routes?.data.map((route, index) => (
                  <SwiperSlide key={index}>
                    <RouteCard
                      id={route.id}
                      title={`${route.fromRoute} - ${route.toRoute}`}
                      route={`${route.fromRoute} - ${route.toRoute}`}
                      size={route.car?.capacity}
                      carrying={route.car?.carrying}
                      carType={route.carBodyType?.name}
                      dimensions={`${route.car?.length}/${route.car?.width}/${route.car?.height}`}
                      date={route.dateType ? "единожды" : "постоянно"}
                      inProfile={false}
                    />
                  </SwiperSlide>
                ))}
                <div className="swiper-button-prev">
                  <IoChevronBackSharp />
                </div>
                <div className="swiper-button-next">
                  <IoChevronForwardSharp />
                </div>
                <div className="swiper-pagination"></div>
              </Swiper>
            </div>
            <NavLink
              to="/search"
              className="btn btn-2 fs-12 text-uppercase mx-auto"
              state={{searchType: 'car'}}
            >
              Найти МАШИНУ
            </NavLink>
          </section>
        ) : null
      ) : (
        <div className="w-100 d-flex justify-content-center p-5">
          <Loader color="#545454" />
        </div>
      )}

      <section id="sec-4" className="mb-6">
        <div className="container h-100 d-flex align-items-center">
          <div className="row flex-md-row-reverse justify-content-end">
            <div className="col-md-6 col-lg-5 col-xl-4 pt-xxl-4">
              <h2 className="text-md-start">О сервисе</h2>
              <p>
                Участники сервиса Эритранс (Eritrans)
                могут организовать весь процесс
                перевозки грузов в рамках нашей системы:
                размещать и искать заказы, проверять
                контрагентов, находить надежных
                исполнителей, обмениваться
                необходимыми документами и находить
                ответы на все вопросы на форуме. Наша
                цель: снизить количество посредников в
                организации перевозок и увеличить
                загрузки транспорта. И следовательно
                доходов перевозчиков и транспортных
                компаний. Как? Эритранс (Eritrans)
                объединяет в одном месте
                грузоперевозчиков и заказчиков,
                предоставляя удобный и надежный сервис
                для работы. Таким образом, онлайн-
                сервис ускоряет организацию перевозки и
                убирает лишние звенья в цепи,
                увеличивая прозрачность процесса и
                рентабельность перевозок.
              </p>
            </div>
            <div className="col-md-6">
              <img src="/img/img1.png" alt="" className="img-fluid" />
            </div>
          </div>
        </div>
      </section>

      <section id="sec-5" className="container mb-6">
        <h2>С нами удобно</h2>
        <div className="d-none d-lg-flex row gx-4 gx-xxl-5">
          <div className="col-1">
            <div className="ribbon ribbon-left">Грузоотправитель</div>
          </div>
          <div className="col-3 d-flex flex-column justify-content-between py-4">
            <div>
              <div className="title title-left">
                <span>1. Размещает груз на площадке</span>
              </div>
              <div className="fs-11">
                Легко разместите объявление о
                грузе с необходимыми параметрами, его
                увидят все остальные участники
              </div>
            </div>
            <div>
              <div className="title title-left">
                <span>3. Готовит заявку</span>
              </div>
              <div className="fs-11">
                Используйте готовые шаблоны
                документов системы Эритранс (Eritrans),
                договоритесь с исполнителем о работе
              </div>
            </div>
            <div>
              <div className="title title-left">
                <span>5. Закрытие сделки
                </span>
              </div>
              <div className="fs-11">
                Ожидайте выполнение работы
                исполнителя
                <br/><br/><br/>
              </div>
            </div>
          </div>
          <div className="col-4">
            <img src="/img/scheme.png" alt="Схема" className="scheme" />
          </div>
          <div className="col-3 d-flex flex-column justify-content-between py-4">
            <div>
              <div className="title title-right">
                <span>2. Берет груз</span>
              </div>
              <div className="fs-11">
                Легко найдите необходимый груз,
                сделайте отклик и получите заказ
                <br/><br/><br/><br/>
              </div>
            </div>
            <div>
              <div className="title title-right">
                <span>4. Одобряет заявку</span>
              </div>
              <div className="fs-11">
                Согласуйте условия и
                подготовьтесь к работе
              </div>
            </div>
            <div className="py-5">
              <div className="title title-right">
                <span>Все готово для перевозки</span>
              </div>
            </div>
          </div>
          <div className="col-1 d-flex justify-content-end">
            <div className="ribbon ribbon-right">Перевозчик</div>
          </div>
        </div>
        <div className="d-block d-lg-none">
          <div className="point">
            <div className="icon">
              <img
                src="/img/icons/icon-1.svg"
                alt="Размещает груз на площадке"
              />
            </div>
            <div className="text">
              <div className="title">
                <span>1. Размещает груз на площадке</span>
              </div>
              <div>
                Легко разместите объявление о
                грузе с необходимыми параметрами, его
                увидят все остальные участники
              </div>
            </div>
            <div className="ribbon ribbon-left">Грузоотправитель</div>
          </div>
          <div className="point">
            <div className="icon">
              <img src="/img/icons/icon-2.svg" alt="Берет груз" />
            </div>
            <div className="text">
              <div className="title">
                <span>2. Берет груз</span>
              </div>
              <div>
                Легко найдите необходимый груз,
                сделайте отклик и получите заказ
              </div>
            </div>
            <div className="ribbon ribbon-left">ПеРЕВОЗЧИК</div>
          </div>
          <div className="point">
            <div className="icon">
              <img src="/img/icons/icon-3.svg" alt="Готовит заявку" />
            </div>
            <div className="text">
              <div className="title">
                <span>3. Готовит заявку</span>
              </div>
              <div>
                Используйте готовые шаблоны
                документов системы Эритранс (Eritrans),
                договоритесь с исполнителем о работе
              </div>
            </div>
            <div className="ribbon ribbon-left">Грузоотправитель</div>
          </div>
          <div className="point">
            <div className="icon">
              <img src="/img/icons/icon-4.svg" alt="Одобряет заявку" />
            </div>
            <div className="text">
              <div className="title">
                <span>4. Одобряет заявку</span>
              </div>
              <div>
                Согласуйте условия и
                подготовьтесь к работе
              </div>
            </div>
            <div className="ribbon ribbon-left">ПеРЕВОЗЧИК</div>
          </div>
          <div className="point">
            <div className="icon">
              <img src="/img/icons/icon-5.svg" alt="Закрытие сделки" />
            </div>
            <div className="text">
              <div className="title">
                <span>5. Закрытие сделки</span>
              </div>
              <div>
                Ожидайте выполнение работы
                исполнителя
              </div>
            </div>
            <div className="ribbon ribbon-left">Грузоотправитель</div>
          </div>
          <div className="point">
            <div className="icon">
              <img src="/img/icons/icon-6.svg" alt="Все готово для перевозки" />
            </div>
            <div className="text">
              <div className="title mb-0">
                <span>Все готово для перевозки</span>
              </div>
            </div>
            <div className="ribbon ribbon-left">ПЕРЕВОЗЧИК</div>
          </div>
        </div>
      </section>

      {news?.items?.length >= 5 && (
        <section id="sec-6" className="container mb-5">
          <h2>Новости ПОРТАЛА</h2>
          {news.isLoading ? (
            news?.items?.length >= 5 ? (
              <div className="news-grid">
                {news.items.map((item) => (
                  <ArticleCard
                    key={item.id}
                    url={`/news/${item.slug}`}
                    title={item.title}
                    img={item.image}
                    text={item.description}
                  />
                ))}
              </div>
            ) : null
          ) : (
            <div className="d-flex justify-content-center">
              <Loader color="#545454" />
            </div>
          )}
          <Link
            to="all-news"
            className="btn btn-2 mx-auto mt-5 fs-12 text-uppercase"
          >
            К другим новостям
          </Link>
        </section>
      )}
    </main>
  );
}
