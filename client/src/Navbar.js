
import StudyFusionLogo from './StudyFusionLogo.png';
import { Outlet, Link, MemoryRouter } from "react-router-dom";
import AuthInfo from './AuthInfo';

const Navbar = () => {
    return (
        <div>
        <nav className="navbar navbar-expand-sm navbar-dark" style={{backgroundColor: "#17A9E8"}}>
        <Link class="nav-link" to="/">
                <img
                className="d-inline-block align-top"
                src={StudyFusionLogo}
                width="30" height="30"
                alt="study fusion logo"/>
                StudyFusion
        </Link>
        <button 
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        className="navbar-toggler">

        </button>
        <div
            className="collapse navbar-collapse"
            id="navbarNav">
            <ul className="navbar-nav">
                <li className="navbar-item active">
                    <Link class="nav-link" to="/">Home</Link>
                </li>
                <li className="navbar-item">
                    <Link class="nav-link" to="/mygroups">Groups</Link>
                </li>
                <li className="navbar-item">
                    <Link class="nav-link" to="/contact">Contact</Link>
                    {/* <a href="#" className="nav-link">
                        Contact
                    </a> */}
                </li>
                <AuthInfo />
                    {/* <a href="#" className="nav-link">
                        Sign Out
                    </a> */}
            </ul>
        </div>
    </nav>
    <Outlet />
    </div>
    );
}

export default Navbar;