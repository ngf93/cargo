import React from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { MdPerson } from 'react-icons/md';
import { IconContext  } from "react-icons";

export const Footer = () => {
    return (
    <>
        <footer>
            
        </footer>
        {/* Modal */}
        <div className="modal fade" id="report" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-body">
                        <button type="button" className="btn-close" data-bs-dismiss="modal">
                            <IoCloseOutline />
                        </button>
                        <form>
                            <textarea placeholder="Опишите вашу жалобу" rows="3" className="mb-4"></textarea>
                            <div className="row row-cols-2">
                                <div>
                                    <button type="button" data-bs-dismiss="modal" className="btn btn-1 w-100">Отменить</button>
                                </div>
                                <div>
                                    <button type="button" className="btn btn-2 w-100">Подать жалобу</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div className="modal fade" id="delete-ad" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-body">
                        <button type="button" className="btn-close" data-bs-dismiss="modal">
                            <IoCloseOutline />
                        </button>
                        <div className='p-lg-5'>
                            <div className='dark-blue fs-12 fw-7 title-font text-center'>Вы действительно хотите удалить объявление?</div>
                            <div className='row row-cols-sm-2 gx-2 gx-lg-4 mt-4 fs-12'>
                                <div><button type='button' className='btn btn-1 w-100 px-4 mb-3 mb-sm-0'>Удалить совсем</button></div>
                                <div><button type='button' className='btn btn-2 w-100 px-4'>Перенести в архив</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="modal fade" id="delete-pattern" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-body">
                        <button type="button" className="btn-close" data-bs-dismiss="modal">
                            <IoCloseOutline />
                        </button>
                        <div className='fs-12 fw-7 title-font text-center dark-blue mb-4'>Вы действительно хотите удалить шаблон?</div>
                        <div className="row row-cols-sm-2 fs-12">
                            <div className='mb-3 mb-sm-0'>
                                <button type="button" data-bs-dismiss="modal" className="btn btn-1 w-100">Отмена</button>
                            </div>
                            <div>
                                <button type="button" className="btn btn-2 w-100">Удалить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="modal fade" id="rename-pattern" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-body">
                        <button type="button" className="btn-close" data-bs-dismiss="modal">
                            <IoCloseOutline />
                        </button>
                        <h3>Переименовать шаблон</h3>
                        <form className='fs-12'>
                            <label className='mb-2'>Название шаблона</label>
                            <input type="text" className='mb-3' placeholder='Название'/>
                            <label className='mb-2'>Примечание</label>
                            <input type="text" className='mb-3' placeholder='Примечание'/>
                            <div className='row row-cols-sm-2 mt-4'>
                                <div className='mb-3 mb-sm-0'>
                                    <button type='button' className='btn btn-1 w-100'>Отмена</button>
                                </div>
                                <div>
                                    <button type='button' className='btn btn-2 w-100'>Сохранить</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        {/* Offcanvas */}
        <div className="offcanvas offcanvas-top" tabIndex="-1" id="warning">
            <div className="d-flex align-items-center justify-content-center">
                <IconContext.Provider value={{className: "icon-20"}}>
                    <MdPerson />
                </IconContext.Provider>
                <div className="fs-12 fw-7 title-font ms-4">Пожалуйста, <a href="/" className="bb-1">войдите</a> в аккаунт или <a href="/" className="bb-1">зарегистрируйтесь</a></div>
            </div>
        </div>
    </>
    )
}
