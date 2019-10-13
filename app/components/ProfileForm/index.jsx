/*
 * ProfileForm
 *
 * This is the form for profile
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
  input_password: {
    RU: "Пароль",
    EN: "Password"
  },
  input_password_repeat: {
    RU: "Повторите пароль",
    EN: "Repeat password"
  },
  input_username: {
    RU: "Логин",
    EN: "Login"
  },
  input_name: {
    RU: "Имя",
    EN: "Name"
  },
  input_location: {
    RU: "Локация",
    EN: "Location"
  },
  input_contact: {
    RU: "Контакт",
    EN: "Contact"
  },
  button_submit: {
    RU: "Отправить",
    EN: "Submit"
  }
};

export class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.checkCorrectness = this.checkCorrectness.bind(this);
    this.onChangePhoto = this.onChangePhoto.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.getClassNamePassword = this.getClassNamePassword.bind(this);

    const { data } = props;
    if (data !== undefined)
      this.state = {
        ...data,
        correct: 0,
      };
    else
      this.state = {
        photo: '',
        username: '',
        name: '',
        location: '',
        contact: '',
        correct: 0,
      };
  }

  onChangePhoto(photo) {
    if (BASE64_RE.test(photo)) {
      this.state.photo = photo;
      this.setState(this.state);
    }
  }

  onChangeText(evt, field) {
    this.state[field] = evt.target.value;
    this.setState(this.state);
  }

  checkCorrectness() {
    let form = document.getElementById("profile-form");
    const password = form.password.value;
    const repeated_password = form.repeated_password.value;
    if (repeated_password === '' && password === '')
      this.state.correct = 0;
    else if (repeated_password !== password)
      this.state.correct = -1;
    else
      this.state.correct = 1;
    this.setState(this.state);
  }

  getClassNamePassword() {
    const { correct } = this.state;
    if (correct === 0)
      return "profile-form__input";
    else if (correct === -1)
      return "profile-form__input red";
    else
      return "profile-form__input green";
  }

  render() {
    const locale = getLocale();
    const { required } = this.props;
    return (
      <div>
        <form onSubmit={this.props.onSubmit} id="profile-form">
          <ImageFormField src={this.state.photo} onChange={this.onChangePhoto}/>
          <input className="profile-form__input hidden"
                 name="photo"
                 required={required}
                 value={this.state.photo} readOnly />
          <input className="profile-form__input"
                 name="username"
                 type="text"
                 required={required}
                 placeholder={content.input_username[locale]}
                 onChange={evt => this.onChangeText(evt, 'username')}
                 value={this.state.username}
                 maxLength={40} />
          <input className="profile-form__input"
                 name="password"
                 type="password"
                 required={required}
                 placeholder={content.input_password[locale]}
                 onChange={this.checkCorrectness}
                 maxLength={128} />
          <input className={this.getClassNamePassword()}
                 name="repeated_password"
                 type="password"
                 required={required || password !== ''}
                 placeholder={content.input_password_repeat[locale]}
                 onChange={this.checkCorrectness}
                 maxLength={128} />
          <input className="profile-form__input"
                 name="name"
                 type="text"
                 required={required}
                 placeholder={content.input_name[locale]}
                 onChange={evt => this.onChangeText(evt, 'name')}
                 value={this.state.name}
                 maxLength={128} />
          <input className="profile-form__input"
                 name="location"
                 type="text"
                 required={required}
                 placeholder={content.input_location[locale]}
                 onChange={evt => this.onChangeText(evt, 'location')}
                 value={this.state.location}
                 maxLength={128} />
          <input className="profile-form__input"
                 name="contact"
                 type="text"
                 required={required}
                 placeholder={content.input_contact[locale]}
                 onChange={evt => this.onChangeText(evt, 'contact')}
                 value={this.state.contact}
                 maxLength={128} />
          <input className="profile-form__button profile-form__button_text"
                 type="submit"
                 value={content.button_submit[locale]}/>
        </form>
      </div>
    );
  }
}

ProfileForm.propTypes = {
  required: PropTypes.bool,
  data: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default ProfileForm;