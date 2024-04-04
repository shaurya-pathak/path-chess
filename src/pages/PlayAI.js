import React, { useState } from 'react';
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js';
import { Box, Heading, Button, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';


function PlayAI() {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState('start');
  const [isCheckmate, setIsCheckmate] = useState(false);
  const [playerColor, setPlayerColor] = useState(''); // 'white' or 'black'
  const [gameStarted, setGameStarted] = useState(false);


  const onDrop = ({ sourceSquare, targetSquare }) => {
    try {
      // Attempt to make the move
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q', // Assume queen promotion for simplicity
      });

      // If the move is illegal (move === null), catch block will not execute, and we simply return
      if (!move) return;

      // If the move is legal, update the game state
      setFen(game.fen());
      setIsCheckmate(game.isCheckmate());
    } catch (error) {
      // If there's an error (e.g., illegal move), we reset the board to its previous state
      console.error("Illegal move attempted", error);
      setFen(game.fen()); // Reset to current game state's FEN to undo any illegal move attempts
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
  
  

  return (
    <Box>
      <Heading as="h2" size="xl">Play Chess</Heading>
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
            <AlertIcon color="red.500" /> {/* Customize the icon color to match */}
            <Box flex="1">
                <AlertTitle color="red.500">Rendering Error!</AlertTitle> {/* Customize the title color */}
                <AlertDescription display="block" color="red.500">
                There is a known rendering error with the chessboard.js library that may cause black rook captures to show as white. 
                This won't effect gameplay, it is only a visual issue. If there are any suggestions or bugs, please email me at shauryapathak24@gmail.com.
                </AlertDescription> {/* Customize the description color */}
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
          <div>
            <Button onClick={downloadPgn} mt={4}>Download PGN</Button>
            </div>
            <div>
            <Button onClick={resetGame} mt={4}>Reset Game</Button>
          </div>



        </>
      )}
    </Box>
  );
}

export default PlayAI;
