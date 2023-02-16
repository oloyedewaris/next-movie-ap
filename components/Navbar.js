import React from 'react'
import { HStack, Text } from '@chakra-ui/react'
import SearchMovie from './Search'

export default function Navbar() {
  return (
    <HStack
      px={5}
      py={2}
      mb={4}
      justifyContent="space-between"
      borderBottom="1px solid #000"
    >
      <a href="/">
        <Text
          fontSize="2xl"
          fontWeight="medium"
          letterSpacing="1px"
          color="primary"
        >
          MovieApp
        </Text>
      </a>
      <SearchMovie />
    </HStack>
  )
}
