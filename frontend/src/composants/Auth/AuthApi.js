import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {getItem, addItem, removeItem} from './LocaleStorage'

export function hasAuthenticated() {
    const token = getItem('miniToken');
    const isValid = token ? tokenIsValid(token) : false;

    if (false === isValid){
        removeItem('miniToken')
        removeItem('userId')
    }

    return isValid;
}

export function login(credentials) {
    return axios
        .post('http://localhost:3000/api/auth/login', credentials)
        .then(response => response.data)
        .then(data => {
            addItem('miniToken', data.token);
            addItem('userId', data.userId);
            addItem('firstName', data.firstName);
            addItem('lastName', data.lastName);
            addItem('avatar', data.avatar);

            return true
        });
}

export function signup(credentials) {
    return axios
        .post('http://localhost:3000/api/auth/signup', credentials)
        .then(response => response)
}

export function logout() {
    removeItem('miniToken');
    removeItem('userId');
    removeItem('firstName');
    removeItem('lastName');
    removeItem('avatar');
}

function tokenIsValid(token) {
    const { exp } = jwtDecode(token)

    if (exp * 1000 > new Date().getTime()){
        return true
    }
    return false
}