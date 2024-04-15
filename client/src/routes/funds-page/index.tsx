import { CashCollectionCard } from "@components/cash-collection-card";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { CreatorForm } from "@components/creator-form";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from "react-router";


export function FundPage() {
    const [collections, setCollections] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    let {category} = useParams()

    const title = {
        'military': 'Military Support',
        'health': 'Health and Medical',
        'development': 'Development and Open Source',
        'tech': 'Technology and Innovation',
        'eco': 'Environment and Conservation',
        'art': 'Arts and Culture'
    }
        
    

    useEffect(() => {
        loadMore();
    }, []);
        
    const loadMore = async () => {
        try {
            const nextPage = Math.floor(collections.length / 12) + 1;
                // if (category){
                    // const response = await axios.get(``); find by category
                // } else {
                //     const response = await axios.get(``) find all
                // }

            const response = {
                data: {
                    collections: [
                        {
                            id: '1234',
                            title: 'Cash Collection',
                            description: 'sampleDescription',
                            goal: '1000000',
                            category: 'Health',
                            photo: 'https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/b6ub4ptxggrje31cfjpp.jpg'
                        },
                        {
                            id: '1234',
                            title: 'Cash Collection',
                            description: 'sampleDescription',
                            goal: '1000000',
                            category: 'Health',
                            photo: 'https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/b6ub4ptxggrje31cfjpp.jpg'
                        },
                        {
                            id: '1234',
                            title: 'Cash Collection',
                            description: 'sampleDescription',
                            goal: '1000000',
                            category: 'Health',
                            photo: 'https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/b6ub4ptxggrje31cfjpp.jpg'
                        },
                        {
                            id: '1234',
                            title: 'Cash Collection',
                            description: 'sampleDescription',
                            goal: '1000000',
                            category: 'Health',
                            photo: 'https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/b6ub4ptxggrje31cfjpp.jpg'
                        },
                        {
                            id: '1234',
                            title: 'Cash Collection',
                            description: 'sampleDescription',
                            goal: '1000000',
                            category: 'Health',
                            photo: 'https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/b6ub4ptxggrje31cfjpp.jpg'
                        },
                        {
                            id: '1234',
                            title: 'Cash Collection',
                            description: 'sampleDescription',
                            goal: '1000000',
                            category: 'Health',
                            photo: 'https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/b6ub4ptxggrje31cfjpp.jpg'
                        },
                        {
                            id: '1234',
                            title: 'Cash Collection',
                            description: 'sampleDescription',
                            goal: '1000000',
                            category: 'Health',
                            photo: 'https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/b6ub4ptxggrje31cfjpp.jpg'
                        },
                        {
                            id: '1234',
                            title: 'Cash Collection',
                            description: 'sampleDescription',
                            goal: '1000000',
                            category: 'Health',
                            photo: 'https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/b6ub4ptxggrje31cfjpp.jpg'
                        },
                        {
                            id: '1234',
                            title: 'Cash Collection',
                            description: 'sampleDescription',
                            goal: '1000000',
                            category: 'Health',
                            photo: 'https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/b6ub4ptxggrje31cfjpp.jpg'
                        },
                        {
                            id: '1234',
                            title: 'Cash Collection',
                            description: 'sampleDescription',
                            goal: '1000000',
                            category: 'Health',
                            photo: 'https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/b6ub4ptxggrje31cfjpp.jpg'
                        },
                        {
                            id: '1234',
                            title: 'Cash Collection',
                            description: 'sampleDescription',
                            goal: '1000000',
                            category: 'Health',
                            photo: 'https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/b6ub4ptxggrje31cfjpp.jpg'
                        },
                        {
                            id: '1234',
                            title: 'Cash Collection',
                            description: 'sampleDescription',
                            goal: '1000000',
                            category: 'Health',
                            photo: 'https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/b6ub4ptxggrje31cfjpp.jpg'
                        },
                        {
                            id: '1234',
                            title: 'Cash Collection',
                            description: 'sampleDescription',
                            goal: '1000000',
                            category: 'Health',
                            photo: 'https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/b6ub4ptxggrje31cfjpp.jpg'
                        },
                        {
                            id: '1234',
                            title: 'Cash Collection',
                            description: 'sampleDescription',
                            goal: '1000000',
                            category: 'Health',
                            photo: 'https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/b6ub4ptxggrje31cfjpp.jpg'
                        },
                        {
                            id: '1234',
                            title: 'Cash Collection',
                            description: 'sampleDescription',
                            goal: '1000000',
                            category: 'Health',
                            photo: 'https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/b6ub4ptxggrje31cfjpp.jpg'
                        },
                        {
                            id: '1234',
                            title: 'Cash Collection',
                            description: 'sampleDescription',
                            goal: '1000000',
                            category: 'Health',
                            photo: 'https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/b6ub4ptxggrje31cfjpp.jpg'
                        },
                        {
                            id: '1234',
                            title: 'Cash Collection',
                            description: 'sampleDescription',
                            goal: '1000000',
                            category: 'Health',
                            photo: 'https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/b6ub4ptxggrje31cfjpp.jpg'
                        },
                        {
                            id: '1234',
                            title: 'Cash Collection',
                            description: 'sampleDescription',
                            goal: '1000000',
                            category: 'Health',
                            photo: 'https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/b6ub4ptxggrje31cfjpp.jpg'
                        },
                        {
                            id: '1234',
                            title: 'Cash Collection',
                            description: 'sampleDescription',
                            goal: '1000000',
                            category: 'Health',
                            photo: 'https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/b6ub4ptxggrje31cfjpp.jpg'
                        },
                        {
                            id: '1234',
                            title: 'Cash Collection',
                            description: 'sampleDescription',
                            goal: '1000000',
                            category: 'Health',
                            photo: 'https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/b6ub4ptxggrje31cfjpp.jpg'
                        },
                        {
                            id: '1234',
                            title: 'Cash Collection',
                            description: 'sampleDescription',
                            goal: '1000000',
                            category: 'Health',
                            photo: 'https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/b6ub4ptxggrje31cfjpp.jpg'
                        },
                        {
                            id: '1234',
                            title: 'Cash Collection',
                            description: 'sampleDescription',
                            goal: '1000000',
                            category: 'Health',
                            photo: 'https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/b6ub4ptxggrje31cfjpp.jpg'
                        },
                        {
                            id: '1234',
                            title: 'Cash Collection',
                            description: 'sampleDescription',
                            goal: '1000000',
                            category: 'Health',
                            photo: 'https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/b6ub4ptxggrje31cfjpp.jpg'
                        },
                        {
                            id: '1234',
                            title: 'Cash Collection',
                            description: 'sampleDescription',
                            goal: '1000000',
                            category: 'Health',
                            photo: 'https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/b6ub4ptxggrje31cfjpp.jpg'
                        }
                    ],
                    totalPages: 2
                }
               };
               setCollections(prev => [...prev, ...response.data.collections]);
               if (nextPage >= response.data.totalPages) {
                   setHasMore(false);
               }
           } catch (error) {
               console.error('Failed to fetch data:', error);
           }
       };


       return (
        <>
            <Container style={{width: '100%', padding: 0}}>
                <InfiniteScroll
                    dataLength={collections.length}
                    next={loadMore}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                    style={{ overflowX: 'hidden', width: '100%' }} 
                >
                    <h2 style={{color: '#2B3EFF', fontFamily: 'cursive', textAlign: 'center', fontSize: '80px', margin: '15px'}}>
                        {category ? `${title[category]}` : 'Founds'}
                    </h2>
                    <Row className="g-2"> 
                        {collections.map((collection, index) => (
                            <Col key={index} md={6} className="mb-4">
                                <CashCollectionCard
                                    id={collection.id}
                                    title={collection.title}
                                    description={collection.description}
                                    goal={collection.goal}
                                    category={collection.category}
                                    photo={collection.photo}
                                />
                            </Col>
                        ))}
                    </Row>
                </InfiniteScroll>
            </Container>
            <CreatorForm />
        </>
    );
}