import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";

import { getLocale } from "../../cookieManager";

import './index.css';

const COLOR_MAP = {
    '1': '#2a729c',
    '0': '#607480'
};

const CURSOR_MAP = {
    '1': 'pointer',
    '0': 'default'
};

const Button = styled.div`
    background-color: ${props => (COLOR_MAP[props.status])};
    cursor: ${props => (CURSOR_MAP[props.status])}
`;

const Item = (props) => {
    const locale = getLocale();
    return (
        <div className="item">
            <div className="item__flex">
                <img src={props.img_url} alt="img" className="item_img"/>
                <div className="item_info">
                    <div className="item_title">
                        {props.name}
                    </div>
                    <div className="item_description">
                        {props.descriptiion}
                    </div>
                    <div className="item_owner">
                        <span>Владелец: </span>
                        <span>{props.owner}</span>
                        <span> </span>
                        <span>({props.location})</span>
                    </div>
                    <a href="/" className="item__a">
                        Связаться
                    </a>
                    <div className="item__date">
                        <span>Предмет добавлен: </span>
                        {new Date(props.creation_time * 1000).toLocaleDateString("ru-RU")}
                    </div>
                </div>
            </div>
            <div className="item__contact">
                <Button status={props.status === 0 ? '0' : '1'} className="item__button_wrap">
                  <span className="item__button">
                    Взять
                  </span>
                </Button>
            </div>
        </div>
    );
};
Item.propTypes = {
    name: PropTypes.string.isRequired,
    img_url: PropTypes.string.isRequired,
    descriptiion: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    creation_time: PropTypes.number.isRequired,
    status: PropTypes.number.isRequired
};

export default Item;
