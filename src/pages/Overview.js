// src/components/Overview.js
import React, { useEffect } from 'react';
import { Box, Heading, Text, Link, Image, Stack } from '@chakra-ui/react';
import modelImage from '../assets/model.png';
import architectureImage from '../assets/architecture.png';

function Overview() {
  useEffect(() => {
    function handleResizeMessage(e) {
      if (e.data && e.data.id === "11754313") {
        const iframe = document.getElementById(e.data.id);
        if (iframe) {
          iframe.style.height = `${e.data.frameHeight + 30}px`;
        }
      }
    }

    window.addEventListener("message", handleResizeMessage);
    return () => {
      window.removeEventListener("message", handleResizeMessage);
    };
  }, []);

  return (
    <Box maxW="800px" mx="auto" p={6} bg="gray.800" color="white" borderRadius="md" boxShadow="lg">
      <Heading as="h2" size="xl" mb={4} color="cyan.100">
        Model Overview
      </Heading>
      <Text mb={6} lineHeight="tall">
        This project is an implementation of a neural network-based chess engine inspired by DeepMind's AlphaZero, combining Monte Carlo Tree Search (MCTS) with deep learning to learn from self-play.
      </Text>
      <Stack mb={6} spacing={4}>
        <Image src={architectureImage} alt="System Architecture" borderRadius="md" boxShadow="md" />
      </Stack>
      <Text mb={6} lineHeight="tall">
        Features include a convolutional neural network (CNN) with residual and squeeze-and-excitation (SE) blocks, an enhanced MCTS for decision-making, and a self-play training loop to improve strategic depth over time.
      </Text>
      <Heading as="h3" size="lg" mb={4} color="cyan.100">
        Model Architecture and Training
      </Heading>
      <Stack mb={6} spacing={4}>
        <Image src={modelImage} alt="Model Architecture" borderRadius="md" boxShadow="md" />
      </Stack>
      <Text mb={6} lineHeight="tall">
        The model utilizes TensorFlow and Keras, with layers designed to process multiple previous moves of the chess board, providing deep feature extraction and strategic insight. For more detailed information or to contribute, visit the <Link href="https://github.com/shaurya-pathak/path-chess-zero" isExternal color="cyan.200">project repository on GitHub</Link>.
      </Text>
      <Text mb={6} lineHeight="tall">
        This is the first iteration of the model and is still in development. Future updates will include more advanced features, optimizations, and improvements to the model's strategic depth and performance. Here is an annotated game that my model played against itself.
      </Text>
      <Box as="iframe"
           id="11754313"
           src="//www.chess.com/emboard?id=11754313&theme=dark"
           allowTransparency="true"
           frameBorder="0"
           width="100%"
           minH="500px"
           borderRadius="md"
           boxShadow="md"
           style={{ border: 'none' }}
      />
      <Text mt={6} lineHeight="tall">
        For a practical demonstration or to interact with the model, explore the embedded chess board or visit the <Link href="https://github.com/shaurya-pathak/path-chess-zero" isExternal color="cyan.200">GitHub page</Link>.
      </Text>
    </Box>
  );
}

export default Overview;
