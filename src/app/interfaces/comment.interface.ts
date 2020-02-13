export interface IComment {
  _id: string;
  author: string;
  time: Date;
  text: string;
  sub_comments: any;
}