import React from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import PropTypes from 'prop-types';

import { getLocale } from "../../cookieManager";

import './index.css';

import response from '../../mockups/response.json';

const Response = (props) => {
    const locale = getLocale();
    const errorCode = props.errorCode;
    return (
      <RemoveScroll>
          <div className="fadeInUp response" onClick={props.toggle}>
              <i className="fas fa-times response__icon"/>
          </div>
          <div className="response__text_wrap">
              <div className="response__title">
                  <div>
                      <div>{response[errorCode].str_1[locale]}</div>
                      <div>{response[errorCode].str_2[locale]}</div>
                  </div>
              </div>
          </div>
      </RemoveScroll>
    );
};
Response.propTypes = {
    errorCode: PropTypes.number.isRequired,
    toggle: PropTypes.func.isRequired
};

export default Response;
