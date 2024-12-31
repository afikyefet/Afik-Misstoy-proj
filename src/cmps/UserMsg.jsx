import { useEffect, useRef, useState } from "react"
import { eventBusService } from "../service/event-bus.service"
// const { useState, useEffect, useRef } = React

export function UserMsg() {

    const [msg, setMsg] = useState(null)
    const timeoutIdRef = useRef()

    useEffect(() => {
        const unsubscribe = eventBusService.on('show-user-msg', (msg) => {
            setMsg(msg)
            // window.scrollTo({top: 0, behavior: 'smooth'});
            if (timeoutIdRef.current) {
                timeoutIdRef.current = null
                clearTimeout(timeoutIdRef.current)
            }
            timeoutIdRef.current = setTimeout(closeMsg, 3000)
        })
        return unsubscribe
    }, [])

    function closeMsg() {
        setMsg(null)
    }

    if (!msg) return <span></span>

    return (
        <section className={`user-msg ${msg.type}`}>
            <button className="close-btn" onClick={closeMsg}>x</button>
            {msg.txt}
        </section>
    );
}
