
import { firebaseAuth } from '../../services/firebase';
import { useEffect } from 'react';
import './Login.scss';
import firebase from 'firebase/app';
import { div } from '@material-ui/core';
import { Facebook, GitHub, Twitter } from '@material-ui/icons';

export default function Login() {

    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    const twitterProvider = new firebase.auth.TwitterAuthProvider();
    const githubProvider = new firebase.auth.GithubAuthProvider();

    const loginUser = (provider) => {
        return () => {
            firebaseAuth.signInWithRedirect(provider).then(function (result) {
                // The firebase.User instance:
                var user = result.user;
                // The Facebook firebase.auth.AuthCredential containing the Facebook
                // access token:
                var credential = result.credential;
            }, function (error) {
                // The provider's account email, can be used in case of
                // auth/account-exists-with-different-credential to fetch the providers
                // linked to the email:
                var email = error.email;
                // The provider's credential:
                var credential = error.credential;
            });
        }
    }

    return (
        <div className="login-landing">
            <div className="login-container">
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