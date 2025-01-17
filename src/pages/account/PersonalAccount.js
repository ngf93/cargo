import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import PersonalAccountRouter from '../../routes/PersonalAccountRouter';

export default function PersonalAccount() {
    const [mob, setMob] = useState(window.matchMedia("(max-width: 991px)").matches);

    useEffect(() => {
        function updateView() {
            if (window.matchMedia("(max-width: 991px)").matches) {
                setMob(true);
            } else {
                setMob(false);
            }
        }

        window.addEventListener('resize', updateView);
        updateView();
        return () => window.removeEventListener('resize', updateView);
    }, []);

    return (
        <main className="account bg-gray py-sm-3 py-md-4 py-lg-5">
            <section id="sec-12" className="container">
                <Link to="/" className='fs-12 fw-5 d-none d-lg-block d-lg-none mb-5'>
                    <span className='green fs-15 me-2'>⟵</span>
                    На главную
                </Link>
                <PersonalAccountRouter isMobile={mob}/>
            </section>
        </main>
    )
}