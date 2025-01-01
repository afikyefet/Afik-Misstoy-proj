/* eslint-disable react/prop-types */

import { useState } from "react"
import { userService } from "../service/user.service"
import { ImgUploader } from "./ImgUploader"
import { useSelector } from "react-redux"



export function LoginForm({ onLogin, toggleIsSignup2}) {

    const isSignup = useSelector(storeState => storeState.userModule.isSignup)
    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())


    function handleChange({ target }) {
        const { name: field, value } = target
        setCredentials(prevCreds => ({ ...prevCreds, [field]: value }))
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        onLogin(credentials)
    }

    

    function onUploaded(imgUrl) {
        setCredentials(prevCredentials => ({ ...prevCredentials, imgUrl }))
    }

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="username">User Name:</label>
            <input
                type="text"
                name="username"
                id="username"
                value={credentials.username}
                placeholder="Username"
                onChange={handleChange}
                required
                autoFocus
            />
            <label htmlFor="password">Choose Password:</label>
            <input
                type="password"
                name="password"
                id="password"
                value={credentials.password}
                placeholder="Password"
                onChange={handleChange}
                required
                autoComplete="off"
            />
            {isSignup && <>
            <label htmlFor="fullname">Choose Password:</label>
            <input
                type="text"
                name="fullname"
                id="fullname"
                value={credentials.fullname}
                placeholder="Full name"
                onChange={handleChange}
                required
            />
            <ImgUploader onUploaded={onUploaded} />
            </>}
            <button>{isSignup ? 'Signup' : 'Login'}</button>
        </form>
    )
}