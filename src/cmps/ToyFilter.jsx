/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react"
import { debounce } from "../service/util.service"

export function ToyFilter({filterBy, onSetFilter, onResetFilter}){
	const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
	const onSetFilterDebaunce = useRef(debounce(onSetFilter)).current

	useEffect(() => {
		onSetFilterDebaunce(filterByToEdit)
	}, [filterByToEdit])


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

		setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
	}

	const {name, price, inStock, sortBy, descending} = filterByToEdit
	

    return (
        <section className="toy-filter">filter
        <h1>Toy Filter</h1>
		<form>
                {/* Debounced text input */}
                <label htmlFor="toy-name">
                    Name:
                    <input
                        value={name}
                        type="text"
                        name="name"
                        id="toy-name"
                        onChange={handleChange}
                    />
                </label>

                {/* Other inputs with immediate updates */}
                <label htmlFor="toy-price">
                    Price:
                    <input
                        value={price}
                        type="number"
                        name="price"
                        id="toy-price"
						min={0}
                        onChange={handleChange}
                    />
                </label>
				<label htmlFor="toy-stock">
   				 In Stock:
  				  <select
   				     value={inStock || "All"}
     				   name="inStock"
     				   id="toy-stock"
      				  onChange={handleChange}
   					 >
        <option value="All">All</option>
        <option value="In Stock">In Stock</option>
        <option value="Out Of Stock">Out Of Stock</option>
    </select>
</label>
<label htmlFor="sort-by">Sort by:</label>
				<select
				name="sortBy"
				id="sort-by"
				value={sortBy}
				onChange={handleChange}
				>
					<option name="none" id="none">none</option>
					<option name="price" id="price">price </option>
					<option name="alphabet" id="alphabet">alphabet</option>
				</select>
				<label htmlFor="descending">descending:</label>
				<input
					onChange={handleChange}
					checked={!!descending}
					value={descending}
					type="checkbox"
					name="descending"
					id="descending"
				/>
            </form>
		<button className="btn-secondary" onClick={()=> onResetFilter()}>reset</button>
        </section>
    )
}