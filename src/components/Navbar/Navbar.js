import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import './Navbar.scss';
import Home from '../Home/Home';
import Gaming from '../Gaming/Gaming';
import UpcomingEvents from '../UpcomingEvents/UpcomingEvents';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AfroIcon from '../../assets/img/afro_icon.png';
import { SvgIcon } from '@material-ui/core';
import Profile from '../Profile/Profile';


export default function Navbar() {
    const portfolioLink = "https://traceramnek.github.io";
    

    const handleAuth = () => {
        
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
                        <span>
                            <Link className="nav-link" to="/learning">Learning</Link>
                        </span>
                        <span onClick={() => handleAuth()}>
                            <Link className="nav-link" to="/profile">
                                <AccountCircleIcon/>
                            </Link>
                        </span>
                    </nav>
                </div>
            </div>

            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <div className="route-div">
                <Switch>
                    <Route path="/gaming">
                        <Gaming></Gaming>
                    </Route>
                    <Route path="/events">
                        <UpcomingEvents></UpcomingEvents>
                    </Route>
                    <Route path="/profile">
                        <Profile></Profile>
                    </Route>
                    <Route path="/">
                        <Home></Home>
                    </Route>
                </Switch>
            </div>

        </Router>

    );
}