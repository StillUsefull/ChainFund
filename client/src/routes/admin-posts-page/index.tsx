import { useEffect, useState } from 'react';
import { Container, Pagination } from 'react-bootstrap';
import { BlogCard } from '@components/blog-card';
import { notifyError } from '@components/notifications';
import SidebarMenu from '@components/side-bar-menu';
import api from '@utils/api';
import { ToastContainer } from 'react-toastify';

export function AdminPostsPage() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchPosts(currentPage);
    }, [currentPage]);

    const fetchPosts = async (page) => {
        try {
            const response = await api.get(`/post/all?page=${page}&limit=10&sortBy=name&sortOrder=ASC`);
    
            setPosts(response.data.data); 
            setTotalPages(response.data.totalPages); 
        } catch (error) {
            console.error('Failed to load posts:', error);
            notifyError('Failed to load posts');
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <ToastContainer />
            <SidebarMenu />
            <Container style={{ marginLeft: '250px', padding: '20px' }}>
                <br />
                <div style={{ marginLeft: '50px' }}>
                    {posts.map((post) => (
                        <BlogCard key={post.id} post={post} admin={true} />
                    ))}
                </div>
                <Pagination className="justify-content-center">
                    {[...Array(totalPages).keys()].map(number => (
                        <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => handlePageChange(number + 1)}>
                            {number + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </Container>
        </>
    );
}
