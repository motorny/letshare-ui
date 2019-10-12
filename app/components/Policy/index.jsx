import React from 'react';
import {RemoveScroll} from 'react-remove-scroll';

import {getLocale} from "../../cookieManager";

import './index.css';

import policy from '../../mockups/policy.json';

const Policy = (props) => {
    const locale = getLocale();
    return (
        <RemoveScroll>
            <div className="fadeInUp policy">
                <div className="policy__text_wrap">
                    <div className="policy__button_wrap">
                        <button className="policy__button" onClick={props.toggle}>
                            <i className="fas fa-times"/>
                        </button>
                    </div>
                    <div className="policy__title">
                        {policy.title[locale]}
                    </div>

                    <div className="policy__paragraph_title">
                        {policy.agreement.title[locale]}
                    </div>
                    {policy.agreement.paragraphs.map((el, index) => (
                        <div className="policy__paragraph_text" key={index}>
                            {el[locale]}
                        </div>
                    ))}

                    <div className="policy__paragraph_title">
                        {policy.cookiePolicy.title[locale]}
                    </div>
                    <div className="policy__paragraph_text">
                        {policy.cookiePolicy.paragraph_1[locale]}
                    </div>
                    <div className="policy__paragraph_text">
                        {policy.cookiePolicy.paragraph_2.text[locale]}
                        <a href={policy.cookiePolicy.paragraph_2.link} className="policy__paragraph_link">
                            {policy.cookiePolicy.paragraph_2.link}
                        </a>
                    </div>
                    {policy.cookiePolicy.paragraphs.map((el, index) => (
                        <div className="policy__paragraph_text" key={index}>
                            {el[locale]}
                        </div>
                    ))}

                    <div className="policy__paragraph_title">
                        {policy.dataPolicy.title[locale]}
                    </div>
                    {policy.dataPolicy.paragraphs_begin.map((el, index) => (
                        <div className="policy__paragraph_text" key={index}>
                            {el[locale]}
                        </div>
                    ))}
                    {policy.dataPolicy.list.map((el, index) => (
                        <li className="policy__paragraph_text" key={index}>
                            {el[locale]}
                        </li>
                    ))}
                    {policy.dataPolicy.paragraphs_end.map((el, index) => (
                        <div className="policy__paragraph_text" key={index}>
                            {el[locale]}
                        </div>
                    ))}
                    <div className="policy__paragraph_text policy__paragraph_note">
                        {policy.dataPolicy.GDPR[locale]}
                    </div>
                </div>
            </div>
        </RemoveScroll>
    );
};

export default Policy;
