import api from 'configs/api';
import { getToken } from 'utils/auth';

const childServices = {
  getChildren: async () => {
    return new Promise((resolve, reject) => {
      api
        .get('/children', {
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
  createChildRecord: async (data) => {
    return new Promise((resolve, reject) => {
      api
        .post(
          '/children/record',
          { ...data },
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

export default childServices;
