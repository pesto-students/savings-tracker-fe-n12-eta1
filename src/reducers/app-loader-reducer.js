const initialState = {APP_LOADING: true, PAGE_LOADING: false};

export default function appLoaderReducer(state = initialState, action) {

    const {type, payload} = action;

    switch (type) {

        case 'APP_LOADING': {
            return {...state, APP_LOADING: payload};
        }
        case 'PAGE_LOADING': {
            return {...state, PAGE_LOADING: payload};
        }

        default:
            return state
    }
}