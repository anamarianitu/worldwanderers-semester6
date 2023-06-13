import axios from "axios";

const API_URL = "http://35.204.225.66/api/posts";
const EXPORT_API_URL = "http://35.204.225.66/api/export";


class PostService {
  getAllPostOfUser(userId) {
    return new Promise((resolve) => {
      axios
        .get(`${API_URL}/user/${userId}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch(() => {
          resolve([]);
        });
    });
  }
  getAllPosts() {
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

    getAllPostsFromGroup(groupId) {
    return new Promise((resolve) => {
      axios
        .get(`${API_URL}/group/${groupId}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch(() => {
          resolve([]);
        });
    });
  }

  getPostById(id) {
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

  addNewPost(userId, description, groupId) {
    const newPost = { userId, description, groupId };
    return new Promise((resolve) => {
        axios
            .post(`${API_URL}/add`, newPost)
            .then((response) => {
                resolve(response.data);
            })
            .catch(() => {
                resolve(null);
            });
    });
    }
    exportCsvData = (userId) => {
      return new Promise((resolve) => {
        axios
          .get(`${EXPORT_API_URL}/user/${userId}`)
          .then((response) => {
            resolve(response.data);
          })
          .catch(() => {
            resolve(null);
          });
      });
    };

}

export default new PostService();
