/*
 * ItemForm
 *
 * This is the form for item
 */

import React from 'react';
import PropTypes from 'prop-types';

import { getLocale } from '../../cookieManager';
import ImageFormField from '../ImageFormField';
import { BASE64_RE } from '../../utils/utils';

import './index.css'

const content = {
  choose_file: {
    RU: "Выбирете файл",
    EN: "Choose the file"
  },
  input_description: {
    RU: "Описание",
    EN: "Description"
  },
  input_name: {
    RU: "Название",
    EN: "Name"
  },
  button_submit: {
    RU: "Отправить",
    EN: "Submit"
  }
};

export class ItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onChangeText = this.onChangeText.bind(this);

    const { data } = props;
    if (data !== undefined)
      this.state = {
        ...data,
      };
    else
      this.state = {
        image: '',
        name: '',
        description: '',
      };
  }

  onChangeImage(image) {
    if (BASE64_RE.test(image)) {
      this.state.image = image;
      this.setState(this.state);
    }
  }

  onChangeText(evt, field) {
    this.state[field] = evt.target.value;
    this.setState(this.state);
  }

  render() {
    const locale = getLocale();
    const { required } = this.props;
    return (
      <div>
        <form onSubmit={this.props.onSubmit} id="item-form">
          <ImageFormField src={this.state.image} onChange={this.onChangeImage}/>
          <input className="item-form__input hidden"
                 name="image"
                 required={required}
                 value={this.state.image} readOnly />
          <input className="item-form__input"
                 name="name"
                 type="text"
                 required={required}
                 placeholder={content.input_name[locale]}
                 onChange={evt => this.onChangeText(evt, 'name')}
                 value={this.state.name}
                 maxLength={40} />
          <input className="item-form__input"
                 name="description"
                 type="text"
                 required={required}
                 placeholder={content.input_description[locale]}
                 onChange={evt => this.onChangeText(evt, 'description')}
                 value={this.state.description}
                 maxLength={128} />
          <input className="item-form__button item-form__button_text"
                 type="submit"
                 value={content.button_submit[locale]}/>
        </form>
      </div>
    );
  }
}

ItemForm.propTypes = {
  required: PropTypes.bool,
  data: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default ItemForm;