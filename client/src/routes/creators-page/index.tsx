import { useEffect, useState } from 'react';

import Pagination from 'react-bootstrap/Pagination';
import { CreatorCard } from '@components/creator-card';
import { CreatorForm } from '@components/creator-form';

export function CreatorPage() {
    const [creators, setCreators] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchCreators(currentPage);
    }, [currentPage]);

    const fetchCreators = async (page) => {
        try {
           // const response = await axios.get(``);
           const response = {
            creators: [
                {
                    id: "1234",
                    name: "Billy Herrington",
                    semi: "Boss of The Gym",
                    photo: "https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/b6ub4ptxggrje31cfjpp.jpg"
                },
                {
                    id: "5678",
                    name: "Ricardo Milos",
                    semi: "Dance Master",
                    photo: "https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/umpcemhcewhbtaa60j2k.jpg"
                },
                {
                    id: "91011",
                    name: "Van Darkholme",
                    semi: "Dungeon Master",
                    photo: "https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/hf3j3vrnu2z5pbjrcwfp.jpg"
                },
                {
                    id: "1234",
                    name: "Billy Herrington",
                    semi: "Boss of The Gym",
                    photo: "https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/b6ub4ptxggrje31cfjpp.jpg"
                },
                {
                    id: "5678",
                    name: "Ricardo Milos",
                    semi: "Dance Master",
                    photo: "https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/umpcemhcewhbtaa60j2k.jpg"
                },
                {
                    id: "91011",
                    name: "Van Darkholme",
                    semi: "Dungeon Master",
                    photo: "https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/hf3j3vrnu2z5pbjrcwfp.jpg"
                },
                {
                    id: "1234",
                    name: "Billy Herrington",
                    semi: "Boss of The Gym",
                    photo: "https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/b6ub4ptxggrje31cfjpp.jpg"
                },
                {
                    id: "5678",
                    name: "Ricardo Milos",
                    semi: "Dance Master",
                    photo: "https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/umpcemhcewhbtaa60j2k.jpg"
                },
                {
                    id: "91011",
                    name: "Van Darkholme",
                    semi: "Dungeon Master",
                    photo: "https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/hf3j3vrnu2z5pbjrcwfp.jpg"
                },
                {
                    id: "1234",
                    name: "Billy Herrington",
                    semi: "Boss of The Gym",
                    photo: "https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/b6ub4ptxggrje31cfjpp.jpg"
                },
                {
                    id: "5678",
                    name: "Ricardo Milos",
                    semi: "Dance Master",
                    photo: "https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/umpcemhcewhbtaa60j2k.jpg"
                },
                {
                    id: "91011",
                    name: "Van Darkholme",
                    semi: "Dungeon Master",
                    photo: "https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/hf3j3vrnu2z5pbjrcwfp.jpg"
                },{
                    id: "1234",
                    name: "Billy Herrington",
                    semi: "Boss of The Gym",
                    photo: "https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/b6ub4ptxggrje31cfjpp.jpg"
                },
                {
                    id: "5678",
                    name: "Ricardo Milos",
                    semi: "Dance Master",
                    photo: "https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/umpcemhcewhbtaa60j2k.jpg"
                },
                {
                    id: "91011",
                    name: "Van Darkholme",
                    semi: "Dungeon Master",
                    photo: "https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/hf3j3vrnu2z5pbjrcwfp.jpg"
                },
                {
                    id: "1234",
                    name: "Billy Herrington",
                    semi: "Boss of The Gym",
                    photo: "https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/b6ub4ptxggrje31cfjpp.jpg"
                },
                {
                    id: "5678",
                    name: "Ricardo Milos",
                    semi: "Dance Master",
                    photo: "https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/umpcemhcewhbtaa60j2k.jpg"
                },
                {
                    id: "91011",
                    name: "Van Darkholme",
                    semi: "Dungeon Master",
                    photo: "https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/hf3j3vrnu2z5pbjrcwfp.jpg"
                },
                {
                    id: "1234",
                    name: "Billy Herrington",
                    semi: "Boss of The Gym",
                    photo: "https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/b6ub4ptxggrje31cfjpp.jpg"
                },
                {
                    id: "5678",
                    name: "Ricardo Milos",
                    semi: "Dance Master",
                    photo: "https://res.cloudinary.com/dldpvhtjt/image/upload/v1712313763/umpcemhcewhbtaa60j2k.jpg"
                }
            ],
            currentPage: 1,
            totalPages: 4,
            pageSize: 3
        };
            setCreators(response.creators);
            setTotalPages(response.totalPages);
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