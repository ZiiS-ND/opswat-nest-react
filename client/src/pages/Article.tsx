import { Add, Delete } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Box,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { AxiosError } from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import articleApi from '../api/articleApi'
import Loading from '../components/Loading'
import { ARTICLE_ADD, ARTICLE_DETAIL } from '../constant/routes'

export type ArticleSO = {
  id: string

  title: string

  body: string

  favoritesCount: number

  favorited?: boolean
}

const Article = () => {
  const [articles, setArticles] = useState<ArticleSO[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [errMessage, setErrMessage] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoading(true)
      const res = await articleApi.getAllArticle()

      setArticles(res.data)
      setIsLoading(false)
      setErrMessage(null)
    }

    fetchArticle().catch((e) => {
      let errMessage = 'Error'
      if (e instanceof AxiosError) {
        errMessage = e.response?.data?.message
      } else if (e instanceof Error) {
        e.message
      }
      setErrMessage(errMessage)
      setIsLoading(false)
    })
  }, [])

  const deleteArticle = useCallback(async (id: string | number) => {
    try {
      setIsDeleting(true)
      await articleApi.deleteArticle(id)
      setArticles((prevUsers) => {
        return prevUsers.filter((prevUser) => prevUser.id !== id)
      })
      setIsDeleting(false)
    } catch (e) {
      setIsDeleting(false)
      if (e instanceof AxiosError) {
        console.error(e.response?.data?.message)
      } else if (e instanceof Error) {
        console.error(e.message)
      }
    }
  }, [])

  if (isLoading) {
    return <Loading />
  }

  if (errMessage) {
    return (
      <Box>
        <Typography variant='h5' sx={{ color: 'red' }}>
          {errMessage}
        </Typography>
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant='h5'>Article list</Typography>
      <Stack direction='row-reverse'>
        <Button
          endIcon={<Add />}
          onClick={() => navigate(ARTICLE_ADD)}
          variant='contained'
        >
          Create
        </Button>
      </Stack>
      <TableContainer component={Box}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Favorite Count</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {articles.map((article) => (
              <TableRow
                key={article.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  <Link to={ARTICLE_DETAIL.replace(':id', article.id)}>
                    {article.title}
                  </Link>
                </TableCell>
                <TableCell component='th' scope='row'>
                  {article.favoritesCount}
                </TableCell>
                <TableCell component='th' scope='row'>
                  <LoadingButton
                    endIcon={<Delete />}
                    loadingPosition='end'
                    variant='contained'
                    onClick={() => deleteArticle(article.id)}
                    loading={isDeleting}
                    color='error'
                  >
                    Delete
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Article
