import api from 'configs/api';
import Cookies from 'js-cookie';
import { getToken } from 'utils/auth';

const userServices = {
  userLogin: (value) => {
    return new Promise((resolve, reject) => {
      api
        .post('/auth/login', { ...value })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  userRegister: (value) => {
    return new Promise((resolve, reject) => {
      api
        .post('/auth/register', { ...value })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getUserData: () => {
    return new Promise((resolve, reject) => {
      api
        .get('/auth/profile', {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        .then((response) => {
          const { data } = response.data;
          const user = {
            id: data._id,
            nama: data.nama,
            peran: data.peran,
          };
          Cookies.set('user', JSON.stringify(user));
          resolve(user);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default userServices;
