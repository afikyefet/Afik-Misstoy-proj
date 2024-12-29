/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { loadToys, saveToy, setIsLoading, setSelectedToy } from "../store/actions/toy.action"
import { showErrorMsg, showSuccessMsg } from "../service/event-bus.service"
import { toysService } from "../service/toys.service"


export function ToyEdit(){
	
    const toy = useSelector((storeState) => storeState.toyModule.selectedToy)
    const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)
    const navigate = useNavigate()
    const params = useParams()
    const [toyToEdit, setToyToEdit] = useState({})
    const [labels, setLabels] = useState(toy?.labels || [])

    useEffect(()=>{
        if(params.toyId){
            setIsLoading(true)
            setSelectedToy(params.toyId)
            loadToys()
            .catch(err => {
                console.error('Could not load toy', err);
                navigate(-1)
            })
            .finally(()=> setIsLoading(false))
        }else{
            setToyToEdit(toyToEdit => (toyToEdit = toysService.getEmptyToy()))
        }
    },[params.toyId])

    useEffect(() => {
        if (toy) {
            setToyToEdit({ ...toy });
            setLabels(toy.labels || []);
        }
    }, [toy]);

    function handleLabelsChange({target}){
		let value = target.value

        const updatedLabels = value.split(',')
        setLabels(updatedLabels)
    }

    function handleChange({ target }) {
		const field = target.name
		let value = target.value

		switch (target.type) {
			case "number":
			case "range":
				value = +value || ""
				break

			case "checkbox":
				value = target.checked
				break

			default:
				break
		}

		setToyToEdit((prevTodo) => ({ ...prevTodo, [field]: value }))
	}

    function onSaveToy(ev){
		ev.preventDefault()        
        setIsLoading(true)
        const updatedToy = { ...toyToEdit, labels };
        saveToy(updatedToy)
        .then(() => {
            navigate("/toys")
            console.log('toy successful saved');
            // showSuccessMsg('Toy saved ', savedToy.name)
        })
        .catch(err=>{
            console.error('could not save toy', err);
        })
        .finally(() => setIsLoading(false))
    }
    
    const {name, price, inStock} = toyToEdit

    if(isLoading) return <div className="toy-edit container"> Loading...</div>
    return (
        <section className="toy-edit container">
            <div className="toy-img"><img alt="Toy picture" src="https://pl.nice-cdn.com/upload/image/product/large/default/toy-place-bear-100cm-1-st-819856-en.jpg" /></div>
            <form className="toy-form">
            <label htmlFor="toy-name" className="toy-name">
                Toy name: <input value={name} onChange={handleChange} type="text" name="name" id="toy-name" />
            </label>
            <label htmlFor="toy-price" className="toy-price">
                Toy price: <input value={price} onChange={handleChange} type="number" name="price" id="toy-price" />
            </label>
            <label htmlFor="toy-labels" className="toy-labels">
                Toy labels: <input value={labels} onChange={handleLabelsChange} type="text" name="labels" id="toy-labels" />
            </label>
            <label htmlFor="toy-stock" className="toy-stock">
                Toy is in stock: <input value={inStock} onChange={handleChange} checked={!!inStock} type="checkbox" name="inStock" id="toy-stock" />
            </label>
            </form>
            <button onClick={onSaveToy}  className="btn-main save">Save</button>
        </section>
    )
}