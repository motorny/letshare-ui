/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

import {getLocale} from "../../cookieManager";

import not_found from '../../mockups/not-found.json'

import './index.css'

export function NotFound() {
    const locale = getLocale();
    return (
        <div className="not-found">
            <h1>
                {not_found.not_found[locale]}
            </h1>
            <Link to="/" className="not-found__link">
                {not_found.return[locale]}
            </Link>
        </div>
    );
}

export default NotFound;
