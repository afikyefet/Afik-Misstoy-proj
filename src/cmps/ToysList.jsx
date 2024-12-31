/* eslint-disable react/prop-types */
import { ToyPreview } from "./ToyPreview"
import { useEffect } from "react"
import { setModalData } from "../store/actions/modal.action";
import { ToyDetail } from "../pages/ToyDetail";
import { ToyEdit } from "../pages/ToyEdit";

export function ToysList({toys, onToyRemove}){

    useEffect(()=>{
    },[toys])

    function setCmpModal(Cmp, props){
        setModalData({
            cmp: (props) => <Cmp {...props} />,
            props: {...props},})
    }

    const isToys = toys && toys.length > 0;

    return (
        <section className="toys-list container">
            <h5>Toys List</h5>
            <ul className="toys-ul">
                {isToys &&
                    toys.map((toy, idx) => (
                        <li key={toy._id+ idx} className="toy-li" style={{width:"180px"}}>
                            <ToyPreview toy={toy} key={toy._id} />
                            <section className="btn-container">
                                <button onClick={()=> onToyRemove(toy._id)}>delete</button>
                                <button onClick={()=>setCmpModal(ToyDetail, {toyId: toy._id})}> details </button>
                                <button onClick={()=>setCmpModal(ToyEdit, {toyId: toy._id})}>edit</button>
                                </section>
                        </li>
                    ))}
            </ul>
        </section>
    );
}