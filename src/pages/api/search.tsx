import Fuse from 'fuse.js'
import getAllPosts from 'utils/getAllPosts'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { keyword } = req.query
  const options = {
    keys: [
      "title",
      "excerpt",
      "slug"
    ]
  }
  const posts = await getAllPosts()
  const fuse = new Fuse(posts, options)

  res.status(200).json(fuse.search(keyword.toString()))
}
