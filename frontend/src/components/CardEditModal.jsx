import { Form, Input, Modal, message } from 'antd'
import { updateUser } from '../service'

const CardEditModal = ({
	userDetails,
	closeModal,
	isEditModalOpen,
	setUserDetails,
}) => {
	const [form] = Form.useForm()

	const onCancel = () => {
		form.resetFields()
		closeModal()
	}

	const onOk = () => {
		form
			.validateFields()
			.then((values) => {
				const body = {...userDetails, ...values}
				try {
					updateUser(userDetails._id, body)
					setUserDetails(body)
				} catch (error) {
					message.error(error.message)
				}
				closeModal()
				message.success('Updated successfully')
			})
			.catch(({ errorFields }) => {
				message.error(
					`Validate Failed - ${errorFields[0]?.name[0]} field is required`
				)
			})
	}

	return (
		<Modal
			title='Basic Modal'
			open={isEditModalOpen}
			bodyStyle={{ padding: '2rem' }}
			onCancel={onCancel}
			onOk={onOk}>
			<Form
				form={form}
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				initialValues={userDetails}>
				<Form.Item
					label='Username'
					name='name'
					rules={[{ required: true, message: 'This field is required!' }]}>
					<Input />
				</Form.Item>
				<Form.Item
					label='Email'
					name='email'
					rules={[{ required: true, message: 'This field is required!' }]}>
					<Input />
				</Form.Item>
				<Form.Item
					label='Phone'
					name='phone'
					rules={[{ required: true, message: 'This field is required!' }]}>
					<Input />
				</Form.Item>
				<Form.Item
					label='Website'
					name='website'
					rules={[{ required: true, message: 'This field is required!' }]}>
					<Input />
				</Form.Item>
			</Form>
		</Modal>
	)
}

export default CardEditModal
