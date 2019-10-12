/* eslint-disable react/prefer-stateless-function,react/no-children-prop */
import React from 'react';
import Policy from '../../components/Policy';
import {getLocale} from "../../cookieManager";

import cookie_banner from '../../mockups/cookie-banner.json'

import './index.css';

export class CookieBanner extends React.Component {
    constructor(props) {
        super(props);

        const cookie = localStorage.getItem('cookie-agreed');
        this.toggle = this.toggle.bind(this);
        this.state = {
            show: cookie !== '1',
            close: false,
            showPolicy: false,
        };
    }

    toggle() {
        this.setState({
            showPolicy: !this.state.showPolicy,
        });
    };

    render() {
        const locale = getLocale();
        if (this.state.show)
            return (
                <div className={`cookie-banner ${this.state.close ? 'close' : 'open'}`}>
                    <div className="notification">
                        <div className="cookie-banner__text">
                            {cookie_banner.using[locale]}
                            <span className="cookie-banner__link" onClick={this.toggle}>
                                {cookie_banner.privacy[locale]}
                            </span>
                            {cookie_banner.using_2[locale]}
                        </div>
                    </div>
                    <div className="agree">
                        <button
                            onClick={() => {
                                localStorage.setItem('cookie-agreed', '1');
                                this.setState({show: true, close: true});
                            }}
                            children={
                                <h3 className="cookie-banner__agree_text">
                                    {cookie_banner.agree[locale]}
                                </h3>
                            }
                            className="cookie-banner__button"
                        />
                    </div>
                    {this.state.showPolicy ?
                        <Policy toggle={this.toggle.bind(this)}/>
                        : <div/>
                    }
                </div>
            );
        return <div/>;
    }
}

export default CookieBanner;
