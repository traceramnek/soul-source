import React, { useEffect } from 'react';
import './Footer.scss';
import kshIcon from '../../assets/img/KwanSH_Logo_White.png';
import { IconButton } from '@material-ui/core';
import { Launch, BookmarkBorder, Bookmark } from '@material-ui/icons';
import { isNullOrUndefined, scrollElemIntoView } from '../../util/utils';
import { PORTFOLIO_LINK } from '../../util/constants';

export default function Footer() {

    return (
        <div className="footer-container">
            <div class="copyright">
                &copy; Kwan S. Holloway 2021
                <p>Designed and Developed by Kwan S. Holloway </p>
            </div>
            {/* <div>
                <a href={PORTFOLIO_LINK} target="_blank" rel="noreferrer">
                    <img className="social-icon" src={kshIcon} alt="Google Icon" />
                </a>
            </div> */}
        </div>
    );
}