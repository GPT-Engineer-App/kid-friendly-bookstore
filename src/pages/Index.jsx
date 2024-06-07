import React, { useState } from "react";
import { Container, VStack, Text, Button, Input, Box, Image, HStack, IconButton, Badge } from "@chakra-ui/react";
import { FaShoppingCart, FaTrash, FaCreditCard } from "react-icons/fa";

const books = [
  { id: 1, title: "The Little Prince", price: 10, image: 'https://images.unsplash.com/photo-1529158062015-cad636e205a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxUaGUlMjBMaXR0bGUlMjBQcmluY2UlMjBib29rJTIwY292ZXJ8ZW58MHx8fHwxNzE3NzUxNTk4fDA&ixlib=rb-4.0.3&q=80&w=1080' },
  { id: 2, title: "Where the Wild Things Are", price: 15, image: 'https://images.unsplash.com/photo-1529158062015-cad636e205a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxXaGVyZSUyMHRoZSUyMFdpbGQlMjBUaGluZ3MlMjBBcmUlMjBib29rJTIwY292ZXJ8ZW58MHx8fHwxNzE3NzUxNTk4fDA&ixlib=rb-4.0.3&q=80&w=1080' },
  { id: 3, title: "Goodnight Moon", price: 8, image: 'https://images.unsplash.com/photo-1529158062015-cad636e205a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxHb29kbmlnaHQlMjBNb29uJTIwYm9vayUyMGNvdmVyfGVufDB8fHx8MTcxNzc1MTU5OHww&ixlib=rb-4.0.3&q=80&w=1080' },
];

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [cart, setCart] = useState([]);
  const [showPayment, setShowPayment] = useState(false);

  const handleLogin = () => {
    if (username) setIsLoggedIn(true);
  };

  const addToCart = (book) => {
    setCart([...cart, book]);
  };

  const removeFromCart = (bookId) => {
    setCart(cart.filter((book) => book.id !== bookId));
  };

  const handlePayment = () => {
    setShowPayment(true);
  };

  if (!isLoggedIn) {
    return (
      <Container centerContent maxW="container.sm" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <VStack spacing={4}>
          <Text fontSize="2xl">Login to My First Book</Text>
          <Input placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <Button onClick={handleLogin}>Login</Button>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container.lg" py={4}>
      <HStack justifyContent="space-between" mb={4}>
        <Text fontSize="2xl">My First Book</Text>
        <HStack>
          <IconButton aria-label="Cart" icon={<FaShoppingCart />} size="lg" />
          <Badge colorScheme="green">{cart.length}</Badge>
        </HStack>
      </HStack>

      <VStack spacing={4} align="stretch">
        {books.map((book) => (
          <Box key={book.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
            <HStack>
              <Image src={book.image} alt={book.title} boxSize="100px" />
              <VStack align="start">
                <Text fontSize="lg">{book.title}</Text>
                <Text>${book.price}</Text>
                <Button onClick={() => addToCart(book)}>Add to Cart</Button>
              </VStack>
            </HStack>
          </Box>
        ))}
      </VStack>

      <Box mt={8}>
        <Text fontSize="2xl">Shopping Cart</Text>
        {cart.length === 0 ? (
          <Text>Your cart is empty</Text>
        ) : (
          <VStack spacing={4} align="stretch">
            {cart.map((book) => (
              <HStack key={book.id} justifyContent="space-between">
                <Text>{book.title}</Text>
                <HStack>
                  <Text>${book.price}</Text>
                  <IconButton aria-label="Remove" icon={<FaTrash />} onClick={() => removeFromCart(book.id)} />
                </HStack>
              </HStack>
            ))}
            <Button leftIcon={<FaCreditCard />} onClick={handlePayment}>
              Proceed to Payment
            </Button>
          </VStack>
        )}
      </Box>

      {showPayment && (
        <Box mt={8}>
          <Text fontSize="2xl">Payment</Text>
          <Text>Payment functionality is not implemented yet.</Text>
        </Box>
      )}
    </Container>
  );
};

export default Index;
