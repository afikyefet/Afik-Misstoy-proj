import { NavLink, Link } from "react-router-dom";
import { LoginSignup } from "./LoginSignup";
import { useSelector } from "react-redux";
import { logout } from "../store/actions/user.action";
import { showErrorMsg, showSuccessMsg } from "../service/event-bus.service";

export function AppHeader(){

    async function onLogout() {
        try {
            await logout()
            showSuccessMsg(`Bye now`)
        } catch{
             showErrorMsg('Cannot logout')
        }
    }

    const user = useSelector(storeSelector => storeSelector.userModule.user)
    

    const userLoggedIn = (
        <>
        <span>
        {user?.imgUrl && <img src={user?.imgUrl} />}
            Hello <Link to={`/toys/user/${user?._id}`}>{user?.fullname+" " || "User "}</Link>
        </span>
        <button onClick={onLogout}>Log Out</button>
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