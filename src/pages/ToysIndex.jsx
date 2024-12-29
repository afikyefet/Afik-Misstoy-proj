import { useEffect } from "react";
import { ToysList } from "../cmps/ToysList";
import { loadToys, removeToy, setFilterBy, setIsLoading } from "../store/actions/toy.action";
import { showErrorMsg, showSuccessMsg } from "../service/event-bus.service";
import { useSelector } from "react-redux";
import { ToyFilter } from "../cmps/ToyFilter";
import { Link, useSearchParams } from 'react-router-dom'
import { toysService } from "../service/toys.service";

export function ToysIndex(){

    const toys = useSelector(storeSelector => storeSelector.toyModule.toys)
    const isLoading = useSelector(storeSelector => storeSelector.toyModule.isLoading)
    const filterBy = useSelector(storeSelector => storeSelector.toyModule.filterBy)
    
    
	const [searchParams, setSearchParams] = useSearchParams()

    const defaultFilter = toysService.getFilterFromSearchParams(searchParams)
    
    
    
    useEffect(()=>{
        let isFilterSet = false
        
        
        if (!isFilterSet && JSON.stringify(filterBy) !== JSON.stringify(defaultFilter)) {
            setSearchParams(filterBy)
            isFilterSet = true
        }
        setIsLoading(true)
        loadToys(filterBy)
        .then(() => {
            showSuccessMsg("toys loaded successfully")
        })
        .catch((err) => {
            console.error("Error loading toys:", err)
            showErrorMsg("Cannot load toys")
        })
        .finally(setIsLoading(false))
        
    },[filterBy, setSearchParams])

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

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
        setSearchParams(filterBy)
    }

    function onResetFilter() {
		const NewDefaultFilter = toysService.getDefaultFilter();
		setFilterBy(NewDefaultFilter)
		setSearchParams(NewDefaultFilter)
	}

    if(isLoading) return <section className="toys-index">Loading...</section>
    return (
        <section className="toys-index">
            <h3>toys index</h3>
            <Link to="/toys/edit" ><button>Add Toy</button></Link>
            <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} onResetFilter={onResetFilter} />
            {(!isLoading &&<ToysList toys={toys} onToyRemove={onToyRemove} />)}
        </section>
    )
}