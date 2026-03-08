export interface Comment {
  comment: string;
  image?: string | undefined;
  username: string;
}

export type SimplePost = Omit<FullPost, 'comments'> & { comments: number };

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
