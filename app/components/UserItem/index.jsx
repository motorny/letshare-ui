import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";

import { getLocale } from "../../cookieManager";

import './index.css';

const BUSY_MAP = {
    '1': 'Занят',
    '0': 'Свободен'
};

const UserItem = (props) => {
    const locale = getLocale();
    let tenant_info;
    if (props.status === 0) {
        tenant_info = <div/>
    }
    else {
        tenant_info =
            <div className="user-item__text">
                <span>Кем: </span>
                {props.tenant_name}
                <span> </span>
                ({props.tenant_location})
            </div>
    }
    const itemInfo = {
        "id": props.id,
        "image": props.img_url,
        "name": props.name,
        "description": props.descriptiion
    };
    return (
        <div className="user-item">
            <div className="user-item__flex">
                <img src={props.img_url} alt="img" className="user-item__img"/>
                <div className="user-item__info">
                    <div className="user-item__title">
                        {props.name}
                    </div>
                    <div className="user-item__description">
                        {props.descriptiion}
                    </div >
                    <div className="user-item__status user-item__text">
                        <span>Статус: </span>
                        {BUSY_MAP[props.status === 0 ? '0' : '1']}
                    </div>
                    {tenant_info}
                    <div className="user-item__date">
                        <span>Предмет добавлен: </span>
                        {new Date(props.creation_time * 1000).toLocaleDateString("ru-RU")}
                    </div>
                </div>
            </div>
            <div className="user-item__change">
                <div className="user-item__button_wrap user-item__button_wrap_edit" onClick={evt => props.toggle(true, itemInfo)}>
                        <span className="user-item__button">
                            Редактировать
                        </span>
                </div>
                <div className="user-item__button_wrap user-item__button_wrap_delete" onClick={evt => props.delete(itemInfo)}>
                        <span className="user-item__button">
                            Удалить
                        </span>
                </div>
            </div>
        </div>
    );
};
UserItem.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    img_url: PropTypes.string.isRequired,
    descriptiion: PropTypes.string.isRequired,
    creation_time: PropTypes.number.isRequired,
    status: PropTypes.number.isRequired,
    tenant_name: PropTypes.string,
    tenant_location: PropTypes.string,
    toggle: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired
};

export default UserItem;
