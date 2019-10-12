import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import AnimatedNumber from 'react-animated-number';
import PropTypes from 'prop-types';

import { getLocale } from "../../cookieManager";

import './index.css';

class HomeNumbers extends React.Component {
    constructor(props) {
        super(props);
        this.listenScrollEvent = this.listenScrollEvent.bind(this);
        this.toggle = [];
        this.state = {
            isPrinted: false
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.listenScrollEvent);
    };

    componentWillUnmount() {
        window.removeEventListener('scroll', this.listenScrollEvent, false);
    };

    listenScrollEvent = () => {
        if (this.toggle[0].getBoundingClientRect().top - window.innerHeight < 0) {
            if (!this.state.isPrinted) {
                this.setState({
                    isPrinted: true
                });
            }
        } else if (this.state.isPrinted) {
            this.setState({
                isPrinted: false
            });
        }
    };

    render() {
        const locale = getLocale();
        return (
          <Container fluid>
              <Row noGutters className="home-numbers__top">
                  <Col>
                      <p className="home-numbers__title">
                          {this.props.content.title[locale]}
                      </p>
                      <p className="home-numbers__description">
                          {this.props.content.description[locale]}
                      </p>
                  </Col>
              </Row>
              <Row>
                  {this.props.statistics.map((el, index) => {
                      const colClass = "home-numbers__number_col home-numbers__number_col_" + index.toString();
                      return (
                        <Col xs="12" md="6" className={colClass} key={index}>
                            <div className="home-numbers__number" ref={div => this.toggle[index] = div}>
                                <AnimatedNumber
                                  component="span" value={el.amount}
                                  duration={1200}
                                  stepPrecision={0}
                                  key={this.state.isPrinted}
                                  className="home-numbers__number_title"/>
                                <div className="home-numbers__number_text">{el[locale]}</div>
                            </div>
                        </Col>
                      )
                  })}
              </Row>
          </Container>
        );
    }
}
HomeNumbers.propTypes = {
    content: PropTypes.object,
    statistics: PropTypes.array
};

export default HomeNumbers;