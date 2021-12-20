import axios from 'axios';

const instance = axios.create({
	baseURL: "https://menu-a4540.firebaseio.com/"
});

export default instance;


