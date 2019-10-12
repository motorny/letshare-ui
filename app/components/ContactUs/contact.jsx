import React from 'react';

const Contact = ({title, info, className, href = undefined, newTab = false }) => (
  <div className="contact-us__contact_wrap">
    <div className="contact-us__icon">
      <i className={className + ' contact-us__i'}/>
    </div>
    <div className="contact-us__contact_text">
      <div className="contact-us__contact_title">
        {title}
      </div>
      {href === undefined
        ? <div className="contact-us__contact_info">{info}</div>
        : <a
          href={href}
          className="contact-us__contact_info contact-us__contact_link"
          target={newTab ? "_blank" : ""}>
          {info}
        </a>
      }
    </div>
  </div>
);

export default Contact;