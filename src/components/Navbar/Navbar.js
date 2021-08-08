import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, Redirect
} from "react-router-dom";
import './Navbar.scss';
import Home from '../Home/Home';
import Gaming from '../Gaming/Gaming';
import UpcomingEvents from '../UpcomingEvents/UpcomingEvents';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AfroIcon from '../../assets/img/afro_icon.png';
import { Dialog, Avatar } from '@material-ui/core';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from "../../features/login/loginSlice";
import { useState } from "react";
import { selectCurrentprofile } from '../../features/profile/profileSlice';



export default function Navbar() {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const profile = useSelector(selectCurrentprofile);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleClose = () => {
        setDialogOpen(false);
    };


    return (
        <Router>
            {/* <Link to="/home">
                <img title="Soul Source" className="nav-logo" src={AfroIcon} alt="Soul Source" />
            </Link> */}

            <div>
                <div className="nav-div">
                    <nav>
                        <span>
                            <Link to="/home">Home</Link>
                        </span>
                        <span>
                            <Link to="/gaming">Gaming</Link>
                        </span>
                        <span>
                            <Link to="/events">Events</Link>
                        </span>
                        <span >
                            <Link to={!isLoggedIn ? '/login' : '/profile'}>
                                <AccountCircleIcon />
                                {/* { !isLoggedIn ? <AccountCircleIcon /> : <Avatar alt={profile.name} src={profile.profilePicPath} /> } */}
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