import Container from 'components/container'
import MoreStories from 'components/more-stories'
import Intro from 'components/intro'
import Layout from 'components/Layout'
import getAllPosts from 'utils/getAllPosts'
import Head from 'next/head'
import { CMS_NAME } from 'lib/constants'
import Post from '../../types/post'

type Props = {
  posts: Post[]
}

const Index = ({ posts }: Props) => {
  return (
    <>
      <Layout>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <Container>
          <Intro />
          {posts.length > 0 && <MoreStories posts={posts} />}
        </Container>
      </Layout>
    </>
  )
}

export default Index

export const getStaticProps = async () => {
  const posts = await getAllPosts()

  return {
    props: {
      posts
    },
    revalidate: 1
  }

}
