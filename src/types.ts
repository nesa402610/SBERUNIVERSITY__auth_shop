export interface IProduct {
  available: boolean
  pictures: string
  likes: string[]
  reviews: IProductReviews[]
  tags: string[]
  isPublished: boolean
  _id: string
  name: string
  author: IAuthor
  price: number
  discount: number
  stock: number
  wight: string
  description: string
  created_at?: string
  updated_at?: string
  __v?: number
}

export interface IProductReviews {
  author: string
  product: string
  rating: number
  text: string
  _id: string
}

export interface IAuthor {
  name: string
  about: string
  avatar: string
  _id: string
  email: string
  __v?: number
}

export interface IUser {
  name: string
  about: string | ''
  avatar: string
  _id: string
  email?: string
  __v?: number
}

export interface IPost {
  title: string
  text: string
  image: string
  tags: string[]
  likes: any
  comments: IPostComments[]
  isPublished?: boolean
  _id: string
  author: IUser
  created_at?: string
}

export interface IPostComments {
  author: string
  text: string
  _id: string
  updated_at: string
  created_at: string
}

export interface ICart {
  product: IProduct
  count: number
}