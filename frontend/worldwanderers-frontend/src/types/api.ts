export interface GroupEntity {
    id: string;
    destination_id: string,
    description: string,
    title: string,
    user_ids: string[]
}

export interface UserEntity {
    id: string;
    firstName: string,
    lastName: string,
    username: string,
    email: string,
}

export interface PostEntity {
    id: string;
    userId: string,
    groupId: string,
    description: string,
    created_at: Date,
    updated_at: Date
}

export interface Comment {
    id: string;
    userId: string;
    postId: string;
    comment: string;
}

export interface Like {
    id: string;
    userId: string;
    postId: string;
}
