import { useEffect, useState } from 'react';

import Pagination from 'react-bootstrap/Pagination';
import { CreatorCard } from '@components/creator-card';
import { CreatorForm } from '@components/creator-form';
import api from '@utils/api';

export function CreatorPage() {
    const [creators, setCreators] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchCreators(currentPage);
    }, [currentPage]);

    const fetchCreators = async (page) => {
        try {
            const response = await api.get(`/user/creators?page=${page}&limit=10&sortBy=name&sortOrder=ASC`);
            
            setCreators(response.data.data); 
            setCurrentPage(response.data.currentPage); 
            setTotalPages(response.data.totalPages); 
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {creators.map((creator) => (
                    <CreatorCard key={creator.id} {...creator} />
                ))}
            </div>
            <Pagination className="justify-content-center">
                {[...Array(totalPages).keys()].map(number => (
                    <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => handlePageChange(number + 1)}>
                        {number + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
            <CreatorForm />
        </>
    );
}