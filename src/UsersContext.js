import React, { createContext, useReducer, useContext } from 'react';
import createAsyncDispatcher from "./asyncActionUtils";
import * as api from './api';

const initialState = {
    users: {
        loading: false,
        data: null,
        error: null,
    },
    user: {
        loading: false,
        data: null,
        error: null
    }
}

const loadingState = {
    loading: true,
    data: null,
    error: null
};

const success = data => {
    return {
        loading: false,
        data,
        error: null
    }
};

const error = (error) => {
    return {
        loading: false,
        data: null,
        error: error
    };
};

function usersReducer (state, action) {
    switch(action.type) {
        case 'GET_USERS':
            return {
                ...state,
                users: loadingState
            };

        case 'GET_USERS_SUCCESS':
            return {
                ...state,
                users: success(action.data)
            };

        case 'GET_USERS_ERROR':
            return {
                ...state,
                users: error(action.error)
            };

        case 'GET_USER':
            return {
                ...state,
                user : loadingState
            };

        case 'GET_USER_SUCCESS':
            return {
                ...state,
                user: success(action.data)
            };

        case 'GET_USER_ERROR':
            return {
                ...state,
                user: error(action.error)
            };

        default:
            console.log(`Unhandled action type: ${action.type}`);
    }
}

const UsersStateContext = createContext(null);
const UsersDispatchContext = createContext(null);

export function UsersProvider({ children }) {
    const [state, dispatch] = useReducer(usersReducer, initialState);
    return (
        <UsersStateContext.Provider value={state}>
            <UsersDispatchContext.Provider value={dispatch}>
                {children}
            </UsersDispatchContext.Provider>
        </UsersStateContext.Provider>
    );
}

export function useUsersState() {
    const state = useContext(UsersStateContext);

    if (!state) {
        throw new Error('Cannot find UsersStateContext');
    }

    return state;
}

export function useUsersDispatch() {
    const dispatch = useContext(UsersDispatchContext);

    if (!dispatch) {
        throw new Error('Cannot find UsersDispatchContext');
    }

    return dispatch;
}

export const getUsers = createAsyncDispatcher('GET_USERS', api.getUsers);
export const getUser = createAsyncDispatcher('GET_USER', api.getUser);