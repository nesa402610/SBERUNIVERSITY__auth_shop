export interface IProduct {
  available: boolean
  pictures: string
  likes: string[]
  reviews: []
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
  comments?: []
  isPublished?: boolean
  _id: string
  author: IUser
  created_at?: string
}
