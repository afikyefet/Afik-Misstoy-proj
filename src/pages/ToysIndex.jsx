import { useEffect } from "react";
import { ToysList } from "../cmps/ToysList";
import { loadToys, removeToy } from "../store/actions/toy.action";
import { showErrorMsg, showSuccessMsg } from "../service/event-bus.service";
import { useSelector } from "react-redux";
import { ToyFilter } from "../cmps/ToyFilter";
// import {useSelector} from "react-redux"

export function ToysIndex(){

    const toys = useSelector(storeSelector => storeSelector.toyModule.toys)
    const isLoading = useSelector(storeSelector => storeSelector.toyModule.isLoading)




    useEffect(()=>{
        loadToys()
    },[])

    function onToyRemove(toyId){
        return removeToy(toyId)
        .then(()=>{
            showSuccessMsg('Toy Removed ')
        })
        .catch(err =>{
            console.error("could not remove", err);
            showErrorMsg('could not remove toy')
        })
    }

    return (
        <section className="toys-index">
            <h3>toys index</h3>
            <ToyFilter />
            {(!isLoading &&<ToysList toys={toys} onToyRemove={onToyRemove} />)}
        </section>
    )
}