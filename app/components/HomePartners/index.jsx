import React from 'react';
import Swiper from 'react-id-swiper';

import {getLocale} from "../../cookieManager";

import '../../../node_modules/react-id-swiper/src/styles/css/swiper.css';
import './index.css';

import homePartners from '../../mockups/home-partners.json';

const HomePartners = () => {
    const params = {
        slidesPerView: 'auto',
        spaceBetween: 0,
        slidesPerGroup: 1,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        loop: true,
        loopFillGroupWithBlank: true,
    };
    const locale = getLocale();
    return (
        <div className="home-partners">
            <div className="home-partners__title_font">{homePartners.title[locale]}</div>
            <div className="home-partners__swiper_wrap">
                <Swiper {...params}>
                    {homePartners.slides.map(el => (
                        <div key={el.img_url} className="home-partners__swiper-slide">
                            <div>
                                <img src={el.img_url} alt="partner" className="home-partners__partner_img" />
                            </div>
                        </div>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default HomePartners;
