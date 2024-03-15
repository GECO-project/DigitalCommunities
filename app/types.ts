export interface Event {
    id: number;
    title: string;
    description: string;
    community_id: string;
    community_name: string;
    date: string;
    address: string;
  }

export interface User {
    id: number;
    name: string;
    location: string;
}

export interface Community {
  id: number;
  name: string;
  address: string;
}