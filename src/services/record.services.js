import api from 'configs/api';
import { getToken } from 'utils/auth';

const recordServices = {
  getRecords: (query) => {
    return new Promise((resolve, reject) => {
      api
        .get('/records', {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
          params: query,
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  createRecord: (data) => {
    return new Promise((resolve, reject) => {
      api
        .post('/records', data, {
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
  getGroupedDates: () => {
    return new Promise((resolve, reject) => {
      api
        .get('/records/grouped', {
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
};

export default recordServices;
