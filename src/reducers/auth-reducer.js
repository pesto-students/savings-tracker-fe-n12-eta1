const initialState = null;

export default function authReducer(state = initialState, action) {

    const {type, payload} = action;

    switch (type) {

        case 'AUTH': {
            return payload;
        }

        default:
            return state
    }
}