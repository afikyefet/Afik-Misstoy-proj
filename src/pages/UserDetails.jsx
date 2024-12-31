/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { userService } from "../service/user.service"
import { showErrorMsg } from "../service/event-bus.service"

export function UserDetails(){
    const params = useParams()
    const [userPage,setUserPage] = useState(null)
    const navigate = useNavigate()

    useEffect(()=>{
        userService.getById(params.userId)
        .then(user => {
            setUserPage((userPage) => userPage = {...user})
        })
        .catch(err => {
            showErrorMsg('No user found')
            console.error('couldnt find user', err);
            navigate('/')
        })
    },[])

    if(!userPage) return <section className="user-details">Loading....</section>
    return (
        <section className="user-details container">
            hey
            <h1>{userPage.fullname}</h1>
            <h2>{userPage.username}</h2>
        </section>
    )
}