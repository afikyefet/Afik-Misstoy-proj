/* eslint-disable react/prop-types */
import { ToyPreview } from "./ToyPreview"
import { useEffect } from "react"
import { setModalData } from "../store/actions/modal.action";
import { ToyEdit } from "../pages/ToyEdit";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


export function ToysList({toys, onToyRemove}){

    const user = useSelector(storeState => storeState.userModule.user)

    const navigate = useNavigate()

    useEffect(()=>{
    },[toys])

    function setCmpModal(Cmp, props){
        setModalData({
            cmp: (props) => <Cmp {...props} />,
            props: {...props},})
    }

    const isToys = toys && toys.length > 0;
     if(toys.length <= 0) return <section className="toys-list"><h3>Sorry no toys found...</h3></section>
    return (
        <section className="toys-list">
            <ul className="toys-ul">
                {isToys &&
                    toys.map((toy, idx) => (
                        <li key={toy._id+ idx} className="toy-li">
                            <ToyPreview toy={toy} key={toy._id} />
                            <section className="btn-container">
                                <button onClick={()=>navigate(`/toys/${toy._id}`)}> details</button>

                                {( user?.isAdmin && <><button onClick={()=>setCmpModal(ToyEdit, {toyId: toy._id})}>edit</button>
                                <button onClick={()=> onToyRemove(toy._id)}>delete</button></>)}
                                </section>
                        </li>
                    ))}
            </ul>
        </section>
    );
}