import { SwipeLeftAltRounded } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import articleApi from '../api/articleApi'
import Loading from '../components/Loading'
import { ARTICLE_DETAIL } from '../constant/routes'

const ArticleEdit = () => {
  const { id: articleId } = useParams()

  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [errMessage, setErrMessage] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoading(true)
      const res = await articleApi.getArticle(articleId ?? '')

      const { title, body } = res.data
      setTitle(title)
      setBody(body)
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
      console.error(errMessage)
      setIsLoading(false)
    })
  }, [articleId])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!title || !body) {
      setErrMessage('Invalid payload')
      return
    }

    const jsonData = {
      title,
      body,
    }

    try {
      setIsSaving(true)
      const res = await articleApi.updateArticle(jsonData, articleId)
      const { id } = res.data
      navigate(ARTICLE_DETAIL.replace(':id', id), { replace: true })
    } catch (e) {
      let errMessage = 'Error'
      if (e instanceof AxiosError) {
        errMessage = e.response?.data?.message
      } else if (e instanceof Error) {
        e.message
      }
      setErrMessage(errMessage)
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Stack direction='row' sx={{ width: '100%' }}>
        <Button
          variant='contained'
          startIcon={<SwipeLeftAltRounded />}
          onClick={() =>
            navigate(ARTICLE_DETAIL.replace(':id', articleId ?? ''), {
              replace: true,
            })
          }
        >
          Back
        </Button>
      </Stack>
      <Typography component='h1' variant='h5'>
        Update article
      </Typography>
      <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin='normal'
          required
          fullWidth
          id='title'
          label='Title'
          name='title'
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          name='body'
          label='Body'
          id='body'
          autoComplete='body'
          rows={10}
          multiline
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        {errMessage && (
          <Typography sx={{ color: 'red' }}>{errMessage}</Typography>
        )}
        <LoadingButton
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
          loading={isSaving}
        >
          Update
        </LoadingButton>
      </Box>
    </Box>
  )
}

export default ArticleEdit
