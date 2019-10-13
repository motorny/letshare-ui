import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Container, Row} from "reactstrap";

import { getLocale } from "../../cookieManager";
import Item from "../Item";
import UserItem from "../UserItem";
import ItemForm from "../ItemForm";

import './index.css';
import requestAuth from "../../utils/requestAuth";
import {RemoveScroll} from "react-remove-scroll";
import {BASE64_RE} from "../../utils/utils";

export class ItemsList extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.addItem = this.addItem.bind(this);
        this.editItem = this.editItem.bind(this);

        this.state = {
            formOpen: false,
            flagEdit: false,
            itemInfo: {}
        }
    }

    toggle(flagEdit, itemInfo) {
        if (flagEdit) {
            this.setState({
                itemInfo: itemInfo,
                formOpen: !this.state.formOpen,
                flagEdit: flagEdit
            })
        }
        else {
            this.setState({
                formOpen: !this.state.formOpen,
                flagEdit: flagEdit
            })
        }
    }

    addItem(evt) {
        evt.preventDefault();
        const formToSubmit = document.getElementById("item-form");
        console.log(formToSubmit);
        const body = {
            "image": formToSubmit.image.value.replace(BASE64_RE, ''),
            "name": formToSubmit.name.value,
            "description": formToSubmit.description.value
        };
        console.log(body);
        requestAuth("http://185.91.53.50:5000/item/add", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(body),
        }) .then(res => {this.props.update(); this.toggle(false)}).catch(err => ({ err }));
    }

    editItem(evt) {
        evt.preventDefault();
        const formToSubmit = document.getElementById("item-form");
        const body = {
            "id": this.state.itemInfo.id,
            "name": formToSubmit.name.value,
            "description": formToSubmit.description.value
        };
        if (BASE64_RE.test(formToSubmit.image.value))
            body.image = formToSubmit.image.value.replace(BASE64_RE, '');
        requestAuth("http://185.91.53.50:5000/item/update", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(body),
        }) .then(res => {this.props.update(); this.toggle(false)}).catch(err => ({ err }));
    }

    deleteItem(itemInfo) {
        const body = {
            "id": this.state.itemInfo.id
        };
        requestAuth("http://185.91.53.50:5000/item/delete", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(body),
        }) .then(res => {this.props.update();}).catch(err => ({ err }));
    }

    render() {
        console.log(this.state.itemInfo);
        const locale = getLocale();
        let form;
        if (this.state.formOpen) {
            if (this.state.flagEdit) {
                form =(
                    <RemoveScroll>
                        <div className="fadeInUp item-list__modal" onClick={evt => this.toggle(false)}>
                            <i className="fas fa-times item-list__icon"/>
                        </div>
                        <div className="item-list__modal_wrap">
                            <ItemForm data={this.state.itemInfo} onSubmit={this.editItem}/>
                        </div>
                    </RemoveScroll>
                )
            }
            else {
                form =(
                    <RemoveScroll>
                        <div className="fadeInUp item-list__modal" onClick={evt => this.toggle(false)}>
                            <i className="fas fa-times item-list__icon"/>
                        </div>
                        <div className="item-list__modal_wrap">
                    <ItemForm required onSubmit={this.addItem}/>
                        </div>
                    </RemoveScroll>
                )
            }
        }
        else {
            form = <div/>
        }

        return (
            <Container>
                <p className="item-list__title">
                    Каталог вещей
                </p>
                {this.props.flag_search
                    ?
                    <div/>
                    :
                    <div onClick={evt => this.toggle(false)} className="user-item__button_wrap user-item__button_wrap_add">
                        <span className="user-item__button">
                            Добавить вещь
                        </span>
                    </div>
                }
                {this.props.items_info.items.map((el, index) => (
                    <div key={index}>
                        <hr/>
                        {this.props.flag_search
                            ?
                            <Item id={el.item.id} name={el.item.name} img_url={el.item.img_url} descriptiion={el.item.description}
                                  owner={el.user.name} location={el.user.location} creation_time={el.item.creation_time}
                                  status={el.item.status}/>
                            :
                            <UserItem id={el.item.id} name={el.item.name} img_url={el.item.img_url} descriptiion={el.item.description}
                                      owner={el.user.name} location={el.user.location}
                                      creation_time={el.item.creation_time}
                                      status={el.item.status}
                                      tenant_name={el.item.status === 0 ? '' : el.item.user.name}
                                      tenant_location={el.item.status === 0 ? '' : el.item.user.location}
                                      toggle={this.toggle} delete={this.deleteItem}/>
                        }

                    </div>
                ))}
                <hr/>
                {form}
            </Container>
        );
    }
}
ItemsList.propTypes = {
    items_info: PropTypes.object.isRequired,
    flag_search: PropTypes.bool.isRequired,
    update: PropTypes.func.isRequired
};

export default ItemsList;
