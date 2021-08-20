import React, { useEffect } from 'react';
import './Footer.scss';
import kshIcon from '../../assets/img/KwanSH_Logo_White.png';
import { IconButton } from '@material-ui/core';
import { Launch, BookmarkBorder, Bookmark, GitHub, LinkedIn } from '@material-ui/icons';
import { isNullOrUndefined, scrollElemIntoView } from '../../util/utils';
import { LINKEDIN_LINK, PORTFOLIO_LINK, GITHUB_LINK } from '../../util/constants';

export default function Footer() {

    return (
        <div className="footer-container">
            <div className="copyright">
                &copy; Kwan S. Holloway 2021
                <br></br>
                <span>Designed and Developed by Kwan S. Holloway </span>
            </div>
            <div className="social-icons">
                <a href={PORTFOLIO_LINK} target="_blank" rel="noreferrer">
                    <img className="footer-icon" src={kshIcon} alt="KwanIcon" />
                </a>
                <a href={LINKEDIN_LINK} target="_blank" rel="noreferrer">
                    <LinkedIn/>
                </a>
                <a href={GITHUB_LINK} target="_blank" rel="noreferrer">
                    <GitHub/>
                </a>
            </div>
        </div>
    );
}