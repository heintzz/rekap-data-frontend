import api from 'configs/api';

const childServices = {
  getChild: async (id) => {
    return new Promise((resolve, reject) => {
      api
        .get(`/children/${id}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  updateChildData: async (id, data) => {
    return new Promise((resolve, reject) => {
      api
        .put(`/children/${id}`, { ...data })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getChildren: async () => {
    return new Promise((resolve, reject) => {
      api
        .get('/children')
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getChildrenByParentId: async (id) => {
    return new Promise((resolve, reject) => {
      api
        .get(`/children/parent/${id}`)
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
        .post('/children/record', { ...data })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  deleteChild: async (id) => {
    return new Promise((resolve, reject) => {
      api
        .delete(`/children/${id}`)
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
