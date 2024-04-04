import { Box, Heading, Text } from '@chakra-ui/react';

function About() {
  return (
    <Box>
      <Heading as="h2" size="xl">About</Heading>
      <Text mt={4}>
        {/* About content goes here */}
      </Text>
    </Box>
  );
}

export default About;
