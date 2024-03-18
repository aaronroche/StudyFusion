
import StudyFusionLogo from './StudyFusionLogo.png';
import { Outlet, Link, MemoryRouter } from "react-router-dom";

const Navbar = () => {
    return (
        <MemoryRouter>
        <nav className="navbar navbar-expand-sm navbar-dark" style={{backgroundColor: "#17A9E8"}}>
        <Link to="/">
                <img
                className="d-inline-block align-top"
                src={StudyFusionLogo}
                width="30" height="30"/>
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
                    <Link to="/">Home</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/mygroups">Groups</Link>
                </li>
                <li className="navbar-item">
                    <a href="#" className="nav-link">
                        Contact
                    </a>
                </li>
                <li className="navbar-item">
                    <a href="#" className="nav-link">
                        Sign Out
                    </a>
                </li>
            </ul>
        </div>
    </nav>
    <Outlet />
    </MemoryRouter>
    );
}

export default Navbar;