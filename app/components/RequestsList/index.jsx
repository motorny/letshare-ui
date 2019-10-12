import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Container, Row} from "reactstrap";

import { getLocale } from "../../cookieManager";

import Request from "../Request";

import './index.css';

const RequestType = styled.span`
    color: ${props => (props.isActive ? "#2a729c" : "black")}
`;

class RequestsList extends React.Component {

    constructor(props) {
        super(props);

        this.showInput = this.showInput.bind(this);
        this.showOutput = this.showOutput.bind(this);

        this.state = {
            isInput: true,
        }
    };

    showInput() {
        if (!this.state.isInput) {
            this.setState({
                isInput: true,
            })
        }
    }

    showOutput() {
        if (this.state.isInput) {
            this.setState({
                isInput: false,
            })
        }
    }

    render() {
        const locale = getLocale();
        return (
            <Container>
                <p className="requests-list__title">
                    Список запросов
                </p>
                <RequestType isActive={this.state.isInput} className="requests-list__request_type" onClick={this.showInput}>
                    Входящие
                </RequestType>
                <RequestType isActive={!this.state.isInput} className="requests-list__request_type" onClick={this.showOutput}>
                    Исходящие
                </RequestType>
                {this.props.requests_info.requests.map(el => (
                    <div>
                        <hr/>
                        <Request name={el.item.name} img_url={el.item.img_url} descriptiion={el.item.description}
                                 requester={el.user.name} location={el.user.location} response={el.response}
                                 creation_time={el.creation_time} isInput={this.state.isInput}/>
                    </div>
                ))}
                <hr/>
            </Container>
        );
    }
}
RequestsList.propTypes = {
  requests_info: PropTypes.object.isRequired
};

export default RequestsList;
