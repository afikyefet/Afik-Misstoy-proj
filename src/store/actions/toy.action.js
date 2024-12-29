import { toysService } from "../../service/toys.service";
import { ADD_TOY, IS_LOADING, REDO_TOYS, REMOVE_TOY, SET_TOYS, UPDATE_TOY } from "../reducers/toy.reducer";
import { store } from "../store";

export function loadToys(){
    return toysService.query()
    .then(toys => {
        store.dispatch({type: SET_TOYS, toys})
    })
    .catch(err => {
        console.error('toys action -> could not load toys', err);
        throw err
    })
}

export function setIsLoading(isLoading){
    return store.dispatch({type: IS_LOADING, isLoading})
}

// export function addtoy(toy){
//     const type = toy._id ? UPDATE_TOY : ADD_TOY
// }

export function removeToy(toyId){
    return toysService.remove(toyId)
    .then(()=>{
        store.dispatch({type: REMOVE_TOY, toyId})
    }).catch(err =>{
        console.error('toy action -> could not delete toy ', err);
        throw err
    }
    )
}