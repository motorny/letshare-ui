import React from 'react';
import Swiper from 'react-id-swiper';
import PropTypes from 'prop-types';

import { getLocale } from "../../cookieManager";
import { serverUrl } from '../../utils/constants';

import '../../../node_modules/react-id-swiper/src/styles/css/swiper.css';
import './index.css';

const HomePartners = (props) => {
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
          <div className="home-partners__title_font">{props.content.title[locale]}</div>
          <div className="home-partners__swiper_wrap">
              <Swiper {...params}>
                  {props.partners.map((el, index) => (
                    <div key={index} className="home-partners__swiper-slide">
                        <div>
                            <img
                              src={serverUrl + el.logo_v2_h3.url}
                              alt="partner"
                              className="home-partners__partner_img"/>
                        </div>
                    </div>
                  ))}
              </Swiper>
          </div>
      </div>
    );
};
HomePartners.propTypes = {
    content: PropTypes.object,
    partners: PropTypes.array
};

export default HomePartners;
