const initialState = true;

export default function appLoaderReducer(state = initialState, action) {

    const {type, payload} = action;

    switch (type) {

        case 'LOADING': {
            return payload;
        }

        default:
            return state
    }
}