import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import userApi from '../api/userApi'
import Loading from '../components/Loading'
import { AxiosError } from 'axios'
import { UserSO, useAuth } from '../provider/authProvider'
import { LoadingButton } from '@mui/lab'
import { Delete } from '@mui/icons-material'

const User = () => {
  const [users, setUsers] = useState<UserSO[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [errMessage, setErrMessage] = useState<string | null>(null)

  const { user: currUser } = useAuth()

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true)
      const res = await userApi.getAllUser()

      setUsers(res.data)
      setIsLoading(false)
      setErrMessage(null)
    }

    fetchUser().catch((e) => {
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

  const deleteUser = useCallback(async (email: string) => {
    try {
      setIsDeleting(true)
      const res = await userApi.deleteUser(email)

      const deletedUser = res.data

      setUsers((prevUsers) => {
        return prevUsers.filter((prevUser) => prevUser.id !== deletedUser.id)
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
      <TableContainer component={Box}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Fullname</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {user.id}
                </TableCell>
                <TableCell component='th' scope='row'>
                  {user.email}
                </TableCell>
                <TableCell component='th' scope='row'>
                  {user.username}
                </TableCell>
                <TableCell component='th' scope='row'>
                  {user.fullname}
                </TableCell>
                <TableCell component='th' scope='row'>
                  {user.id !== currUser.id && (
                    <LoadingButton
                      endIcon={<Delete />}
                      loadingPosition='end'
                      variant='contained'
                      onClick={() => deleteUser(user.email)}
                      loading={isDeleting}
                    >
                      Delete
                    </LoadingButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default User
