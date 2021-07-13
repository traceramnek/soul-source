import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, Redirect, useHistory
} from "react-router-dom";
import './Navbar.scss';
import Home from '../Home/Home';
import Gaming from '../Gaming/Gaming';
import UpcomingEvents from '../UpcomingEvents/UpcomingEvents';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AfroIcon from '../../assets/img/afro_icon.png';
import { Dialog } from '@material-ui/core';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from "../../features/login/loginSlice";
import { useState } from "react";



export default function Navbar() {
    const portfolioLink = "https://traceramnek.github.io";
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const [dialogOpen, setDialogOpen] = useState(false);
    const history = useHistory();


    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleClose = () => {
        setDialogOpen(false);
    };

    const handleAuth = () => {
        if (!isLoggedIn) {
            handleOpenDialog();
        } else {
            history.push('/profile');
        }
    };

    return (
        <Router>
            <a href={portfolioLink} target="_blank" title="Kwan's Portfolio"
                rel="noopener noreferrer">
                <img title="Kwan Holloway's Portfolio" className="nav-logo" src={AfroIcon} alt="Kwan's Logo" />
            </a>

            <div>
                <div className="nav-div">
                    <nav>
                        <span>
                            <Link className="nav-link" to="/home">Home</Link>
                        </span>
                        <span>
                            <Link className="nav-link" to="/gaming">Gaming</Link>
                        </span>
                        <span>
                            <Link className="nav-link" to="/events">Events</Link>
                        </span>
                        <span >
                            <Link className="nav-link" to={!isLoggedIn ? '/login' : '/profile'}>
                                {/* <Link className="nav-link" onClick={() => handleAuth()}> */}
                                <AccountCircleIcon />
                            </Link>
                        </span>
                    </nav>
                </div>
            </div>

            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <div className="route-div">
                <Switch>
                    <Route path="/gaming" component={Gaming}>
                        {/* <Gaming></Gaming> */}
                    </Route>
                    <Route path="/events">
                        <UpcomingEvents></UpcomingEvents>
                    </Route>
                    <Route path="/login" render={() => (!isLoggedIn ? <Login /> : <Redirect to='/profile' />)}>

                    </Route>
                    <Route path="/profile">
                        {(!isLoggedIn ? <Redirect to='/home' /> : <Profile />)}
                    </Route>
                    <Route path="/">
                        <Home></Home>
                    </Route>
                </Switch>
            </div>

            <Dialog open={dialogOpen} onClose={handleClose}>
                <Login />
            </Dialog>

        </Router>

    );
}