/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from "react";
import {FormattedMessage} from "react-intl";

import H1 from "components/H1";
import messages from "./messages";

import './style.css'

export default function NotFound() {
    return (
        <div>
            <div className="text"><p>404</p></div>
            <div className="container">
                {/* caveman left */}
                <div className="caveman">
                    <div className="leg">
                        <div className="foot">
                            <div className="fingers"/>
                        </div>
                    </div>
                    <div className="leg">
                        <div className="foot">
                            <div className="fingers"/>
                        </div>
                    </div>
                    <div className="shape">
                        <div className="circle"/>
                        <div className="circle"/>
                    </div>
                    <div className="head">
                        <div className="eye">
                            <div className="nose"/>
                        </div>
                        <div className="mouth"/>
                    </div>
                    <div className="arm-right">
                        <div className="club"/>
                    </div>
                </div>
                {/* caveman right */}
                <div className="caveman">
                    <div className="leg">
                        <div className="foot">
                            <div className="fingers"/>
                        </div>
                    </div>
                    <div className="leg">
                        <div className="foot">
                            <div className="fingers"/>
                        </div>
                    </div>
                    <div className="shape">
                        <div className="circle"/>
                        <div className="circle"/>
                    </div>
                    <div className="head">
                        <div className="eye">
                            <div className="nose"/>
                        </div>
                        <div className="mouth"/>
                    </div>
                    <div className="arm-right">
                        <div className="club"/>
                    </div>
                </div>
            </div>
            {/* //////////////// CREDIT //////////////// */}
            <a href="/">
                <button>
                    Quay về trang chủ
                </button>
            </a>
        </div>

    );
}
