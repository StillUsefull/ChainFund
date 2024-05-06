import {  Card } from "react-bootstrap";
import React from "react";
import { useNavigate } from "react-router";

export function HelpRequestCard({ card }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/admin/help/${card.id}`)
    }

    const cardStyle: React.CSSProperties = {
        width: '300px',
        height: 'auto',
        backgroundColor: card.answer ? '#16F700' : '#FFFFFF',
        display: 'flex',  
        alignItems: 'center' 
    };

    const contentStyle: React.CSSProperties = {
        flex: 1, 
        padding: '10px'
    };

    const answerStyle: React.CSSProperties = {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '10px',
        minWidth: '100px', 
        textAlign: 'center'
    };

    return (
        <Card style={cardStyle} onClick={handleClick} className="mb-3">
            <div style={contentStyle}>
                <Card.Title>{card.title}</Card.Title>
                <Card.Text>{card.text}</Card.Text>
            </div>
            {card.answer && (
                <div style={answerStyle}>
                    {card.answer}
                </div>
            )}
        </Card>
    );
}
