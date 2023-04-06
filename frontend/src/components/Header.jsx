import { Button, message } from 'antd'
import { refreshList as refreshUserList } from '../service'
import { useState } from 'react'

const headerStyle = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	color: 'white',
}

const Header = ({setData}) => {
  const [isLoading, setIsLoading] = useState(false)

	const refreshList = async () => {
    try {
      setIsLoading(true)
      const res = await refreshUserList()
      setData(res)
      setIsLoading(false)
		} catch (error) {
      message.error(error.message)
      setIsLoading(false)
		}
	}

	return (
		<div style={headerStyle}>
			<h3 style={{ color: 'white' }}>Techosto</h3>
			<Button loading={isLoading} type='primary' onClick={refreshList}>
				Refresh List
			</Button>
		</div>
	)
}

export default Header
