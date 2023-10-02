"use client"
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface Lawyer {
  name: string;
  contactDetails: {
    email: string;
    phone: string;
  };
  experience: {
    time: number;
    casesWon: number;
    casesLost: number;
  };
  location: string;
  languagesKnown: string[];
  rating: number;
}

// Define styled components
const LawyerContainer = styled.div`
  padding: 20px;
`;

const LawyerInfo = styled.div`
  background-color: #f7f7f7;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const LawyerHeading = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const LawyerDetails = styled.p`
  font-size: 16px;
`;

const LanguagesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const LanguageItem = styled.li`
  font-size: 14px;
`;

export default function LawyerPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const apiUrl = "http://localhost:5000";
  const [lawyer, setLawyer] = useState<Lawyer | null>(null);

  useEffect(() => {
    const fetchLawyer = async () => {
      try {
        const response = await axios.get<Lawyer>(`${apiUrl}/lawyers/${id}`);
        console.log(response);
        setLawyer(response.data);
      } catch (err) {
        console.log("Error in finding the individual lawyer....");
      }
    }
    fetchLawyer();
  }, [id]);

  return (
    <LawyerContainer>
      {lawyer ? (
        <LawyerInfo>
          <LawyerHeading>{lawyer.name}</LawyerHeading>
          <LawyerDetails><b>Email:</b> {lawyer.contactDetails.email}</LawyerDetails>
          <LawyerDetails><b>Phone Number:</b> {lawyer.contactDetails.phone}</LawyerDetails>
          <LawyerDetails><b>Experience (Years):</b> {lawyer.experience.time}</LawyerDetails>
          <LawyerDetails><b>Cases Won:</b> {lawyer.experience.casesWon}</LawyerDetails>
          <LawyerDetails><b>Cases Lost:</b> {lawyer.experience.casesLost}</LawyerDetails>
          <LawyerDetails><b>Location:</b> {lawyer.location}</LawyerDetails>
          <LawyerDetails><b>Languages Known:</b></LawyerDetails>
          <LanguagesList>
            {lawyer.languagesKnown.map((lang, index) => (
              <LanguageItem key={index}>{lang}</LanguageItem>
            ))}
          </LanguagesList>
          <LawyerDetails><b>Rating:</b> {lawyer.rating}</LawyerDetails>
        </LawyerInfo>
      ) : (
        <p>Loading lawyer data...</p>
      )}
    </LawyerContainer>
  );
}
