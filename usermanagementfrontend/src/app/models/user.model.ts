export interface User {
  id?: number;
  name: string;
  mobile: string;
  email: string;
  gender: string;
  city: string;
  rolesInterested: string[];
  username: string;
  password?: string;
  createdAt?: string;
}
