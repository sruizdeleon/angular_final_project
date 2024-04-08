export interface Influencer {
    _id: string;
    nickName: string;
    accountIG: string;
    description: string;
    subscribers: number;
    images: {
        logo: string;
        miniature: string;
        frontPage: string;
    };
    userId: string;
}
