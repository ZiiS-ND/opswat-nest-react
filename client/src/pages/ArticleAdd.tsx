import { LoadingButton } from '@mui/lab'
import { Box, TextField, Typography } from '@mui/material'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import articleApi from '../api/articleApi'
import { ARTICLE_DETAIL } from '../constant/routes'

const ArticleAdd = () => {
  const [loading, setLoading] = useState(false)
  const [errMessage, setErrMessage] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const title = data.get('title')
    const body = data.get('body')
    if (!title || !body) {
      setErrMessage('Invalid payload')
      return
    }

    const jsonData = {
      title: title.toString(),
      body: body.toString(),
    }

    try {
      setLoading(true)
      const res = await articleApi.createArticle(jsonData)
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
      setLoading(false)
    }
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
      <Typography component='h1' variant='h5'>
        Create a new article
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
        />
        {errMessage && (
          <Typography sx={{ color: 'red' }}>{errMessage}</Typography>
        )}
        <LoadingButton
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
          loading={loading}
        >
          Create
        </LoadingButton>
      </Box>
    </Box>
  )
}

export default ArticleAdd
