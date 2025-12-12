export interface Comment {
  comment: string;
  image: string;
  username: string;
}

export type SimplePost = Omit<FullPost, 'comments'> & { comment: number };

export interface FullPost {
  id: string;
  username: string;
  userImage?: string;
  image: string;
  text: string;
  createdAt: string;
  likes: string[];
  comments: Comment[];
}
