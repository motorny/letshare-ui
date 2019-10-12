import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getLocale } from "../../cookieManager";

import './index.css';

const COLOR_MAP = {
    '-1': '#ff4d4d',
    '0': '#c5c500',
    '1': '#4c8c4c'
};

const WORD_MAP = {
    '-1': 'Отклонен',
    '0': 'Ожидание',
    '1': 'Принят'
};

const Status = styled.div`
    color: ${props => (COLOR_MAP[props.response])};
    border-color: ${props => (COLOR_MAP[props.response])}
`;

const Choise = styled.div`
    background-color: ${props => (COLOR_MAP[props.response])};
`;

const Request = (props) => {

    const locale = getLocale();
    return (
        <div className="request">
            <div className="request__flex">
                <img src={props.img_url} alt="img" className="request_img"/>
                <div className="request_info">
                    <div className="request_title">
                        {props.name}
                    </div>
                    <div className="request_description">
                        {props.descriptiion}
                    </div>
                    <div className="request_requester">
                        <span>Запросил: </span>
                        <span>{props.requester}</span>
                        <span> </span>
                        <span>({props.location})</span>
                        <a href="/" className="request__a">
                            Связаться
                        </a>
                        {props.response === 0
                            ?
                            <div className="request__date">
                                <span>Время с создания запроса: </span>
                                {new Date(new Date().getTime() - props.creation_time * 1000).toISOString().substr(14, 5)}
                            </div>
                            :
                            <div/>
                        }

                    </div>
                </div>
            </div>
            {(props.isInput === false || props.response !== 0)
                ?
                <Status response={String(props.response)} className="request__status_wrap">
                    <span className="request__status">
                        {WORD_MAP[String(props.response)]}
                    </span>
                </Status>
                :
                <div className="request__choise_wrap">
                    <Choise className="request__button_wrap" response={'1'}>
                        <span className="request__button">
                            Принять
                        </span>
                    </Choise>
                    <Choise className="request__button_wrap" response={'-1'}>
                        <span className="request__button">
                            Отклонить
                        </span>
                    </Choise>
                </div>
            }
        </div>
    );
};
Request.propTypes = {
    name: PropTypes.string.isRequired,
    img_url: PropTypes.string.isRequired,
    descriptiion: PropTypes.string.isRequired,
    requester: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    response: PropTypes.number.isRequired,
    creation_time: PropTypes.number.isRequired,
    isInput: PropTypes.bool.isRequired
};

export default Request;
