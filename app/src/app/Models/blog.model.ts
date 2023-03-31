import { ObjectId } from 'mongodb';

export interface Blog {
  _id?: string;
  name: String;
  email: String;
  title: String;
  summery: String;
  blogImg?: Uint8Array;
  content: String;
  imgUrl?: String;
}
