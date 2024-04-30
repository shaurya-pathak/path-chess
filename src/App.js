import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Box, VStack, Heading, Container, Text, Link as ChakraLink, useColorModeValue} from '@chakra-ui/react';
import { FaChessKnight } from 'react-icons/fa'; // FontAwesome chess knight icon
import PlayAI from './pages/PlayAI';
import Overview from './pages/Overview';
import About from './pages/About';

function App() {
  const navBg = useColorModeValue('gray.700', 'gray.900'); // Lighter for dark mode, darker for light mode
  const hoverBg = useColorModeValue('teal.600', 'teal.400'); // Hover effect

  return (
    <Router>
      <Container maxW="container.md" pt={5}>
        <Box bg={navBg} p={4} borderRadius="lg" mb={6}>
          <VStack spacing={4} align="stretch">
            <Heading size="xl" textAlign="center" color="teal.300">
              <FaChessKnight /> Path-Chess
            </Heading>
            <Text fontSize="lg" color="teal.200" textAlign="center">
              <ChakraLink as={Link} to="/" p={2} _hover={{ bg: hoverBg }}>Play Against My AI</ChakraLink> |
              <ChakraLink as={Link} to="/overview" p={2} _hover={{ bg: hoverBg }}>Overview</ChakraLink> 
              {/* <ChakraLink as={Link} to="/about" p={2} _hover={{ bg: hoverBg }}>About</ChakraLink> */}
            </Text>
          </VStack>
        </Box>
        <Routes>
          <Route path="/" element={<PlayAI />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
