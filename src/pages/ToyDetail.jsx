/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { loadToys, saveToy, setIsLoading, setSelectedToy } from "../store/actions/toy.action"
import { showErrorMsg, showSuccessMsg } from "../service/event-bus.service"
import { toysService } from "../service/toys.service"

export function ToyDetail(){

    const toy = useSelector((storeState) => storeState.toyModule.selectedToy)
    const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        setIsLoading(true);
        loadToys()
            .then(() => {
                setSelectedToy(params.toyId)
                console.log(toy);
                
             })
            .catch((err) => {
                console.error('Could not load toys:', err);
                navigate("/toys");
             })
            .finally(() => setIsLoading(false));
    }, [params.toyId]);    

    if (isLoading || !toy) {
        return <div className="toy-detail container">Loading...</div>;
    }    
    return (
        <section className="toy-detail container">
            <div className="toy-img"><img alt="Toy picture" src="https://pl.nice-cdn.com/upload/image/product/large/default/toy-place-bear-100cm-1-st-819856-en.jpg" /></div>
            <section className="toy-info">
            <h1 className="toy-name">
                Toy name: {toy?.name || "No name available"}
            </h1>
            <h2 className="toy-price">
                Toy price: {toy?.price}
            </h2>
            <h3 className="toy-labels">
                Toy labels: {toy?.labels?.join(', ')}
            </h3>
            <h3 className="toy-stock">
                in Stock: {(toy?.inStock ? "In Stock!" : "Out Of Stock")}
            </h3>
            </section>
        </section>
    )
}