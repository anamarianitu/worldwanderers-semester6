import axios from "axios";

const API_URL = "http://35.204.225.66/api/likes";

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

    isPostLikedByUser(postId, userId) {
        return new Promise((resolve) => {
            axios
                .get(`${API_URL}/liked-by?postId=${postId}&userId=${userId}`)
                .then((response) => {
                    resolve(response.data);
                    console.log(response.data);
                })
                .catch(() => {
                    resolve(false);
                });
        });
    }

    addNewLike(postId, userId) {
        const newLike = { postId, userId };
        return new Promise((resolve) => {
            axios
                .post(`${API_URL}/add`, newLike)
                .then((response) => {
                    resolve(response.data);
                })
                .catch(() => {
                    resolve(null);
                });
        });
    }

    removeLike(postId, userId) {
        return new Promise((resolve) => {
            axios
                .delete(`${API_URL}/remove?postId=${postId}&userId=${userId}`)
                .then((response) => {
                    resolve(response.data);
                })
                .catch(() => {
                    resolve(null);
                });
        });
    }
}

export default new LikeService();
