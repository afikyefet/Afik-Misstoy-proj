import { NavLink } from "react-router-dom";

export function AppHeader(){
    return (<section className="app-header">
        <h1>Miss-toy</h1>
        <nav>
            <NavLink to='/home'>home</NavLink>
            <NavLink to='/about'>about us</NavLink>
            <NavLink to='/toys'>toys</NavLink>
            {/* <div>Home</div>
            <div>Toys</div>
            <div>About us</div> */}
        </nav>
    </section>)
}