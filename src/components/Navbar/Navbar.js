import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import './Navbar.scss';
import Home from '../Home/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { SvgIcon } from '@material-ui/core';


export default function Navbar() {
    const portfolioLink = "https://traceramnek.github.io"

    return (
        <Router>
            <a href={portfolioLink} target="_blank" title="Kwan's Portfolio"
                rel="noopener noreferrer">
                <img title="Kwan Holloway's Portfolio" className="nav-logo" src="img/KwanSH_Logo_White.png" alt="Kwan's Logo" />
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
                        <span>
                            <Link className="nav-link" to="/profile">
                                <AccountCircleIcon></AccountCircleIcon>
                            </Link>
                        </span>
                    </nav>
                </div>
            </div>

            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <div className="route-div">
                <Switch>
                    <Route path="/">
                        <Home></Home>
                    </Route>
                </Switch>
            </div>

        </Router>

    );
}