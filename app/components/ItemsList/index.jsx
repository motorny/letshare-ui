import React from 'react';
import PropTypes from 'prop-types';
import {Container, Row} from "reactstrap";

import { getLocale } from "../../cookieManager";
import Item from "../Item";

import './index.css';

const ItemsList = (props) => {
    const locale = getLocale();
    return (
        <Container>
            <p className="item-list__title">
                Каталог вещей
            </p>
            {props.items_info.items.map((el, index) => (
                <div key={index}>
                    <hr/>
                    <Item name={el.item.name} img_url={el.item.img_url} descriptiion={el.item.description}
                          owner={el.user.name} location={el.user.location} creation_time={el.item.creation_time}
                          response={el.item.response}/>
                </div>
            ))}
            <hr/>
        </Container>
    );
};
ItemsList.propTypes = {
    items_info: PropTypes.object.isRequired
};

export default ItemsList;
