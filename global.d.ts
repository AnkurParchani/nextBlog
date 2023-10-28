type Blog = {
  likes: number;
  title: string;
  content: string;
  isGlobal: boolean;
  comments: number;
  createdAt: string;
  _id: string;
  img: string;
  user: {
    name: string;
    email: string;
    img: string;
  };
};

type formattedDateType = {
  day: string;
  month: string;
  year: string;
};
