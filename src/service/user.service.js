import { storageService } from "./async-storage.service"

const STORAGE_KEY = "userDB"
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'


export const userService = {
    getById,
    login,
    signup,
    logout,
    getEmptyCredentials,
    getLoggedinUser,
}

function getById(userId) {
    return storageService.get(STORAGE_KEY, userId)
}

function login({username, password}){
    return storageService.query(STORAGE_KEY)
    .then(users => {
        const user = users.find(user => user.username === username)
        if (user && user.password !== password) return Promise.reject('Incorrect Password')
        if (user) return _setLoggedinUser(user)
            else return Promise.reject('Invalid login')
    })
}

function signup({ username, password, fullname }) {
    const user = { username, password, fullname}
    return storageService.post(STORAGE_KEY, user)
        .then(_setLoggedinUser)
}

function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    return Promise.resolve()
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname,}
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: ''
    }
}
