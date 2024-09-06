import { NavLink } from "react-router-dom"
import "./Navbar.css"

const Navbar = () => {
    return (
        <nav id="navbar">
            <h2>Party Time!</h2>
            <ul>
                <li>
                    <NavLink to="/">My Parties</NavLink>
                </li>
                <li>
                    <NavLink to="/party/new" className="btn">Create Party</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar