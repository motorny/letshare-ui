import React from 'react';
import {RemoveScroll} from 'react-remove-scroll';

import {getLocale} from "../../cookieManager";

import './index.css';

import response from '../../mockups/response.json';

const Response = (props) => {
    const locale = getLocale();
    return (
        <RemoveScroll>
            <div className="fadeInUp response">
                <div className="response__text_wrap">
                    <div className="response__button_wrap">
                        <button className="response__button" onClick={props.toggle}>
                            <i className="fas fa-times"/>
                        </button>
                    </div>
                    <div className="response__title">
                        {props.responseOk
                        ?
                            <div>
                                <div>{response.title_ok.str_1[locale]}</div>
                                <div>{response.title_ok.str_2[locale]}</div>
                            </div>
                        :
                            <div>
                                <div>{response.title_err.str_1[locale]}</div>
                                <div>{response.title_err.str_2[locale]}</div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </RemoveScroll>
    );
};

export default Response;
