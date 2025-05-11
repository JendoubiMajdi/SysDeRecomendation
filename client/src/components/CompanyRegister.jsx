import React, { useState } from 'react';
import axios from 'axios';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  Link,
  useColorModeValue,
  Grid,
  GridItem,
  Textarea,
  Select,
  Alert,
  AlertIcon
} from '@chakra-ui/react';

const CompanyRegister = () => {
  // Company Information
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [foundedYear, setFoundedYear] = useState('');
  const [website, setWebsite] = useState('');
  const [description, setDescription] = useState('');

  // Contact Information
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  // Hiring Preferences
  const [hiringManager, setHiringManager] = useState('');
  const [hiringEmail, setHiringEmail] = useState('');
  const [jobType, setJobType] = useState('');

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      setIsLoading(false);
      return;
    }

    const companyData = {
      companyName,
      industry,
      companySize,
      foundedYear,
      website,
      description,
      email,
      password,
      phone,
      address,
      hiringManager,
      hiringEmail,
      jobType
    };

    try {
      const response = await axios.post('http://localhost:5000/register/company', companyData, {
        headers: { 'Content-Type': 'application/json' }
      });
      setMessage(response.data.message || 'Registration successful!');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      console.error('Registration failed:', error.response?.data?.message || error.message);
      setMessage(error.response?.data?.message || 'Registration failed. Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" bg={useColorModeValue('gray.50', 'gray.800')}>
      <Box p={8} minWidth="600px" width="80%" borderWidth={1} borderRadius={8} boxShadow="lg" bg={useColorModeValue('white', 'gray.700')}>
        <Box textAlign="center">
          <Heading>Company Registration</Heading>
          <Text mt={2}>Create your employer account</Text>
        </Box>
        
        {message && (
          <Alert status={message.includes('success') ? 'success' : 'error'} mt={4}>
            <AlertIcon />
            {message}
          </Alert>
        )}

        <Box my={4} textAlign="left">
          <form onSubmit={handleSubmit}>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              {/* Company Information */}
              <GridItem colSpan={2}>
                <Heading size="md" mb={4}>Company Information</Heading>
              </GridItem>
              
              <GridItem colSpan={2}>
                <FormControl isRequired>
                  <FormLabel>Company Name</FormLabel>
                  <Input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Enter your company name"
                  />
                </FormControl>
              </GridItem>

              <GridItem colSpan={1}>
                <FormControl isRequired>
                  <FormLabel>Industry</FormLabel>
                  <Input
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="e.g. Technology, Healthcare"
                  />
                </FormControl>
              </GridItem>

              <GridItem colSpan={1}>
                <FormControl isRequired>
                  <FormLabel>Company Size</FormLabel>
                  <Select
                    value={companySize}
                    onChange={(e) => setCompanySize(e.target.value)}
                  >
                    <option value="">Select size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="501-1000">501-1000 employees</option>
                    <option value="1000+">1000+ employees</option>
                  </Select>
                </FormControl>
              </GridItem>

              <GridItem colSpan={1}>
                <FormControl>
                  <FormLabel>Founded Year</FormLabel>
                  <Input
                    type="number"
                    value={foundedYear}
                    onChange={(e) => setFoundedYear(e.target.value)}
                    placeholder="e.g. 2010"
                  />
                </FormControl>
              </GridItem>

              <GridItem colSpan={1}>
                <FormControl>
                  <FormLabel>Website</FormLabel>
                  <Input
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://yourcompany.com"
                  />
                </FormControl>
              </GridItem>

              <GridItem colSpan={2}>
                <FormControl>
                  <FormLabel>Company Description</FormLabel>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief description of your company"
                    rows={4}
                  />
                </FormControl>
              </GridItem>

              {/* Contact Information */}
              <GridItem colSpan={2}>
                <Heading size="md" mb={4} mt={6}>Contact Information</Heading>
              </GridItem>

              <GridItem colSpan={1}>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                </FormControl>
              </GridItem>

              <GridItem colSpan={1}>
                <FormControl>
                  <FormLabel>Phone</FormLabel>
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone number"
                  />
                </FormControl>
              </GridItem>

              <GridItem colSpan={1}>
                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create password"
                  />
                </FormControl>
              </GridItem>

              <GridItem colSpan={1}>
                <FormControl isRequired>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                  />
                </FormControl>
              </GridItem>

              <GridItem colSpan={2}>
                <FormControl>
                  <FormLabel>Address</FormLabel>
                  <Input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Company headquarters address"
                  />
                </FormControl>
              </GridItem>

              {/* Hiring Information */}
              <GridItem colSpan={2}>
                <Heading size="md" mb={4} mt={6}>Hiring Information</Heading>
              </GridItem>

              <GridItem colSpan={1}>
                <FormControl>
                  <FormLabel>Hiring Manager Name</FormLabel>
                  <Input
                    type="text"
                    value={hiringManager}
                    onChange={(e) => setHiringManager(e.target.value)}
                    placeholder="Primary contact for hiring"
                  />
                </FormControl>
              </GridItem>

              <GridItem colSpan={1}>
                <FormControl>
                  <FormLabel>Hiring Manager Email</FormLabel>
                  <Input
                    type="email"
                    value={hiringEmail}
                    onChange={(e) => setHiringEmail(e.target.value)}
                    placeholder="hiring@company.com"
                  />
                </FormControl>
              </GridItem>

              <GridItem colSpan={2}>
                <FormControl>
                  <FormLabel>Primary Job Type</FormLabel>
                  <Select
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    placeholder="Select job type"
                  >
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                    <option value="remote">Remote</option>
                  </Select>
                </FormControl>
              </GridItem>

              <GridItem textAlign="center" colSpan={2} mt={6}>
                <Button 
                  width="20%" 
                  type="submit" 
                  colorScheme="teal"
                  isLoading={isLoading}
                  loadingText="Registering..."
                >
                  Register
                </Button>
              </GridItem>
            </Grid>
          </form>
        </Box>

        <Box textAlign="center" mt={4}>
          <Text>Already have an account?</Text>
          <Link as={RouterLink} to="/login" color="teal.500">Login here</Link>
        </Box>
      </Box>
    </Box>
  );
};

export default CompanyRegister;