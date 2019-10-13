import React, { Component } from 'react';

import './index.css';
import { HashLink as Link } from 'react-router-hash-link';
import { withRouter } from 'react-router-dom';

class SearchField extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);

        this.filterArray = this.filterArray.bind(this);
        this.state = {
            query: '',
            data: [],
            searchString: [],
        };
    }

    handleInputChange(event) {
        this.setState({
            query: event.target.value,
        }, () => {
            this.filterArray();
        });
    };

    getData() {
        // fetch(`http://localhost:4000/restaurants`)
        //     .then(response => response.json())
        //     .then(responseData => {
        //         // console.log(responseData)
        //         this.setState({
        //             data: responseData,
        //             searchString: responseData
        //         })
        //     })
    }

    filterArray() {
        const searchString = this.state.query;
        let responseData = this.state.data;

        if (searchString.length > 0) {
            // console.log(responseData[i].name);
            responseData = responseData.filter(searchString);
            this.setState({
                responseData,
            })
        }
    };

    componentWillMount() {
        this.getData();
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.history.push(`/items?search=${event.target.search.value}`);
    }

    render() {
        return (
            <div className="search-field">
                <form onSubmit={this.onSubmit}>
                    <div className="search-field__input_wrap">
                        <input
                            className="search-field__input"
                            name="search"
                            type="text"
                            placeholder="Введите запрос..."/>

                            <button type="submit" className="search-field__button">
                                <i className="fas fa-search search-field__icon"/>
                            </button>

                    </div>
                    {/* onChange={this.handleInputChange}/> */}
                </form>
                {/* <div> */}
                {/*    { */}
                {/*        this.state.responseData.map((i) => */}
                {/*            <p>{i.name}</p> */}
                {/*        ) */}
                {/*    } */}
                {/* </div> */}
            </div>
        )
    }
}

export default withRouter(SearchField);
