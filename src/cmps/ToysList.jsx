/* eslint-disable react/prop-types */
import { ToyPreview } from "./ToyPreview"
import { useEffect } from "react"

export function ToysList({toys, onToyRemove}){

    useEffect(()=>{
    },[toys])

    const isToys = toys && toys.length > 0;

    return (
        <section className="toys-list container">
            <h5>Toys List</h5>
            <ul className="toys-ul">
                {isToys &&
                    toys.map((toy) => (
                        <li key={toy._id} className="toy-li" style={{width:"180px"}}>
                            <ToyPreview toy={toy} key={toy._id} />
                            <button onClick={()=> onToyRemove(toy._id)}>delete</button>
                        </li>
                    ))}
            </ul>
        </section>
    );
}