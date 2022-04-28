import axios from 'axios';

const Http = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/',
});

export default Http;