import axios from "axios";

const API_URL = "http://localhost:8087/api/groups";

class GroupService {
  getAllGroups() {
    return new Promise((resolve) => {
      axios
        .get(`${API_URL}/`)
        .then((response) => {
          resolve(response.data);
        })
        .catch(() => {
          resolve([]);
        });
    });
  }

  getGroupsFromUser(user_id) {
    return new Promise((resolve) => {
      axios
        .get(`${API_URL}/${user_id}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch(() => {
          resolve([]);
        });
    });
  }
}

export default new GroupService();
