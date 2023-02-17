import React, { useEffect, useState } from "react"
import { SimpleGrid, VStack, Button } from "@chakra-ui/react"
import MovieCard from '../components/MovieCard';
import axios from "axios";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMovies()
  }, [])

  const loadMovies = () => {
    setLoading(true)
    axios
      .get(`https://www.omdbapi.com/?i=tt0848228&apikey=cadc1a65&s=Avengers&page=1`)
      .then(res => {
        setLoading(false)
        setLoaded(true)
        setMovies(res.data.Search)
      })
      .catch(error => {
        setLoading(false)
      })
  }

  return (
    <VStack py={8} w="100%">
      <SimpleGrid columns={{ sm: 2, md: 3, lg: 4, xl: 5 }} gap={5}>
        {movies?.map(movie => (
          <MovieCard movie={movie} />
        ))}
      </SimpleGrid>
      {loaded && <Button bg='#7b51ba' mx='auto' size='md'>Load More</Button>}
    </VStack>
  )
}

export default Home
