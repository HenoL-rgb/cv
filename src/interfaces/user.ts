export interface user {
  email: string;
  id: string;
  profile: profile;
  department: department;
  position: position;
}

export interface profile {
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface department {
  name: string;
}

export interface position {
  name: string;
}
