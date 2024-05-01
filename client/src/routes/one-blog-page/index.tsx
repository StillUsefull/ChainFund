import { CommentsSection } from "@components/comment-section";
import { CreatorCard } from "@components/creator-card";
import api from "@utils/api";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router";

export function OneBlogPage() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [creator, setCreator] = useState(null);

    useEffect(() => {
        const fetchFundData = async () => {
            try {
                const response = await api.get(`/post/findOne/${id}`);
                setPost(response.data);
                
                if (response.data.authorId) {
                    const creatorResponse = await api.get(`/user/getOne/${response.data.authorId}`);
                    setCreator(creatorResponse.data);
                }
            } catch (err) {
                console.error('Error fetching fund:', err);
            }
        };
        
        fetchFundData();
    }, [id]);

    return (
        <Container style={{ marginTop: '20px',  fontFamily: 'cursive', fontSize: '20px', color: '#2F45FF' }}>
            <Row className="justify-content-md-center">
                <Col xs={12} md={8}>
                    {post && (
                        <div>
                            <h1 style={{fontSize: '30px', textAlign: 'center'}}>{post.title}</h1>
                            <p>{post.text}</p>
                        </div>
                    )}
                </Col>
                <Col xs={12} md={4}>
                    {post && post.photo && (
                        <img src={post.photo} alt="Post" style={{ width: '100%', height: 'auto', maxWidth: '650px' }} /> 
                    )}
                    {creator && (
                        <CreatorCard {...creator} />
                    )}
                </Col>
            </Row>
            <CommentsSection collectionId={id}/>
        </Container>
    );
}
