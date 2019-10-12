import React from 'react';
import PropTypes from "prop-types";
import { Collapse } from 'reactstrap';

import './index.css';

class ButtonCollapse extends React.PureComponent {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    };

    render() {
        const iconClass = this.state.isOpen
            ? "fas fa-ellipsis-v button-collapse__ellipsis"
            : "fas fa-ellipsis-h button-collapse__ellipsis";
        const buttonClass = this.state.isOpen
            ? "button-collapse__button button-collapse__button_open"
            : "button-collapse__button button-collapse__button_close";
        return (
            <div>
                <button className={buttonClass} onClick={this.toggle}>
                    <i className={iconClass}/>
                    <span className="button-collapse__text">{this.props.title}</span>
                </button>
                <Collapse isOpen={this.state.isOpen} className="button-collapse__collapse button-collapse__text">
                    <br/>
                    {this.props.content}
                    <br/>
                </Collapse>
            </div>
        )
    }
}
ButtonCollapse.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.object.isRequired,
};


export default ButtonCollapse;