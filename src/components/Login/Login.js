
import { firebaseAuth } from '../../services/firebase';
import { useEffect } from 'react';
import './Login.scss';
import firebase from 'firebase/app';
import { div } from '@material-ui/core';
import { Facebook, GitHub, Twitter } from '@material-ui/icons';
import { selectIsLoggedIn, loginUserAsync } from '../../features/login/loginSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Login() {

    const isLoggedIn = useSelector(selectIsLoggedIn);
    const dispatch = useDispatch();

    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    const twitterProvider = new firebase.auth.TwitterAuthProvider();
    const githubProvider = new firebase.auth.GithubAuthProvider();


    const loginUser = (provider) => {
        return () => {
            dispatch(loginUserAsync(provider));
        }
    }

    return (
        <div className="login-landing">
            <div className="login-container">
                <h3>Login with Social Media</h3>

                <div className="login-button" onClick={loginUser(googleProvider)}>
                    Login with Google
                </div>
                {/* <div className="login-button" onClick={loginUser(facebookProvider)}>
                    <Facebook />
                    Login with Facebook
                </div>
                <div className="login-button" onClick={loginUser(twitterProvider)}>
                    <Twitter />
                    Login with Twitter
                </div> */}
                <div className="login-button" onClick={loginUser(githubProvider)}>
                    <GitHub />
                    Login with Github
                </div>
            </div>
        </div>
    );
}