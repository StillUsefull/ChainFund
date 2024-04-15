import { BlogCard } from '@components/blog-card';
import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';


export function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  
  const fetchPosts = async () => {
    try {
      
    //  const nextPage = posts.length / 10 + 1;
    //   const response = await fetch(`https://example.com/api/posts?page=${nextPage}`);
    //   const newPosts = await response.json();
    const newPosts = [
        {
            id: "1",
            title: "Post Title 1",
            text: "This is a sample text for post 1, containing enough details to be truncated in the UI display. This is a sample text for post 1, containing enough details to be truncated in the UI display. This is a sample text for post 1, containing enough details to be truncated in the UI display. This is a sample text for post 1, containing enough details to be truncated in the UI display.",
            socialLink: "https://google.com",
            photo: "https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/yowwspibhepn3u1xo6o8.jpg"
        },
        {
            id: "2",
            title: "Post Title 2",
            text: "This is a sample text for post 2, containing enough details to be truncated in the UI display.",
            socialLink: "https://social-link.com/post2",
            photo: "https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/yowwspibhepn3u1xo6o8.jpg"
        },
        {
            id: "3",
            title: "Post Title 3",
            text: "This is a sample text for post 3, containing enough details to be truncated in the UI display.",
            socialLink: "https://social-link.com/post3",
            photo: "https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/yowwspibhepn3u1xo6o8.jpg"
        },
        {
            id: "1",
            title: "Post Title 1",
            text: "This is a sample text for post 1, containing enough details to be truncated in the UI display.",
            socialLink: "https://social-link.com/post1",
            photo: "https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/yowwspibhepn3u1xo6o8.jpg"
        },
        {
            id: "2",
            title: "Post Title 2",
            text: "This is a sample text for post 2, containing enough details to be truncated in the UI display.",
            socialLink: "https://social-link.com/post2",
            photo: "https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/yowwspibhepn3u1xo6o8.jpg"
        },
        {
            id: "3",
            title: "Post Title 3",
            text: "This is a sample text for post 3, containing enough details to be truncated in the UI display.",
            socialLink: "https://social-link.com/post3",
            photo: "https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/yowwspibhepn3u1xo6o8.jpg"
        },
        {
            id: "1",
            title: "Post Title 1",
            text: "This is a sample text for post 1, containing enough details to be truncated in the UI display.",
            socialLink: "https://social-link.com/post1",
            photo: "https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/yowwspibhepn3u1xo6o8.jpg"
        },
        {
            id: "2",
            title: "Post Title 2",
            text: "This is a sample text for post 2, containing enough details to be truncated in the UI display.",
            socialLink: "https://social-link.com/post2",
            photo: "https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/yowwspibhepn3u1xo6o8.jpg"
        },
        {
            id: "3",
            title: "Post Title 3",
            text: "This is a sample text for post 3, containing enough details to be truncated in the UI display.",
            socialLink: "https://social-link.com/post3",
            photo: "https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/yowwspibhepn3u1xo6o8.jpg"
        },
        {
            id: "1",
            title: "Post Title 1",
            text: "This is a sample text for post 1, containing enough details to be truncated in the UI display.",
            socialLink: "https://social-link.com/post1",
            photo: "https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/yowwspibhepn3u1xo6o8.jpg"
        },
        {
            id: "2",
            title: "Post Title 2",
            text: "This is a sample text for post 2, containing enough details to be truncated in the UI display.",
            socialLink: "https://social-link.com/post2",
            photo: "https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/yowwspibhepn3u1xo6o8.jpg"
        },
        {
            id: "3",
            title: "Post Title 3",
            text: "This is a sample text for post 3, containing enough details to be truncated in the UI display.",
            socialLink: "https://social-link.com/post3",
            photo: "https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/yowwspibhepn3u1xo6o8.jpg"
        },
        {
            id: "1",
            title: "Post Title 1",
            text: "This is a sample text for post 1, containing enough details to be truncated in the UI display.",
            socialLink: "https://social-link.com/post1",
            photo: "https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/yowwspibhepn3u1xo6o8.jpg"
        },
        {
            id: "2",
            title: "Post Title 2",
            text: "This is a sample text for post 2, containing enough details to be truncated in the UI display.",
            socialLink: "https://social-link.com/post2",
            photo: "https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/yowwspibhepn3u1xo6o8.jpg"
        },
        {
            id: "3",
            title: "Post Title 3",
            text: "This is a sample text for post 3, containing enough details to be truncated in the UI display.",
            socialLink: "https://social-link.com/post3",
            photo: "https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/yowwspibhepn3u1xo6o8.jpg"
        },
        {
            id: "1",
            title: "Post Title 1",
            text: "This is a sample text for post 1, containing enough details to be truncated in the UI display.",
            socialLink: "https://social-link.com/post1",
            photo: "https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/yowwspibhepn3u1xo6o8.jpg"
        },
        {
            id: "2",
            title: "Post Title 2",
            text: "This is a sample text for post 2, containing enough details to be truncated in the UI display.",
            socialLink: "https://social-link.com/post2",
            photo: "https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/yowwspibhepn3u1xo6o8.jpg"
        },
        {
            id: "3",
            title: "Post Title 3",
            text: "This is a sample text for post 3, containing enough details to be truncated in the UI display.",
            socialLink: "https://social-link.com/post3",
            photo: "https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/yowwspibhepn3u1xo6o8.jpg"
        },
        
    ];
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setHasMore(newPosts.length > 0);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      setHasMore(false); 
    }
  };

  
  useEffect(() => {
    fetchPosts();
  }, []);

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
            <BlogCard post={post} />
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}