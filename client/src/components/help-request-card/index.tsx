import { Button, Card } from "react-bootstrap";
import React from "react";

export function HelpRequestCard({ card }: { card: { title: string; text: string; answer?: string } }) {
    const cardStyle: React.CSSProperties = {
        width: '300px',
        height: 'auto',
        backgroundColor: card.answer ? '#16F700' : '#FFFFFF',
        display: 'flex',  // Adjust to flex layout for side-by-side display
        alignItems: 'center' // Align items vertically
    };

    const contentStyle: React.CSSProperties = {
        flex: 1, // Takes up the remaining space
        padding: '10px'
    };

    const answerStyle: React.CSSProperties = {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '10px',
        minWidth: '100px', // Ensure minimum width for the answer section
        textAlign: 'center'
    };

    return (
        <Card style={cardStyle} className="mb-3">
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
