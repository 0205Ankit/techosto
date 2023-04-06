import {
	DeleteFilled,
	EditOutlined,
	GlobalOutlined,
	HeartFilled,
	HeartOutlined,
	MailOutlined,
	PhoneOutlined,
} from '@ant-design/icons'
import { Card as AntdCard, Popconfirm, message } from 'antd'
import React, { useMemo, useState } from 'react'
import { IMG_URL, removeLike, updateLike } from '../service'
import CardEditModal from './CardEditModal'

const flexStyles = {
	display: 'flex',
	gap: '10px',
	alignItems: 'center',
}

const Card = ({ data, removeItem }) => {
	const [userDetails, setUserDetails] = useState(data)
	const [isLiked, setIsLiked] = useState(data.like)
	const [isEditModalOpen, setIsEditModalOpen] = useState(false)

	const handleAddLike = async () => {
		try {
			const res = await updateLike(userDetails._id)
			setIsLiked(true)
			console.log(res)
		} catch (error) {
			console.log(error)
			message.error(error.message)
		}
	}
	const handleRemoveLike = async () => {
		try {
			const res = await removeLike(userDetails._id)
			setIsLiked(false)
			console.log(res)
		} catch (error) {
			console.log(error)
			message.error(error.message)
		}
	}

	const cardActionItems = useMemo(() => {
		const items = []

		if (isLiked) {
			items[0] = (
				<HeartFilled
					style={{ color: 'red', cursor: 'pointer', fontSize: '17px' }}
					onClick={handleRemoveLike}
				/>
			)
		} else {
			items[0] = (
				<HeartOutlined
					style={{ color: 'red', cursor: 'pointer', fontSize: '17px' }}
					onClick={handleAddLike}
				/>
			)
		}

		items.push(
			<EditOutlined
				style={{ fontSize: '17px' }}
				onClick={() => setIsEditModalOpen((prev) => !prev)}
			/>,
			<Popconfirm
				title='Delete User'
				description='Are you sure to delete this user?'
				onConfirm={() => {
					removeItem(userDetails._id)
					
				}}
				onCancel={() => {}}
				okText='Yes'
				cancelText='No'>
				{' '}
				<DeleteFilled
					style={{ fontSize: '17px' }}
				/>
			</Popconfirm>
		)

		return items
	}, [isLiked, userDetails.name])

	return (
		<React.Fragment>
			<AntdCard
				style={{ overflow: 'none' }}
				cover={
					<div className='card-cover-img'>
						<img
							width={200}
							height={200}
							alt={`${data.username} Avatar`}
							src={IMG_URL(data.username)}
						/>
					</div>
				}
				actions={cardActionItems}>
				<h3>{userDetails.name}</h3>
				<div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
					<div style={flexStyles}>
						<MailOutlined style={{ fontSize: '17px' }} /> {userDetails.email}
					</div>
					<div style={flexStyles}>
						<PhoneOutlined style={{ fontSize: '17px' }} /> {userDetails.phone}
					</div>
					<div style={flexStyles}>
						<GlobalOutlined style={{ fontSize: '17px' }} />{' '}
						{userDetails.website}
					</div>
				</div>
			</AntdCard>
			<CardEditModal
				closeModal={() => setIsEditModalOpen(false)}
				setUserDetails={(v) => setUserDetails(v)}
				isEditModalOpen={isEditModalOpen}
				userDetails={userDetails}
			/>
		</React.Fragment>
	)
}

export default Card
