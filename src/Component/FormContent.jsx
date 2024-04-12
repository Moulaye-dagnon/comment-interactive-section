import { useContext, useState } from 'react'
import './form.css'
export function FormComment ({ currentUser, setDataComments,dataComments}){
	const hanldleSubmit =(e)=>{
		e.preventDefault()
		const value = e.target[0].value
		const id = Math.random().toString(36).substring(2,9)
		const currentTime = new Date()
		let newRecors = {
			"id" : id,
			"content": value,
			"createdAt":'now' ,
			"score": 0,
			"user": {
				"image": { 
					"png": currentUser.image.png,
					"webp": currentUser.image.webp
				  },
				  "username": currentUser.username
			},
			"replies": []
		}
		let updateData = [
			...dataComments,
			newRecors
		]
		setDataComments(updateData)
		}
	

	return (
		<form onSubmit={hanldleSubmit} className="formContainer">
			<div className="Form-profil">
				<img src="../../public/images/avatars/image-juliusomo.png" alt="" />
			</div>
			<div className='textComment'>
				<textarea    />
			</div>
			<button className='btn-send' type='submit' >Send</button>
		</form>
	)
}