import React from 'react';

import { getLocale } from '../../cookieManager';

import './index.css';
import tech_problems from '../../mockups/tech-problem.json';

const TechProblem = () => {
  const locale = getLocale();
  return (
    <div className="tech-problem">
      <h2>
        {tech_problems.title[locale]}
      </h2>
      <h2>
        {tech_problems.description[locale]}
      </h2>
    </div>
  )
};

export default TechProblem;