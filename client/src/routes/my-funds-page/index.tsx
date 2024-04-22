import { CashCollectionCard } from "@components/cash-collection-card";
import { CreateFundForm } from "@components/create-fund-form";
import { notifyError } from "@components/notifications";
import SidebarMenu from "@components/side-bar-menu";
import api from "@utils/api";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";


export function MyFundsPage() {
    const [funds, setFunds] = useState([]);
    
    
    useEffect(() => {
        const fetchFundsData = async () => {
            try {
                const response = await api.get('/cash-collection/my');
                setFunds(response.data);
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
                <CreateFundForm />
                <br />
                {funds && funds.map((fund) => (
                    
                    <CashCollectionCard 
                        key={fund.id}  
                        id={fund.id} 
                        title={fund.title} 
                        description={fund.descriptions} 
                        goal={fund.goal} 
                        category={fund.category} 
                        photo={fund.photo}
                        admin={true}
                    />
                ))}
            </Container>
        </>
    );
}