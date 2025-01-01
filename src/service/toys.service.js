import { storageService } from "./async-storage.service"
import { utilService } from "./util.service"

export const toysService = {
    query,
    getById,
    remove,
    save,
    getEmptyToy,
    getRandomToy,
    getDefaultFilter,
    getFilterFromSearchParams,
    getLabelsList,
}

const STORAGE_KEY = 'toyDB'

export const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
    'Outdoor', 'Battery Powered']

_CreateToys()

function query(filterBy = {}){
    return storageService.query(STORAGE_KEY)
    .then((toys) => {
        let filteredToys = [...toys];
        if (filterBy.name) {
            const regExp = new RegExp(filterBy.name, "i");
            filteredToys = filteredToys.filter((toy) => regExp.test(toy.name));
        }

        if (filterBy.price) {
            filteredToys = filteredToys.filter((toy) => toy.price >= filterBy.price);
        }

        if (filterBy.inStock) {
            switch (filterBy.inStock) {
                case "In Stock":
                    filteredToys = filteredToys.filter((toy) => toy.inStock)
                    break;
                case "Out Of Stock":
                    filteredToys = filteredToys.filter((toy) => !toy.inStock)
                    break;
                default:
                    break;
            }
        }

        
        const sortOrder = filterBy.descending === "true" ? -1 : 1;

        if (filterBy.sortBy === "alphabet") {
            filteredToys.sort((a, b) => {
                if (!a.name || !b.name) return 0; // Handle missing names
                return sortOrder * a.name.localeCompare(b.name);
            });
        } else if (filterBy.sortBy === "price") {
            filteredToys.sort((a, b) => {
                const priceA = Number(a.price) || 0;
                const priceB = Number(b.price) || 0;
                return sortOrder * (priceA - priceB);
            });
        }

        return filteredToys;
    })
}

function getById(toyId){
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId){
    return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy){
    if (toy._id){
        return storageService.put(STORAGE_KEY, toy)
    }else {
        return storageService.post(STORAGE_KEY, toy)
    }
}



function getEmptyToy(){
    return {
        name: '',
        price: 0,
        labels:[],
        createdAt: Date.now(),
        inStock: true
    }
}

function getDefaultFilter(){
    return {
        name: '',
        price: 0,
        inStock: 'All',
        labels: [],
         sortBy:"none",
         descending: false 
    }
}

function getRandomToy(){
    return {
        _id: utilService.makeId(),
        name: utilService.makeLorem(1),
        price: (utilService.getRandomIntInclusive(1,8)*4+0.99),
        labels:utilService.getUniqueElements(3, labels),
        createdAt: Date.now(),
        inStock: true,
        msgs: [],
    }
}

function getLabelsList(){
    return labels
}

function getFilterFromSearchParams(searchParams) {
	const defaultFilter = getDefaultFilter()
	const filterBy = {}
	for (const field in defaultFilter) {		
		filterBy[field] = searchParams.get(field) || ""
	}
	return filterBy
}

export function serializeFilterParams(filter) {
    const params = new URLSearchParams();
    Object.keys(filter).forEach((key) => {
        const value = filter[key];
        if (Array.isArray(value)) {
            params.set(key, value.join(","));
        } else {
            params.set(key, value);
        }
    });
    return params.toString();
}

export function parseFilterParams(searchParams) {
    const params = new URLSearchParams(searchParams);
    const filter = {};
    params.forEach((value, key) => {
        if (key === "labels") {
            filter[key] = value.split(",");
        } else {
            filter[key] = value;
        }
    });
    return filter;
}

function _CreateToys(){
    let toys = utilService.loadFromStorage(STORAGE_KEY)

    if(!toys || !toys.length){
        toys =[
            getRandomToy(),
            getRandomToy(),
            getRandomToy(),
            getRandomToy(),
            getRandomToy(),
            getRandomToy(),
            getRandomToy(),
            getRandomToy(),
            getRandomToy(),
            getRandomToy(),
            getRandomToy(),
            getRandomToy(),
            getRandomToy(),
            getRandomToy(),
            getRandomToy(),
        ]
        utilService.saveToStorage(STORAGE_KEY, toys)
    }

}

