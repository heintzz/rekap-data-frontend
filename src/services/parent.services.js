import api from 'configs/api';
import { getToken } from 'utils/auth';

const parentServices = {
  getParents: () => {
    return new Promise((resolve, reject) => {
      api
        .get('/parents', {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  addParentData: (value) => {
    return new Promise((resolve, reject) => {
      api
        .post(
          '/parents',
          { ...value },
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        )
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  addChildData: (value) => {
    return new Promise((resolve, reject) => {
      api
        .post(
          '/children',
          { ...value },
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        )
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default parentServices;
