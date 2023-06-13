import axios from "axios";

const API_URL = "http://35.204.225.66/api/users";

class UserService {
  getAllUsers(sort) {
    return new Promise((resolve) => {
      axios
        .get(`${API_URL}/?sort=${sort}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch(() => {
          resolve([]);
        });
    });
  }

  getUserById(id) {
    return new Promise((resolve) => {
      axios
        .get(`${API_URL}/${id}`, { params: { id: id } })
        .then((response) => {
          resolve(response.data);
        })
        .catch(() => {
          resolve(null);
        });
    });
  }

  getGroupsFromUser(user_id) {
    return new Promise((resolve) => {
      axios
        .get(`${API_URL}/groups/${user_id}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch(() => {
          resolve([]);
        });
    });
  }

    deleteUser(id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${API_URL}/delete/${id}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  updateUserById(id, firstName, lastName, email, username) {
    return new Promise((resolve, reject) => {
      axios
        .put(`${API_URL}/${id}/update`, null, {
          params: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: username,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

export default new UserService();
