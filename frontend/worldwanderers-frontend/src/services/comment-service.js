import axios from "axios";

const API_URL = "http://35.204.225.66/api/comments";

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

  addNewComment(postId, userId, comment) {
    const newComment = { postId, userId, comment };
    return new Promise((resolve) => {
        axios
            .post(`${API_URL}/add`, newComment)
            .then((response) => {
                resolve(response.data);
            })
            .catch(() => {
                resolve(null);
            });
    });
    }
}

export default new CommentService();
