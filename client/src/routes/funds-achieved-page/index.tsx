import { useEffect, useState } from "react";
import { Col, Container, Row, Alert } from "react-bootstrap";
import { CashCollectionCard } from "@components/cash-collection-card";
import { CreatorForm } from "@components/creator-form";
import InfiniteScroll from 'react-infinite-scroll-component';
import api from "@utils/api";

export function FundsAchievedPage() {
    const [funds, setFunds] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        loadMore(1); 
    }, []);

    const loadMore = async (nextPage) => {
        try {
            const limit = 10;
            const response = await api.get(`/cash-collection/archive?page=${nextPage}&limit=${limit}&sortBy=name&sortOrder=ASC`);
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
                <h2 style={{ color: '#2B3EFF', fontFamily: 'cursive', textAlign: 'center', fontSize: '80px', margin: '15px' }}>
                    Achieved Funds
                </h2>
                {funds.length > 0 ? (
                    <InfiniteScroll
                        dataLength={funds.length}
                        next={() => loadMore(page)}
                        hasMore={hasMore}
                        loader={<></>}
                        style={{ overflowX: 'hidden', width: '100%' }}
                    >
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
                ) : (
                    <Alert variant="info" style={{ textAlign: 'center' }}>
                        No funds have been ended yet.
                    </Alert>
                )}
            </Container>
            <CreatorForm />
        </>
    );
}
