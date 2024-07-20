import api from 'configs/api';

const summaryServices = {
  getSummary: async () => {
    return new Promise((resolve, reject) => {
      api
        .get('/summary')
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default summaryServices;
