/* eslint-disable react/prop-types */
// import { useState } from "react";
// import { toysService } from "../service/toys.service";

// export function LabelsDropdown({checkedLabels}){
//     const [labelList, setLabelList] = useState(toysService.getLabelsList())
//     const [isDropdown, setIsDropdown] = useState(false)
//     const [labelsObj, setLabelsObj] = useState(mapArrayToBoolean(labelList, checkedLabels))

//     function toggleDropdown(ev){
//         ev.preventDefault()
//         setIsDropdown(dropdown => dropdown = !dropdown)
//     }

//     function mapArrayToBoolean(labels, selectedItems) {
//         return labels.reduce((result, label) => {
//             result[label] = selectedItems.includes(label);
//             return result;
//         }, {});
//     }

//     return (
//         <button onClick={toggleDropdown}></button>
//         (isDropdown && <ul className="label-list">
//             {labelList.map(label=> {
//                 <li key={label}>
//                     <input type="checkbox" checked={labels.} />
//                 </li>
//             })}
//         </ul>)
//     )



// }

import  { useState } from "react";
import { useSelector } from "react-redux";

export function LabelsDropdown({ labels, onSelectionChange }) {
    const filterByLabels = useSelector(storeState => storeState.toyModule.filterBy.labels)
    const [selectedOptions, setSelectedOptions] = useState(filterByLabels);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = (ev) => {
        ev.preventDefault()
        setIsDropdownOpen((prev) => !prev);
    };

    const handleCheckboxChange = (label) => {
        setSelectedOptions((prevSelected) => {
            const isSelected = prevSelected.includes(label);
            const updatedSelection = isSelected
                ? prevSelected.filter((item) => item !== label)
                : [...prevSelected, label];

            // Update the parent state via callback
            onSelectionChange(updatedSelection);
            return updatedSelection;
        });
    }



    return (
        <div className="multi-select-dropdown">
            <button className="dropdown-button" onClick={toggleDropdown}>
                Select Options
            </button>
            {isDropdownOpen && (
                <div className="dropdown-menu">
                    {labels.map((label) => (
                        <label key={label} className="dropdown-item">
                            <input
                                type="checkbox"
                                checked={selectedOptions.includes(label)}
                                onChange={() => handleCheckboxChange(label)}
                            />
                            {label}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}