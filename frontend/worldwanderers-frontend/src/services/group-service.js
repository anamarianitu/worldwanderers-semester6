import axios from "axios";

const API_URL = "http://35.204.225.66/api/groups";

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

  isGroupJoinedByUser(groupId, userId) {
    return new Promise((resolve) => {
        axios
            .get(`${API_URL}/user-joined?groupId=${groupId}&userId=${userId}`)
            .then((response) => {
                resolve(response.data);
                console.log(response.data);
            })
            .catch(() => {
                resolve(false);
            });
    });
}

  removeUserFromGroup(userId, groupId) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${API_URL}/remove-user-from-group`, {
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
