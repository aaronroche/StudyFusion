
import './mygroups.css';
import StudyFusionLogo from './StudyFusionLogo.png';

function Navbar () {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark" style={{backgroundColor: "#17A9E8"}}>
        <a
            href="#"
            className="navbar-brand mb-0 h1">
                <img
                className="d-inline-block align-top"
                src={StudyFusionLogo}
                width="30" height="30"/>
                StudyFusion
        </a>
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
                    <a href="#" className="nav-link">
                        Home
                    </a>
                </li>
                <li className="navbar-item">
                    <a href="#" className="nav-link">
                        Groups
                    </a>
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
    );
}

export default Navbar;