/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { ToyPreview } from "./ToyPreview"
import { useEffect } from "react"

export function ToysList({toys, onToyRemove}){

    const navigate = useNavigate()

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
                            <section className="btn-container">
                                <button onClick={()=> onToyRemove(toy._id)}>delete</button>
                                <button onClick={()=> navigate(`/toys/${toy._id}`)}>details</button>
                                <button onClick={()=> navigate(`/toys/edit/${toy._id}`)}>edit</button>
                                </section>
                        </li>
                    ))}
            </ul>
        </section>
    );
}