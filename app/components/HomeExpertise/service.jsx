import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';

const Service = ({ name, text, iconClass, index }) => {
  const animationClass = "home-expertise__service_" + index.toString();
  return(
    <ScrollAnimation
      animateIn='fadeInUp'
      initiallyVisible={false}
      animateOnce={true}
      className={animationClass}>
      <div className="home-expertise__service">
        <i className={iconClass + ' home-expertise__service_icon'}/>
        <div className="home-expertise__service_text_wrap">
          <div className="home-expertise__service_title">
            {name}
          </div>
          <div className="home-expertise__service_text">{text}</div>
        </div>
      </div>
    </ScrollAnimation>
  )
};

export default Service;