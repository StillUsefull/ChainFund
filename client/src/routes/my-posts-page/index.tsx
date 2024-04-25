
import { BlogCard } from "@components/blog-card";
import { CreatePostForm } from "@components/create-post-form";
import { notifyError } from "@components/notifications";
import SidebarMenu from "@components/side-bar-menu";
import api from "@utils/api";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";




export function MyPostsPage() {
    const [posts, setPosts] = useState([]);
    
    
    useEffect(() => {
        const fetchFundsData = async () => {
            try {
                const response = await api.get('/post/my');
                setPosts(response.data);
            } catch (err) {
                console.error(err);
                notifyError('Failed to load funds data');
            }
        };
        fetchFundsData();
    }, []);

    return (
        <>
            <ToastContainer />
            <SidebarMenu />
            <Container style={{ marginLeft: '250px', padding: '20px' }}>
                <CreatePostForm />
                <br />
                <div style={{marginLeft: '50px'}}>
                {posts && posts.map((post) => (
                        <BlogCard key={post.id} post={post} admin={true}/>
                    ))}
                </div>
                
            </Container>
        </>
    );
}