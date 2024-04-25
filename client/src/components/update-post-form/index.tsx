import { BlogCard } from "@components/blog-card";
import { notifyError, notifySuccess } from "@components/notifications";
import api from "@utils/api";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

export function UpdatePostForm({ postId }) {
    const [postData, setPostData] = useState({
        title: '',
        text: '',
        socialLink: '',
        photo: '',
    });
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        const fetchPostData = async () => {
            setLoading(true);
            try {
                const response = await api.get(`/post/findOne/${postId}`);
                setPostData({
                    title: response.data.title || '',
                    text: response.data.text || '',
                    socialLink: response.data.socialLink || '',
                    photo: response.data.photo || '',
                });
                setLoading(false);
            } catch (err) {
                notifyError('Failed to fetch post details');
                console.error(err);
                setLoading(false);
            }
        };

        fetchPostData();
    }, [postId]);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        setFile(file);
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setPostData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (loading) return;

        const formData = new FormData();
        formData.append('title', postData.title);
        formData.append('text', postData.text);
        formData.append('socialLink', postData.socialLink);
        if (file) {
            formData.append('file', file, file.name);
        }

        try {
            setLoading(true);
            const response = await api.put(`/post/update/${postId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response)
            notifySuccess('Post updated successfully!');
            setLoading(false)
        } catch (err) {
            console.log(err);
            notifyError('Failed to update post');
            console.error(err);
            setLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <Container style={{ marginTop: '20px', fontFamily: 'cursive' }}>
                <h2>Update Post</h2>
                <BlogCard post={postData} admin={true} />
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" name="title" value={postData.title} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Text</Form.Label>
                        <Form.Control as="textarea" rows={3} name="text" value={postData.text} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Google Pay Link</Form.Label>
                        <Form.Control type="url" name="socialLink" value={postData.socialLink} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>File (.jpg only)</Form.Label>
                        <Form.Control type="file" onChange={handleFileChange} accept=".jpg" />
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? 'Updating...' : 'Update Post'}
                    </Button>
                </Form>
            </Container>
        </>
    );
}