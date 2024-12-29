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
}

const STORAGE_KEY = 'toyDB'

export const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
    'Outdoor', 'Battery Powered']

_CreateToys()

function query(){
    return storageService.query(STORAGE_KEY)
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
        labels: []
    }
}

function getRandomToy(){
    return {
        _id: utilService.makeId(),
        name: utilService.makeLorem(1),
        price: (utilService.getRandomIntInclusive(1,8)*4+0.99),
        labels:utilService.getUniqueElements(3, labels),
        createdAt: Date.now(),
        inStock: true
    }
}

function getFilterFromSearchParams(searchParams) {
	const defaultFilter = getDefaultFilter()
	const filterBy = {}
	for (const field in defaultFilter) {		
		filterBy[field] = searchParams.get(field) || ""
	}
	return filterBy
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

