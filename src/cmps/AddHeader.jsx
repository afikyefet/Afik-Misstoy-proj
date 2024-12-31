import { NavLink, Link } from "react-router-dom";
import { LoginSignup } from "./LoginSignup";
import { useSelector } from "react-redux";
import { logout } from "../store/actions/user.action";

export function AppHeader(){

    const user = useSelector(storeSelector => storeSelector.userModule.user)
    

    const userLoggedIn = (
        <>
        <span>
            Hello <Link to={`/toys/user/${user?._id}`}>{user?.fullname+" " || "User "}</Link>
        </span>
        <button onClick={()=> logout()}>Log Out</button>
        </>
    )

    return (
        <section className="header-container">
    <section className="app-header">

        <h1><Link to="/" className="logo">Miss-toy</Link></h1>
        <nav>
            <NavLink to='/home'>Home</NavLink>
            <NavLink to='/toys'>Toys</NavLink>
            <NavLink to='/about'>About us</NavLink>
        </nav>
        <section className="login-container">
            {user ? userLoggedIn :<LoginSignup />}
        </section>
        </section>
    </section>)
}