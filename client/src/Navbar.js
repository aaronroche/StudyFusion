import StudyFusionLogo from './StudyFusionLogo.png';
import { Outlet, Link } from "react-router-dom";
import AuthInfo from './AuthInfo';

const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-dark" style={{ backgroundColor: "#17A9E8" }}>
                <Link className="navbar-brand" to="/">
                    <img
                        className="d-inline-block align-top"
                        src={StudyFusionLogo}
                        width="30"
                        height="30"
                        alt="study fusion logo"
                    />
                    StudyFusion
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/profile">Profile</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/mygroups">Groups</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact</Link>
                        </li>
                    </ul>
                </div>
                {/* Conditionally render sign-in/sign-out based on authentication status */}
                <div className="ml-auto d-flex">
                    <AuthInfo />
                </div>
            </nav>
            <Outlet />
        </div>
    );
}

export default Navbar;
