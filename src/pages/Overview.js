import { useEffect } from 'react';
import { Box, Heading, Text, Link } from '@chakra-ui/react';

function Overview() {
  useEffect(() => {
    function handleResizeMessage(e) {
      if (e.data && e.data.id === "11754313") {
        const iframe = document.getElementById(e.data.id);
        if (iframe) {
          iframe.style.height = `${e.data.frameHeight + 30}px`; // Add 30px padding
        }
      }
    }

    window.addEventListener("message", handleResizeMessage);

    // Clean up the event listener
    return () => {
      window.removeEventListener("message", handleResizeMessage);
    };
  }, []);

  return (
    <Box>
      <Heading as="h2" size="xl">Model Overview</Heading>
      <Text mt={4}>
        This project is an implementation of a neural network-based chess engine inspired by DeepMind's AlphaZero, combining Monte Carlo Tree Search (MCTS) with deep learning to learn from self-play. The model is designed to understand and innovate on the core mechanics of a neural network-based chess engine.
      </Text>
      <Text mt={4}>
        Features include a convolutional neural network (CNN) with residual and squeeze-and-excitation (SE) blocks, an enhanced MCTS for decision-making, and a self-play training loop to improve strategic depth over time.
      </Text>
      <Heading as="h3" size="lg" mt={4}>Model Architecture and Training</Heading>
      <Text mt={4}>
        The model utilizes TensorFlow and Keras, with layers designed to process multiple previous moves of the chess board, providing deep feature extraction and strategic insight. For more detailed information or to contribute, visit the <Link href="https://github.com/shaurya-pathak/path-chess-zero" isExternal>project repository on GitHub</Link>.
      </Text>
      <Text mt={4}>
        This is the first iteration of the model and is still in development. Future updates will include more advanced features, optimizations, and improvements to the model's strategic depth and performance. Here is an annotated game that my model played against itself.
      </Text>
      <br />
      <Box as="iframe"
           id="11754313"
           src="//www.chess.com/emboard?id=11754313&theme=dark"
           allowTransparency="true"
           frameBorder="0"
           width="100%"
           style={{ border: 'none', minHeight: '500px' }}
      />
      <Text mt={4}>
        For a practical demonstration or to interact with the model, explore the embedded chess board or visit the <Link href="https://github.com/shaurya-pathak/path-chess-zero" isExternal>GitHub page</Link>.
      </Text>
    </Box>
  );
}

export default Overview;
