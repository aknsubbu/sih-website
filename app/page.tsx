"use client"
import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const FormContainer = styled.div`
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
  font-size:30px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 80%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top:10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const StyledLink = styled.a`
  /* Your styling here */
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    color: #0056b3;
    text-decoration: underline;
  }
`;

export default function Login() {
  const router = useRouter();
  const apiUrl = "http://localhost:5000";
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    phone: string;
    expertise: string;
    experienceTime: string;
    casesWon: string;
    casesLost: string;
    location: string;
    languagesKnown: string[];
  }>({
    name: '',
    email: '',
    phone: '',
    expertise: '',
    experienceTime: '',
    casesWon: '',
    casesLost: '',
    location: '',
    languagesKnown: [],
  });

  const [selectedAdditionalLanguage, setSelectedAdditionalLanguage] = useState('');

  const handleChange = (e : any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddLanguage = () => {
    if (selectedAdditionalLanguage) {
      setFormData({
        ...formData,
        languagesKnown: [...formData.languagesKnown, selectedAdditionalLanguage],
      });
      setSelectedAdditionalLanguage('');
    }
  };

  const handleSubmit =async  (e: React.FormEvent<HTMLFormElement>) => {
   
    console.log("Came innnn");
    e.preventDefault();
    // You can access the form data in the `formData` state and perform any necessary actions (e.g., submitting to a server or updating state).
    console.log('Form Data:', formData);
    //TODO:push to server
    try{
    const response = await axios.post(`${apiUrl}/lawyers/add`,{
      _id:formData.name+Date.now(),
      name:formData.name,
      contactDetails:{     email:formData.email, phone:formData.phone},
      expertise:formData.expertise,
      experience: {
        time: formData.experienceTime,
        casesWon: formData.casesWon,
        casesLost:formData.casesLost,
      },
      location: formData.location,
      languagesKnown: formData.languagesKnown,
      rating: (Number(formData.casesWon)/Number(formData.casesLost))*10,
    });
    console.log("Responseee---",response);
  }catch(err){
    console.log("Error in adding lawyers---",err);
  }
    router.push("/dashboard");
  };

  const allLanguages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'hi', name: 'Hindi' },
    { code: 'bn', name: 'Bengali' },
    // Add more languages here
  ];

  return (
    <FormContainer>
      <Title>Lawyer Details Form</Title>
      <form onSubmit={handleSubmit}  suppressHydrationWarning={true} method='post'>
        <FormGroup>
          <Label>Name:</Label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Email:</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Phone:</Label>
          <Input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            maxLength={10}
            minLength={10}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Expertise:</Label>
          <Input
            type="text"
            name="expertise"
            value={formData.expertise}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Experience (Years):</Label>
          <Input
            type="number"
            name="experienceTime"
            value={formData.experienceTime}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Cases Won:</Label>
          <Input
            type="number"
            name="casesWon"
            value={formData.casesWon}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Cases Lost:</Label>
          <Input
            type="number"
            name="casesLost"
            value={formData.casesLost}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Location:</Label>
          <Input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Languages Known:</Label>
          <Select
            value={selectedAdditionalLanguage}
            onChange={(e) => setSelectedAdditionalLanguage(e.target.value)}
            required={formData.languagesKnown.length === 0}
          >
            <option value="" disabled>
              Select Language
            </option>
            {allLanguages.map((lang) => (
              <option key={lang.code} value={lang.name}>
                {lang.name}
              </option>
            ))}
          </Select>
        </FormGroup>

        <Button type="button" onClick={handleAddLanguage}>
          Add Language
        </Button>

        {formData.languagesKnown.map((lang, index) => (
          <Label key={index}>Language {index + 1}: {lang}</Label>
        ))}

        <FormGroup>
        <Button type="submit">Submit</Button>
        </FormGroup>
      </form>
    </FormContainer>
  );
}