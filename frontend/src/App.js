import '@fontsource/montserrat'
import { Button, Col, Layout, Row, message } from 'antd'
import { useEffect, useState } from 'react'
import Card from './components/card'
import Spinner from './components/Spinner'
import AppHeader from './components/Header'
import { deleteUser, getUsers } from './service'

const { Content, Header } = Layout

const contentStyles = {
  padding: '1rem',
}

function App() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
    try {
      const asyncFunc = async () => {
        const responseData = await getUsers()
        setData(responseData)
        setLoading(false)
      }
      asyncFunc()
    } catch (err) {
      message.error(err.message)
      setLoading(false)
    }
  }, [])

  const removeItem = async (id) => {
    try {
      console.log(id)
      setData((prev) => prev.filter((item) => item._id !== id))
      await deleteUser(id)
      message.success(`User with id:${id} deleted`)
    } catch (error) {
      message.error(error.message)
      console.log(error)
    }
  }

  if (loading) return <Spinner />

  if (data && data?.length === 0) return <h1>No Items to Show</h1>

  return (
    <div>
      <Header>
        <AppHeader setData={(d) => setData(d)} />
      </Header>
      <Content style={contentStyles}>
        <Row gutter={[30, 30]}>
          {data?.map((item) => {
            return (
              <Col xs={16} sm={12} md={10} lg={8} xl={6} key={item._id}>
                <Card data={item} removeItem={removeItem} />
              </Col>
            )
          })}
        </Row>
      </Content>
    </div>
  )
}

export default App
