import React from 'react';
import { Parallax } from "react-parallax";
import AnchorLink from 'react-anchor-link-smooth-scroll';
import PropTypes from 'prop-types';

import { getLocale } from "../../cookieManager";
import { serverUrl } from '../../utils/constants';

import './index.css';

const HomeMain = (props) => {
  const locale = getLocale();
  return (
    <Parallax bgImage={serverUrl + props.img_url} strength={200} className="animated fadeIn">
      <div style={{ height: '120vh' }}>
        <div className="home-main__text_wrap home-main__text">
          <div className="home-main__text_title animated fadeInDownBig">
            {props.content.title[locale]}
          </div>
          <div className="home-main__text_common animated fadeInUpBig">
            {props.mainwords.map(el => (
              <span key={el[locale]} className="home-main__text_strings">
                {el[locale]}<span> </span>
              </span>
            ))}
          </div>
          <AnchorLink href="#solutions" offset={() => 90}>
            <div className="home-main__button_wrap animated fadeInUpBig">
              <span className="home-main__button">
                {props.content.button[locale]}
              </span>
            </div>
          </AnchorLink>
        </div>
      </div>
    </Parallax>
  );
};
HomeMain.propTypes = {
    content: PropTypes.object,
    mainwords: PropTypes.array,
    img_url: PropTypes.string
};

export default HomeMain;
