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

  getGroupsJoinedByUser(userId) {
    return new Promise((resolve) => {
      axios
        .get(`${API_URL}/of-user?userId=${userId}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch(() => {
          resolve([]);
        });
    });
  }

  getGroupById(id) {
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

  addUserToGroup(userId, groupId) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${API_URL}/add-user-to-group`, null, {
          params: { groupId: groupId, userId: userId },
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

export default new GroupService();
