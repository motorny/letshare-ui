import React from 'react';
import { getLocale } from '../../cookieManager';

import './index.css';

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
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
        return (
          <div className="footer__background-color">

          </div>
        );
    }
}

export default Footer;
