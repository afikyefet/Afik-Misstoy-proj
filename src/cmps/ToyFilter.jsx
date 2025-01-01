/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react"
import { debounce } from "../service/util.service"
import { toysService } from "../service/toys.service"

export function ToyFilter({filterBy, onSetFilter, onResetFilter, setSearchParams}){
	const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
	onSetFilter = useRef(debounce(onSetFilter, 300))

	useEffect(() => {
		onSetFilter.current(filterByToEdit)	
		setSearchParams(filterByToEdit)
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

    // const handleSelectionChange = (selectedOptions) => {
    //     setFilterByToEdit((prevFilter) => ({
    //         ...prevFilter,
    //         labels: [...selectedOptions],
    //     }));
    // };


    function setFilterReset() {
        const defaultFilter = toysService.getDefaultFilter();
        setFilterByToEdit(defaultFilter);
        onResetFilter();
        setSearchParams(defaultFilter);
    }

	const {name, price, inStock, sortBy, descending} = filterByToEdit
	

    return (
        <section className="toy-filter">
		<form className="container">
                {/* Debounced text input */}
				<section className="filter">

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
				{/* <LabelsDropdown labels={toysService.getLabelsList()} */}
				{/* onSelectionChange={handleSelectionChange}
				/> */}
					</section>
					<section className="sort">

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
<label htmlFor="sort-by">Sort by:

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
					</label>
				<label htmlFor="descending">descending:</label>
				<input
					onChange={handleChange}
					checked={descending}
					value={descending}
					type="checkbox"
					name="descending"
					id="descending"
					/>
					</section>
            </form>
		<button className="reset btn-secondary" onClick={()=> setFilterReset()}>clear</button>
        </section>
    )
}