import { BlogCard } from '@components/blog-card';
import api from '@utils/api';
import { useState, useEffect, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

export function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const fetchPosts = useCallback(async () => {
    try {
      const response = await api.get(`/post?page=${page}&limit=10&sortBy=createdAt&sortOrder=DESC`);
      const newPosts = response.data.data;

      setPosts(prevPosts => {
        const updatedPosts = newPosts.filter(newPost => !prevPosts.find(post => post.id === newPost.id));
        return [...prevPosts, ...updatedPosts];
      });
      setHasMore(newPosts.length === 10);
      setPage(prevPage => prevPage + 1); 
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      setHasMore(false);
    }
  }, [page]);  

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchPosts}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        style={{ overflow: 'hidden' }}
      >
        {posts.map((post) => (
          <div key={post.id} style={{ width: '100%', padding: '40px' }}>
            <BlogCard post={post} admin={false}/>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}
