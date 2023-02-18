import React, { useEffect, useState } from "react"
import { SimpleGrid, VStack, CircularProgress, Button } from "@chakra-ui/react"
import MovieCard from '../components/MovieCard';
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";

const Home = () => {
  const [page, setPage] = useState(1);

  const firstQuery = useQuery({
    queryKey: ['movie'],
    queryFn: () => axios
      .get(`https://www.omdbapi.com/?i=tt0848228&apikey=cadc1a65&s=Avengers&page=${page}`)
      .then(res => res.data.Search)
  })

  const loadMoreMutation = useMutation({
    mutationFn: () => axios
      .get(`https://www.omdbapi.com/?i=tt0848228&apikey=cadc1a65&s=Avengers&page=${page + 1}`)
      .then(res => {
        setPage(page + 1)
        return res.data.Search
      })
  })

  const handleLoadMore = () => {
    loadMoreMutation.mutate()
  }

  return (
    <VStack py={8} w="100%">
      {firstQuery.isLoading ? (
        <CircularProgress isIndeterminate value={30} size='120px' />
      ) : firstQuery.isError ? (
        <div>An error occurred</div>
      ) : (
        <SimpleGrid columns={{ sm: 2, md: 3, lg: 4, xl: 5 }} gap={5}>
          {loadMoreMutation?.data ? (
            <>
              {[...firstQuery.data, ...loadMoreMutation.data]?.map(movie => (
                <MovieCard key={movie.Title} movie={movie} />
              ))}
            </>
          ) : (
            <>
              {[...firstQuery.data]?.map(movie => (
                <MovieCard key={movie.Title} movie={movie} />
              ))}
            </>
          )}
        </SimpleGrid>
      )}

      {!firstQuery.isLoading && (
        <Button
          isLoading={loadMoreMutation.isLoading}
          disabled={loadMoreMutation.isLoading}
          loadingText='Loading...'
          onClick={handleLoadMore}
          bg='#7b51ba' mx='auto' size='md'>
          Load more
        </Button>
      )}
    </VStack >
  )
}

export default Home
