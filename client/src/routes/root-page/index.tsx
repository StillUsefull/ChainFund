import { CashCollectionCard } from '@components/cash-collection-card';
import { CreatorCard } from '@components/creator-card';
import { CreatorForm } from '@components/creator-form';
import api from '@utils/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

export function RootPage() {
    const [users, setUsers] = useState([]);
    const [fund, setFund] = useState(
      {
        rating: []
      }
    );
  
    useEffect(() => {
      
      const fetchFunds = async () => {
        try {
          const response = await api.get(`/cash-collection?page=1&limit=10&sortBy=name&sortOrder=ASC`);
          const funds = response.data.data; 
          console.log(funds)
          if (funds.length > 0) {
            const highestRatedFund = funds.reduce((max, fund) => max.rating.length > fund.rating.length ? max : fund);
            setFund(highestRatedFund);
            
          }
        } catch (error) {
          console.error('Failed to fetch funds', error);
        }
      };
  
      
      const fetchUsers = async () => {
        try {
          const response = await api.get(`/user/random`);
          console.log(response)
          setUsers(response.data);
        } catch (error) {
          console.error('Failed to fetch users', error);
        }
      };
  
      fetchFunds();
      fetchUsers();
    }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <Col md={4} className="p-3">
            <CashCollectionCard
              fund={fund}
              admin={false}
            />
          </Col>
          <Col md={6} className="p-3">
            <div style={{marginLeft: '50px', color: '#2B3EFF', fontFamily: 'cursive'}}>
              <h2>Crowdfunding: Empowering Ideas, Enabling Dreams</h2>
              <p>
                  Crowdfunding: Empowering Ideas, Enabling Dreams
                  In today’s interconnected world, crowdfunding has emerged as a revolutionary way to fund a diverse array of projects—from innovative tech products to medical expenses, community projects, and creative endeavors. This platform serves as a bridge between visionaries and those who can support their vision, providing a unique opportunity for creators and entrepreneurs to bring their ideas to life with the help of a supportive community.
              </p>
              <h3>How Our Crowdfunding Works</h3>
              <p>Our crowdfunding system is designed to be intuitive and transparent, ensuring that both creators and contributors can easily engage with each other. Here’s how it works:</p>
              <p>1. Project Submission: Creators submit their projects for review, outlining their goals, the impact they intend to make, and the resources they need.</p>
              <p>2. Community Engagement: Once approved, projects are published on our platform. Creators share their vision through updates, blog posts, and direct communications, fostering a community spirit.</p>
              <p>3. Funding: Supporters can contribute financially towards the project in return for rewards or simply to be a part of something bigger. Every little contribution counts and helps a project move closer to its goal.</p>
              <p>4. Achievement and Beyond: When a project reaches its funding target, the funds are released to the creator to commence or continue their work. Contributors get regular updates on how their contributions are making an impact.</p>
          
              
            </div>  
            
          </Col>
        </Row>
        <Row>
          <Col md={4} className="p-3">
          <div style={{marginLeft: '50px', color: '#2B3EFF', fontFamily: 'cursive'}}>
              <h2>Meet Our Talented Creators!</h2>
              <p>At our platform, we proudly showcase a diverse group of creative visionaries who are actively seeking funding to bring their innovative projects to life. Each creator has a unique story and an inspiring vision, ranging from groundbreaking technological advancements to compelling artistic endeavors.</p>
          </div>
          
          </Col>
          <Col md={8} className="p-3">
            <Row>
              {users.map((user) => (
                <Col md={4} key={user.id}>
                  <CreatorCard id={user.id} name={user.name} semi={user.semi} photo={user.photo}/>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
        <CreatorForm />
      </Container>
    </>
  );
}