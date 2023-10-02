"use client"
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Link from 'next/link'; // Import Link from Next.js

interface Lawyer {
  _id: string;
  name: string;
  contactDetails: {
    email: string;
    // Add more properties as needed
  };
}
const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f7f7f7;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 30px;
`;

const LawyerCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
`;

const LawyerName = styled.p`
  font-weight: bold;
  font-size: 18px;
`;

const LawyerDetails = styled.p`
  font-size: 16px;
`;

const MoreDetailsLink = styled.a`
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    color: #0056b3;
    text-decoration: underline;
  }
`;

export default function Dashboard() {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = "http://localhost:5000";

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/lawyers/all`);
        setLawyers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching lawyers:", error);
        setLoading(false);
      }
    };

    fetchLawyers();
  }, []);

  return (
    <Container>
      <Title>Dashboard</Title>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {lawyers.map((lawyer, index) => (
            <LawyerCard key={index}>
              <LawyerName>Name: {lawyer.name}</LawyerName>
              <LawyerDetails>Email: {lawyer.contactDetails.email}</LawyerDetails>
              {/* Add more details here */}
              <Link href={`/lawyer?id=${lawyer._id}`}>
              <MoreDetailsLink>More Details</MoreDetailsLink>
              </Link>
            </LawyerCard>
          ))}
        </div>
      )}
    </Container>
  );
}
