import { useState } from 'react'

import { showErrorMsg, showSuccessMsg } from '../service/event-bus.service.js'
import { login, signup } from '../store/actions/user.action.js'
import { LoginForm } from './LoginForm.jsx'
import { onCloseModal, setModalData } from '../store/actions/modal.action.js'


export function LoginSignup() {

    const [isSignup, setIsSignUp] = useState(false)

    function onLogin(credentials) {
        isSignup ? _signup(credentials) : _login(credentials)
    }

    function _login(credentials) {
        login(credentials)
            .then(() => { showSuccessMsg('Logged in successfully') })
            .catch((err) => { 
                if(err === "Incorrect Password"){
                    showErrorMsg('Wrong Password') 
                }else{
                    showErrorMsg('Oops try again') 
                }
            })
            .finally(onCloseModal())
    }
    

    function _signup(credentials) {
        signup(credentials)
            .then(() => { showSuccessMsg('Signed in successfully') })
            .catch(() => { showErrorMsg('Oops try again') })
            .finally(onCloseModal())
    }

    function openLoginModal() {
        setModalData({
            cmp: (props) => <LoginForm {...props} />,
            props: { onLogin, isSignup: isSignup },
        })
    }

    return (
        <section className="login-page">
            <button className='login-btn' onClick={openLoginModal}>{isSignup ? "Sign Up Now!" : "Log In"}</button>
            <section className="btns">
                <a href="#" onClick={() => setIsSignUp(!isSignup)}>
                    {isSignup ?
                        'Already a member? Login' :
                        'New user? Signup here'
                    }
                </a >
            </section>
        </section >
    )
}
