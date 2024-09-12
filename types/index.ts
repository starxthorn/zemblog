export interface UserType {
  avatar?: string;
  name: string;
  email: string;
  password: string;
  blogs?: BlogPostType[] | null[];
}

export interface BlogPostType {
  _id?: string;
  title?: string;
  sub_heading?: string;
  category?: string;
  description?: string;
  image?: string;
  user?: UserType | null;
  route?: string;
}
