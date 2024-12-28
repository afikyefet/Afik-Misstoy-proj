import { storageService } from "./async-storage.service"
import { utilService } from "./util.service"

const STORAGE_KEY = 'toyDB'

const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
    'Outdoor', 'Battery Powered']

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

function getRandomToy(){
    return {
        name: utilService.makeLorem(2),
        price: utilService.getRandomIntInclusive(10,100),
        labels:utilService.getUniqueElements(3, labels),
        createdAt: Date.now(),
        inStock: true
    }
}

