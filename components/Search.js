import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Box, Text } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

function SearchMovie() {
  const router = useRouter();
  const [value, setValue] = useState('');
  const [movies, setMovies] = useState([]);
  const [showAutoComplete, setShowAutoComplete] = useState(true);

  useEffect(() => {
    axios
      .get(`https://www.omdbapi.com/?i=tt3896198&apikey=cadc1a65&s=${value}`)
      .then(res => {
        setMovies(res.data.Search)
      })
      .catch(err => console.log(err))
  }, [value])


  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      setShowAutoComplete(false)
      router.push(`/search/${value}`)
    }
  }

  const handleValueChange = e => {
    setShowAutoComplete(true)
    setValue(e.target.value)
  }

  return (
    <Box position="relative" width="30%" minW="200px">
      <InputGroup>
        <InputLeftElement children={<SearchIcon color="gray" />} />
        <Input
          border="none"
          bg="background2"
          placeholder="Search"
          _placeholder={{ color: 'gray' }}
          color="white"
          value={value}
          onChange={handleValueChange}
          onKeyDown={handleKeyDown}
        />
      </InputGroup>
      <Box
        display={showAutoComplete ? 'block' : 'none'}
        mt="-5px"
        bg="background2"
        width="100%"
        position="absolute"
        zIndex={100}
      >
        {movies?.map(({ Title, imdbID }) => (
          <Text
            tabIndex="0"
            p={1}
            color="white"
            cursor="pointer"
            _focus={{ bg: 'primary', color: 'white' }}
            _hover={{ bg: 'primary', color: 'white' }}
            onClick={e => { router.push(`/detail/${imdbID}`); setShowAutoComplete(false); }}
          >
            {Title}
          </Text>
        ))}
      </Box>
    </Box>
  )
}


export default SearchMovie
