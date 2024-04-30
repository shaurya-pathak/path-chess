import React, { useState, useEffect, useCallback } from 'react';
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js';
import { Box, Heading, Button, Alert, AlertIcon, AlertTitle, AlertDescription, Spinner } from '@chakra-ui/react';
import axios from 'axios';


function PlayAI() {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState('start');
  const [isCheckmate, setIsCheckmate] = useState(false);
  const [playerColor, setPlayerColor] = useState(''); // 'white' or 'black'
  const [gameStarted, setGameStarted] = useState(false);
  const [history, setHistory] = useState([]);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [apiAvailable, setApiAvailable] = useState(true);




  const onDrop = ({ sourceSquare, targetSquare }) => {
    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q' // Assume queen promotion for simplicity
      });
  
      if (!move) return;
  
      setFen(game.fen());
      setIsCheckmate(game.isCheckmate());
      setHistory([...history, game.fen()]); // Update history after player's move
    } catch (error) {
      console.error("Illegal move attempted", error);
    }
  };
  

  const downloadPgn = () => {
    let annotatedPgn = game.pgn();
    const playerAnnotation = `[White "${playerColor === 'white' ? 'Human' : 'AI'}"]\n[Black "${playerColor === 'black' ? 'Human' : 'AI'}"]\n`;
    annotatedPgn = playerAnnotation + annotatedPgn;
  
    const element = document.createElement('a');
    const file = new Blob([annotatedPgn], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'game.pgn';
    document.body.appendChild(element);
    element.click();
  };

  const resetGame = () => {
    setGame(new Chess()); // Resets the game instance
    setFen('start'); // Resets the board position to the start
    setIsCheckmate(false); // Resets checkmate status
    setPlayerColor(''); // Clears the player color selection
    setGameStarted(false); // Sets the game as not started
  };

  // Inside your component
  const makeAIMove = useCallback(async () => {
      setIsAiThinking(true); // Start spinner
      const currentFen = game.fen();
      const newHistory = [...history, currentFen].slice(-4); // Keep the last 4 FENs
      if (newHistory.length < 4) {
        while (newHistory.length < 4) {
          newHistory.unshift("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
        }
      }

      try {
        const response = await axios.post('https://adapting-known-martin.ngrok-free.app/evaluate_move', {
          fen_strings: newHistory
        });
        const bestMove = response.data.best_move;
        game.move(bestMove, { sloppy: true });
        setFen(game.fen());
        setIsCheckmate(game.isCheckmate());
        setHistory(newHistory);
      } catch (error) {
        console.error('Error fetching AI move:', error);
      }
      setIsAiThinking(false); // Stop spinner
  }, [game, history, setIsAiThinking, setFen, setIsCheckmate, setHistory]); // Dependency array


const checkApiAvailability = async () => {
  try {
      // You might need to add a simple endpoint in your Flask app that just returns a status code.
      await axios.get('https://adapting-known-martin.ngrok-free.app/api/health');
      setApiAvailable(true);
  } catch (error) {
      console.error('API is not reachable:', error);
      setApiAvailable(false);
  }
};

useEffect(() => {
  checkApiAvailability();
}, []);  // Empty dependency array to ensure this only runs once on mount


useEffect(() => {
  // Automatically make an AI move when it's AI's turn and the game has started
  if (gameStarted && game.turn() !== playerColor[0]) {
    makeAIMove();
  }
}, [fen, gameStarted, playerColor, game, makeAIMove]); 
  
  
  
  
  

  return (
    <Box>
      <Heading as="h2" size="xl">Play Chess</Heading>
      {!apiAvailable && (
        <Alert status="error" variant="subtle" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" height="250px"
        sx={{
          background: 'rgba(255, 0, 0, 0.05)', // Red background with an alpha for slight opacity
          borderColor: 'red.500', // Use Chakra's color system for the border color, if border is needed
          borderWidth: '0px', // Set border width
          borderStyle: 'solid', // Define border style as solid
          borderRadius: 'lg', // Set rounded borders using Chakra's built-in border radius options
      }}>
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Service Unavailable
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            Sorry, this API is not running right now. I unfortunately can't run this 24/7 since keeping an API and hosting a machine learning model is not cheap. If you would like me to turn it on, please email me at shauryapathak24@gmail.com.
          </AlertDescription>
        </Alert>
      )}
      {apiAvailable && (
        <>
          {isCheckmate && <Box my={2}>Checkmate!</Box>}
          {!gameStarted ? (
            <Box textAlign="center" my={4}>
              <Button mr={4} onClick={() => { setPlayerColor('white'); setGameStarted(true); }}>Play as White</Button>
              <Button onClick={() => { setPlayerColor('black'); setGameStarted(true); }}>Play as Black</Button>
            </Box>
          ) : (
            <>
              <Alert
                status="error"
                mb={4}
                sx={{
                    background: 'rgba(255, 0, 0, 0.05)', // Red background with an alpha for slight opacity
                    borderColor: 'red.500', // Use Chakra's color system for the border color, if border is needed
                    borderWidth: '0px', // Set border width
                    borderStyle: 'solid', // Define border style as solid
                    borderRadius: 'lg', // Set rounded borders using Chakra's built-in border radius options
                }}
                >
                <AlertIcon color="red.500" />
                <Box flex="1">
                  <AlertTitle color="red.500">Rendering Error!</AlertTitle>
                  <AlertDescription display="block" color="red.500">
                    There is a known rendering error with the chessboard.js library that may cause black rook captures to show as white. 
                    This won't affect gameplay, it is only a visual issue. If there are any suggestions or bugs, please email me at shauryapathak24@gmail.com.
                  </AlertDescription>
                </Box>
              </Alert>

              <Chessboard
                orientation={playerColor}
                width={400}
                position={fen}
                onDrop={onDrop}
                boardStyle={{
                    borderRadius: '5px',
                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)',
                }}
              />
              {isAiThinking && <Spinner ml={4} thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />}
              
              <div>
                <Button onClick={downloadPgn} mt={4}>Download PGN</Button>
              </div>
              <div>
                <Button onClick={resetGame} mt={4}>Reset Game</Button>
              </div>
            </>
          )}
        </>
      )}
    </Box>
);

}

export default PlayAI;