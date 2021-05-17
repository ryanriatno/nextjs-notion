import { useRouter } from 'next/router'
import { NotionRenderer } from 'react-notion'
import ErrorPage from 'next/error'
import Container from 'components/container'
import Header from 'components/header'
import PostHeader from 'components/post-header'
import Layout from 'components/Layout'
import getAllPosts from 'utils/getAllPosts'
import PostTitle from 'components/post-title'
import Head from 'next/head'
import { CMS_NAME } from 'lib/constants'
import PostType from '../../../types/post'
import Author from '../../../types/author'

type Props = {
  post: PostType
  author: Author,
  blocks: any
  preview?: boolean
}

const Post = ({ blocks, post, preview }: Props) => {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>
                  {post.title} | Next.js Blog Example with {CMS_NAME}
                </title>
                <meta property="og:image" content={post.coverImage[0].url} />
              </Head>
              <PostHeader
                title={post.title}
                coverImage={post.coverImage[0].url}
                date={post.date}
                author={post.author}
              />
              <div className="max-w-2xl mx-auto">
                <NotionRenderer blockMap={blocks} />
              </div>
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}

export default Post

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
  const { slug } = params
  const posts = await getAllPosts()
  const post = posts.find((p: PostType) => p.slug === slug)
  const author = post.author[0]

  const blocks = await fetch(`${process.env.NEXT_PUBLIC_API_URL}page/${post.id}`).then((res) => res.json());

  return {
    props: {
      blocks,
      post,
      author
    },
  }
}

export async function getStaticPaths() {
  const posts = await getAllPosts();
  return {
    paths: posts.map((posts: PostType) => {
      return {
        params: {
          slug: posts.slug
        }
      }
    }),
    fallback: true,
  }

}
