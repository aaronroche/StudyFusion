
import StudyFusionLogo from './StudyFusionLogo.png';
import { Outlet, Link, MemoryRouter } from "react-router-dom";
import AuthInfo from './AuthInfo';

const Navbar = () => {
    return (
        <div>
        <nav className="navbar navbar-expand-sm navbar-dark" style={{backgroundColor: "#17A9E8"}}>
        <Link className="nav-link" to="/StudyFusion/">
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
            <li className="navbar-item">
                    <Link className="nav-link" to="/StudyFusion/profile">Profile</Link>
                </li>
                <li className="navbar-item active">
                    <Link className="nav-link" to="/StudyFusion/">Home</Link>
                </li>
                <li className="navbar-item">
                    <Link className="nav-link" to="/StudyFusion/mygroups">Groups</Link>
                </li>
                <li className="navbar-item">
                    <Link className="nav-link" to="/StudyFusion/contact">Contact</Link>
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