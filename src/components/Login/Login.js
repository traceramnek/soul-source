
import './Login.scss';
import googleIcon from '../../assets/img/google.png';
import firebase from 'firebase/app';
import { GitHub } from '@material-ui/icons';
import { loginUserAsync } from '../../features/login/loginSlice';
import { useDispatch } from 'react-redux';

export default function Login() {

    const dispatch = useDispatch();

    const googleProvider = new firebase.auth.GoogleAuthProvider();
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
                    <img className="social-icon" src={googleIcon} alt="Google Icon" />
                    Login with Google
                </div>
                <div className="login-button" onClick={loginUser(githubProvider)}>
                    <GitHub style={{marginRight: 10}} />
                    Login with Github
                </div>
            </div>
        </div>
    );
}