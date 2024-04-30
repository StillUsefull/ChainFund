import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { CashCollectionCard } from "@components/cash-collection-card";
import { CreatorForm } from "@components/creator-form";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from "react-router";
import { categories } from "@utils/consts/categories";
import api from "@utils/api";

export function FundPage() {
    const [funds, setFunds] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    let { category } = useParams();

    useEffect(() => {
        loadMore(1); 
    }, [category]);

    const loadMore = async (nextPage) => {
        try {
            const limit = 10;
            const url = category ?
                `/cash-collection/category/${category.toUpperCase()}?page=${nextPage}&limit=${limit}&sortBy=name&sortOrder=ASC` :
                `/cash-collection?page=${nextPage}&limit=${limit}&sortBy=name&sortOrder=ASC`;

            const response = await api.get(url);
            if (nextPage === 1) {
                setFunds(response.data.data); 
            } else {
                setFunds(prev => [...prev, ...response.data.data]);
            }
            setPage(nextPage + 1);
            if (nextPage >= response.data.totalPages) {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    return (
        <>
            <Container style={{ width: '100%', padding: 0 }}>
                <InfiniteScroll
                    dataLength={funds.length}
                    next={() => loadMore(page)}
                    hasMore={hasMore}
                    loader={<></>}
                    style={{ overflowX: 'hidden', width: '100%' }}
                >
                    <h2 style={{ color: '#2B3EFF', fontFamily: 'cursive', textAlign: 'center', fontSize: '80px', margin: '15px' }}>
                        {category ? categories[category.toUpperCase()] : 'All Funds'}
                    </h2>
                    <Row className="g-2">
                        {funds.map((fund, index) => (
                            <Col key={index} md={6} className="mb-4">
                                <CashCollectionCard
                                    fund={fund}
                                    admin={false}
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
