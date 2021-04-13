import Author from './author'

type PostType = {
  slug: string
  title: string
  date: string
  coverImage: Array<{name: string, url: string, rawUrl: string}>
  author?: Author
  status: any
  excerpt: string
  ogImage: {
    url: string
  }
  content: string
}

export default PostType
