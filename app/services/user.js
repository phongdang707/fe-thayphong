import { callApiWithAuth } from './request';

const APIWithUser = {
  getProfile: params => {
    const url = 'users/profile';
    return callApiWithAuth(url, 'GET').then(res => res);
  },
};

export default APIWithUser;
