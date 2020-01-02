export function asyncReducer(state, action) {
    switch (action.type) {
        case 'LOADING':
            return {
                loading: true,
                error: null,
                data: null,
            };

        case 'SUCCESS':
            return {
                loading: false,
                error: null,
                data: action.data,
            };

        case 'ERROR':
            return {
                loading: false,
                error: action.error,
                data: null,
            };

        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};