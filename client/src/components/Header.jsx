import { Link } from "react-router-dom"
import irsLogo from '../assets/IRS logo.jpg'

const Header = () => {
    return (
        <header>
            <img src={irsLogo} alt="Picture of Vita logo"/>
            <Link to={"/login"}>
                <li>Login</li>
            </Link>
        </header>
    )
}

export default Header;
