import api from 'configs/api';

const recordServices = {
  getRecord: (id) => {
    return new Promise((resolve, reject) => {
      api
        .get(`/records/${id}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getRecords: (query) => {
    return new Promise((resolve, reject) => {
      api
        .get('/records', {
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
  getRecordsByChildId: async (id) => {
    return new Promise((resolve, reject) => {
      api
        .get(`/records/child/${id}`)
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
        .post('/records', data)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  updateRecord: (id, data) => {
    return new Promise((resolve, reject) => {
      api
        .put(`/records/${id}`, data)
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
        .get('/records/grouped')
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
