export interface Restaurant {
  _id: string,
  name: string,
  phoneNumber: number,
  images: {
    frontPage: string,
    miniature: string,
  },
  address: {
    street: string,
    postalCode: number,
    population: string,
    province: string,
  }
  price: {
    minPrice: number,
    maxPrice: number,
  },
  influencerScores: {
    foodTaste: number,
    decoration: number,
    service: number,
    priceQuality: number,
  },
  usersScores: {
    average: number,
    reviews: number,
    scores: [
      {
        userId: string,
        userScore: number
      }
    ]
  }
  influencerId: string,
  creatorId: string,
  lastModifiedId: string,
}
