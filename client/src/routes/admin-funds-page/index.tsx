import { useEffect, useState } from 'react';
import { Container, Pagination } from 'react-bootstrap';
import { notifyError } from '@components/notifications';
import SidebarMenu from '@components/side-bar-menu';
import api from '@utils/api';
import { ToastContainer } from 'react-toastify';
import { CashCollectionCard } from '@components/cash-collection-card';

export function AdminFundsPage() {
    const [funds, setFunds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchPosts(currentPage);
    }, [currentPage]);

    const fetchPosts = async (page) => {
        try {
            const response = await api.get(`/cash-collection/all?page=${page}&limit=10&sortBy=name&sortOrder=ASC`);
            console.log(response)
            setFunds(response.data.data); 
            setTotalPages(response.data.totalPages); 
        } catch (error) {
            console.error('Failed to load funds:', error);
            notifyError('Failed to load funds');
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
                    {funds.map((fund) => (
                        <CashCollectionCard key={fund.id} fund={fund} admin={true} />
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
