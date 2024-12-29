import { NavLink, Link } from "react-router-dom";

export function AppHeader(){
    return (
        <section className="header-container">
    <section className="app-header">

        <h1><Link to="/" className="logo">Miss-toy</Link></h1>
        <nav>
            <NavLink to='/home'>Home</NavLink>
            <NavLink to='/about'>About us</NavLink>
            <NavLink to='/toys'>Toys</NavLink>
        </nav>
        <section className="login-container">login log out</section>
        </section>
    </section>)
}