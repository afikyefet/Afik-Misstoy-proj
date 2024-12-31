export const SET_USER ="SET_USER"

const initialState = {
    user: null,
}



export function userReducer(state = initialState, cmd = {}){
    switch (cmd.type){
        case SET_USER:
            return {
                ...state,
                user: cmd.user
            }
        default:
            return state
    }
}