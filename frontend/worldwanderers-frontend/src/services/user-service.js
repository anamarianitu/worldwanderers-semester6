import axios from "axios";

const API_URL = "http://localhost:8086/api/users";

class UserService {
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
}

export default new UserService();
