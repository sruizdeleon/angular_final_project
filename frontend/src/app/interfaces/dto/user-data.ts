export interface UserData {
  name: string;
  surname: string;
  phoneNumber: number;
  email: string;
  password: string;
  role: string;
  enabled: boolean;
  creatorId: string;
  lastModifiedId: string;
  favoriteFoods: [string];
  followedInfluencers: [string];
}
