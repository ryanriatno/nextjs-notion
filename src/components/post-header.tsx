import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import PostTitle from './post-title'
import Author from '../../types/author'

type Props = {
  title: string
  coverImage: string
  date: string
  author?: Author
}

const PostHeader = ({ title, coverImage, date, author }: Props) => {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
        {
          (author) ?
            <Avatar name={author.fullName} picture={author.profilePhoto} />
          : null
        }
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} />
      </div>
      <div className="max-w-2xl mx-auto">
        {
          (author) ?
            <div className="block md:hidden mb-6">
              <Avatar name={author.fullName} picture={author.profilePhoto} />
            </div>
            : null
        }
        <div className="mb-6 text-lg">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  )
}

export default PostHeader
