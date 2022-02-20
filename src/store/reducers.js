
const initialState = {

    accessToken: null,
    user_details: {},
}

export default (state = initialState, action) => {
    switch (action.type) {

        case 'LOGIN':
            return {
                ...state, //copy all previous states
                accessToken: action.payload,
            }

        case 'LOGOUT':
            return {
                ...initialState,
                // or
                // accessToken: null,
            }
        default:
            return state;
    }
}