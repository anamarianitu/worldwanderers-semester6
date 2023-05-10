import axios from "axios";

const API_URL = "http://localhost:8081/api/comments";

class CommentService {
    getAllCommentsByPostId(postId) {
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

  addNewComment(postId, userId) {

  }
}

export default new CommentService();
