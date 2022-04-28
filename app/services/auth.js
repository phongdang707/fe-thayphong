import { callApi, callApiWithAuth } from './request';
import axios from 'axios';

export const getProfile = (rest ,token) => {
  axios.get('http://localhost:5000/api/users/profile', {
      headers:{
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: token,
      }
    })
    .then(function (response) {
      if (rest.permission.includes(response.data.permission) === true) {
        // console.log('true',response);
        return true;
      }
      // console.log('false');
      return false;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    })

};
