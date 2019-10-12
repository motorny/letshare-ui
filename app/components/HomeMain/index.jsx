import React from 'react';
import { Parallax } from "react-parallax";
import AnchorLink from 'react-anchor-link-smooth-scroll';

import {getLocale} from "../../cookieManager";

import './index.css';

import homeMain from '../../mockups/home-main.json';

class HomeMain extends React.PureComponent {
    render() {
        const locale = getLocale();
        return (
            <Parallax bgImage={homeMain.img_src} strength={200} className="animated fadeIn">
                <div style={{height: '120vh'}}>
                    <div className="home-main__text_wrap home-main__text">
                        <div className="home-main__text_title animated fadeInDownBig">
                            {homeMain.title[locale]}
                        </div>
                        <div className="home-main__text_common animated fadeInUpBig">
                            {homeMain.strings.map(el => (
                                <span key={el[locale]} className="home-main__text_strings">
                                    {el[locale]}<span> </span>
                                </span>
                            ))}
                        </div>
                        <AnchorLink href="#solutions">
                            <div className="home-main__button_wrap animated fadeInUpBig">
                                <span className="home-main__button">
                                    {homeMain.button[locale]}
                                </span>
                            </div>
                        </AnchorLink>
                    </div>
                </div>
            </Parallax>
        );
    }
}

export default HomeMain;
