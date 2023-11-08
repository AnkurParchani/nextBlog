type Blog = {
  likes: number;
  title: string;
  content: string;
  isGlobal: boolean;
  comments: number;
  createdAt: string;
  _id: string;
  img: string;
  user: User;
};

type Comment = {
  _id: string;
  isEdited: boolean;
  content: string;
  blog: string;
  user: string;
  createdAt: string;
};

type User = {
  _id: string;
  name: string;
  email: string;
  password?: string;
};

type formattedDateType = {
  day: string;
  month: string;
  year: string;
};
