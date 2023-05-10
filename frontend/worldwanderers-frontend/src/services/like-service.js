import axios from "axios";

const API_URL = "http://localhost:8081/api/likes";

class LikeService {
    getAllLikesByPostId(postId) {
    return new Promise((resolve) => {
      axios
        .get(`${API_URL}/post/${postId}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch(() => {
          resolve([]);
        });
    });
  }

  addNewLike(postId, userId) {

  }
}

export default new LikeService();
