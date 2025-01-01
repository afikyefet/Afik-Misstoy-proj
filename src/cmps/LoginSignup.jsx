
import { showErrorMsg, showSuccessMsg } from '../service/event-bus.service.js'
import { login, signup, toggleIsSignup } from '../store/actions/user.action.js'
import { LoginForm } from './LoginForm.jsx'
import { onCloseModal, setModalData } from '../store/actions/modal.action.js'
import { useSelector } from 'react-redux'


export function LoginSignup() {
    const isSignup = useSelector(storeState => storeState.userModule.isSignup)

    function onLogin(credentials) {
        if (isSignup) {
            _signup(credentials);
        } else {
            _login(credentials);
        }
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
    function toggleIsSignup2(){
        toggleIsSignup()
    }

    function openLoginModal() {
        setModalData({
            cmp: (props) => <LoginForm {...props} />,
            props: { onLogin, isSignup: isSignup, toggleIsSignup2 },
        })
    }


    return (
        <section className="login-page">
            <button className='login-btn' onClick={openLoginModal}>{isSignup ? "Sign Up Now!" : "Log In"}</button>
            <section className="btns">
                <a href="#" onClick={() => toggleIsSignup2()}>
                    {isSignup ?
                        'Already a member? Login' :
                        'New user? Signup here'
                    }
                </a >
            </section>
        </section >
    )
}
