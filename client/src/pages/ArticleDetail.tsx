import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArticleSO } from './Article'
import articleApi from '../api/articleApi'
import { AxiosError } from 'axios'
import Loading from '../components/Loading'
import { Box, Button, Stack, Typography } from '@mui/material'
import { Delete, Edit, Favorite, HeartBroken } from '@mui/icons-material'
import { ARTICLE, ARTICLE_EDIT } from '../constant/routes'
import { LoadingButton } from '@mui/lab'

const ArticleDetail = () => {
  const { id } = useParams()

  const [article, setArticle] = useState<ArticleSO>()
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [errMessage, setErrMessage] = useState<string | null>(null)
  const [favorited, setFavorited] = useState(false)
  const [isFavoring, setIsFavoring] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoading(true)
      const res = await articleApi.getArticle(id ?? '')

      setArticle(res.data)
      setFavorited(res.data.favorited ?? false)
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
  }, [id])

  const deleteArticle = useCallback(
    async (id: string | number) => {
      try {
        setIsDeleting(true)
        await articleApi.deleteArticle(id)
        setIsDeleting(false)
        navigate(ARTICLE)
      } catch (e) {
        setIsDeleting(false)
        if (e instanceof AxiosError) {
          console.error(e.response?.data?.message)
        } else if (e instanceof Error) {
          console.error(e.message)
        }
      }
    },
    [navigate]
  )

  const favoriteAricle = useCallback(async (id: string | number) => {
    try {
      setIsFavoring(true)
      await articleApi.favoriteArticle(id)
      setIsFavoring(false)
      setFavorited(true)
    } catch (e) {
      setIsFavoring(false)
      if (e instanceof AxiosError) {
        console.error(e.response?.data?.message)
      } else if (e instanceof Error) {
        console.error(e.message)
      }
    }
  }, [])

  const unFavoriteArticle = useCallback(async (id: string | number) => {
    try {
      setIsFavoring(true)
      await articleApi.unfavoriteArticle(id)
      setIsFavoring(false)
      setFavorited(false)
    } catch (e) {
      setIsFavoring(false)
      if (e instanceof AxiosError) {
        console.error(e.response?.data?.message)
      } else if (e instanceof Error) {
        console.error(e.message)
      }
    }
  }, [])

  if (!id) {
    return (
      <Box>
        <Typography variant='h5' sx={{ color: 'red' }}>
          Invalid ID
        </Typography>
      </Box>
    )
  }

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

  if (!article) {
    return (
      <Box>
        <Typography variant='h5' sx={{ color: 'red' }}>
          Invalid Article
        </Typography>
      </Box>
    )
  }

  return (
    <Box>
      <Stack direction='row-reverse' gap={1}>
        {favorited ? (
          <LoadingButton
            endIcon={<HeartBroken />}
            onClick={() => unFavoriteArticle(id)}
            variant='contained'
            color='secondary'
            loadingPosition='end'
            loading={isFavoring}
          >
            Unfavorite
          </LoadingButton>
        ) : (
          <LoadingButton
            endIcon={<Favorite />}
            onClick={() => favoriteAricle(id)}
            variant='contained'
            color='secondary'
            loadingPosition='end'
            loading={isFavoring}
          >
            Favorite
          </LoadingButton>
        )}
        <LoadingButton
          endIcon={<Delete />}
          onClick={() => deleteArticle(id)}
          variant='contained'
          color='error'
          loadingPosition='end'
          loading={isDeleting}
        >
          Delete
        </LoadingButton>
        <Button
          endIcon={<Edit />}
          onClick={() => navigate(ARTICLE_EDIT.replace(':id', id))}
          variant='contained'
        >
          Edit
        </Button>
      </Stack>
      <Stack gap={2}>
        <Typography variant='h5'>{article.title}</Typography>
        <Typography>{article.body}</Typography>
      </Stack>
    </Box>
  )
}

export default ArticleDetail
