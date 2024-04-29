
import DonationCard from "@components/donation-card";
import SidebarMenu from "@components/side-bar-menu";
import api from "@utils/api";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";



export function MyDonationsPage(){
    const [transactions, setTransactions]: [any, any] = useState([]);
    useEffect(() => {
        api.get(`/transaction`)
            .then((response) => {
                setTransactions(response.data)
            })
    }, [])
    return (
        <div>
            <SidebarMenu />
            <Container style={{ marginLeft: '250px', padding: '20px' }}>
                {transactions[0] ? (
                        transactions.map(transaction => (
                            <DonationCard key={transaction.id} fundId={transaction.cashCollectionId} amount={transaction.amount} />
                        ))
                    ) : (
                        <p>You haven't supported any fund yet.</p>
                    )}
            </Container>
        </div>
    )
}