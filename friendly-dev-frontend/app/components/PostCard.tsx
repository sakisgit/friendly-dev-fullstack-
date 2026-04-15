
import { Link } from 'react-router';
import { formatDate } from '~/lib/formatDate';
import type { PostMeta } from '~/types';

const PostCard = ({ post }: { post: PostMeta }) => {
  return (
    <article key={post.slug} className='bg-gray-800 p-6 rounded-lg shadow'>
      <h3 className='text-2xl font-semibold text-blue-400'>{post.title}</h3>
      <p className='text-sm text-gray-400 mb-2'>
        {formatDate(post.date)}
      </p>
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className='w-full h-48 object-cover rounded mb-4'
        />
      )}
      <p className='text-gray-300 mb-4'>{post.excerpt}</p>
      <Link
        to={`/blog/${post.slug}`}
        className='text-blue-300 hover:underline text-sm'
      >
        Read More →
      </Link>
    </article>
  );
};

export default PostCard;