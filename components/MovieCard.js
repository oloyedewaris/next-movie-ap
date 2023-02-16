import React from 'react';
import { Image, Modal, ModalOverlay, ModalContent, Box, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useDisclosure } from '@chakra-ui/react';

export default function MovieCard({ movie }) {
  const { Title, Poster, Year, Type } = movie
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Image src={movie.Poster} alt="poster" />
        </ModalContent>
      </Modal>

      <Box width="200px" position="relative">
        <Image
          onClick={onOpen}
          src={Poster} width={200} height={300} objectFit="cover" cursor="sw-resize"
        />
        <Link href={`/detail/${movie.imdbID}`}>
          <Text variant="link" mt={2} w="90%" isTruncated>
            {Title} ({Year})
          </Text>
        </Link>
        <Text variant="secondary">{Year}</Text>
        <Box px={2} bg="primary" borderRadius="5px" position="absolute" top="1" left="1"
        >
          <Text variant="primary" fontSize="xs">
            {Type?.toUpperCase()}
          </Text>
        </Box>
      </Box>
    </>
  )
}
