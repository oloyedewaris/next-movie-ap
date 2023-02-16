import React, { useEffect, useState } from "react";
import { SimpleGrid, VStack } from "@chakra-ui/react";
import MovieCard from '../../components/MovieCard';
import axios from "axios";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    console.log('router.query?.title', router.query?.title)
    axios
      .get(`https://www.omdbapi.com/?i=tt0848228&apikey=cadc1a65&s=${router.query?.title || 'Avengers'}&page=${movies.page}`)
      .then(res => {
        setMovies(res.data.Search)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <VStack py={8} w="100%">
      <SimpleGrid columns={{ sm: 2, md: 3, lg: 4, xl: 5 }} gap={5}>
        {movies?.map(movie => (
          <MovieCard movie={movie} />
        ))}
      </SimpleGrid>
    </VStack>
  )
}

export default Home
