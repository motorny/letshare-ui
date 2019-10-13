/*
 * ImageFormField
 *
 * This is the component of the field for image in form
 */

import React from 'react';
import PropTypes from 'prop-types';

import { getLocale } from '../../cookieManager';
import { File2Base64 } from '../../toBase64';

import './index.css';

const content = {
  choose_file: {
    RU: "Выбирете файл",
    EN: "Choose the file"
  }
};

export class ImageFormField extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeFile = this.onChangeFile.bind(this);
  }

  onChangeFile(event) {
    const file = event.target.files[0];
    if (file)
      File2Base64(file, base64 => {
        const img = new Image();
        img.src = base64;
        img.onload = () => {
          const side = Math.min(img.naturalWidth, img.naturalHeight);
          const canvas = document.createElement('canvas');
          canvas.width = side;
          canvas.height = side;
          const ctx = canvas.getContext('2d');

          ctx.drawImage(
            img,
            Math.floor((img.naturalWidth - side) / 2),
            Math.floor((img.naturalHeight - side) / 2),
            side,
            side,
            0,
            0,
            side,
            side,
          );

          this.props.onChange(canvas.toDataURL('image/jpeg'));
        };
      });
  }

  render() {
    const locale = getLocale();
    let { src } = this.props;
    if (src === '')
      src = 'http://museeach.ru/photo.png';
    return (
      <div className="image-form-field">
        <img className="image-form-field__image"
             src={src} />
        <div>
          <label htmlFor="image-form-field"
                 className="image-form-field__button_wrap">
            <div className="image-form-field__button">
              <span className="image-form-field__button_text">
                {content.choose_file[locale]}
              </span>
            </div>
            <input className="image-form-field__input"
                   id="image-form-field"
                   type="file"
                   accept="image/*"
                   onChange={this.onChangeFile}
            />
          </label>
        </div>
      </div>
    );
  }
}

ImageFormField.propTypes = {
  src: PropTypes.string,
  onChange: PropTypes.func,
};

export default ImageFormField;
