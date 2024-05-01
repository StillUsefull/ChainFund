import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "@utils/api";
import { Card, Row, Col, Image, Container } from "react-bootstrap";
import { BlogCard } from "@components/blog-card";
import { CashCollectionCard } from "@components/cash-collection-card";


export function OneCreatorPage() {
    const { id } = useParams();
    const [creator, setCreator] = useState(null);
    const [posts, setPosts] = useState([]);
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        fetchCreator();
        fetchPostsAndCollections();
    }, [id]);

    const fetchCreator = async () => {
        try {
            const response = await api.get(`/user/getOne/${id}`);
            setCreator(response.data);
        } catch (error) {
            console.error('Failed to fetch creator data:', error);
        }
    };

    const fetchPostsAndCollections = async () => {
        try {
            const postsResponse = await api.get(`/post/byCreator/${id}`);
            const collectionsResponse = await api.get(`/cash-collection/byCreator/${id}`);
            setPosts(postsResponse.data);
            setCollections(collectionsResponse.data);
        } catch (error) {
            console.error('Failed to fetch posts and collections:', error);
        }
    };

    return (
        <Container>
            {creator && (
                <Card className="mb-4" style={{marginTop: '10px', fontFamily: 'cursive'}}>
                    <Card.Body>
                        <Row>
                            <Col md={4} className="text-center">
                                <Image src={creator.photo} roundedCircle style={{ width: '150px', height: '150px' }} />
                            </Col>
                            <Col md={8}>
                                <h3>{creator.name}</h3>
                                <p>{creator.semi}</p>
                                <p>Telegram: {creator.telegram}</p>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            )}
            <Row>
                <Col md={6}>
                    <h4 style={{fontFamily: 'cursive'}}>Posts</h4>
                    {posts.map(post => (
                        <BlogCard key={post.id} post={post} admin={false}/>
                    ))}
                </Col>
                <Col md={6}>
                    <h4 style={{fontFamily: 'cursive'}}>Collections</h4>
                    {collections.map(collection => (
                        <CashCollectionCard key={collection.id} fund={collection} admin={false}/>
                    ))}
                </Col>
            </Row>
        </Container>
    );
}