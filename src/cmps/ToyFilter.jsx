import { useEffect, useRef, useState } from "react"
import { debounce } from "../service/util.service"

export function ToyFilter({filterBy, onSetFilterBy, onResetFilter}){
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const [filterByText, setFilterByText] = useState(filterBy?.name)
	
	const onSetFilterDebaunce = useRef(debounce(onSetFilterBy)).current

    useEffect(() => {
		onSetFilterDebaunce(filterByText)
	}, [filterByText])
    
    useEffect(() => {
		setFilterByToEdit(filterBy)
	}, [filterBy])

    function handleChange({ target }) {
		let { value, name: field } = target
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

		onSetFilterBy((prevFilter) => ({ ...prevFilter, [field]: value }))
	}

    function handleChangeText({ target }) {
		let { value, name: field } = target

		setFilterByText((prevFilter) => ({ ...prevFilter, [field]: value }))
	}

    return (
        <section className="toy-filter">filter
        <h1>Toy Filter</h1>
        <form>
            <label htmlFor="toy-name">name: <input value={filterByText} type="text" name="name" id="toy-name" onChange={handleChangeText} /></label>
        </form>
		<button className="btn-secondary" onClick={()=> onResetFilter()}>reset</button>
        </section>
    )
}