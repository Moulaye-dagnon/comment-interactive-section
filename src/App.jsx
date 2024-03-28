
import { useState } from 'react'
import './App.css'
import { AllComments } from './Component/allComments'
import { Form } from './Component/form'
import data from './data.json'
// import { SetValueContext, ValueContext } from './utils/Context'
function App() {
	const [value, setvalue] = useState('')

  return (
	<div className='Container'>	
		<AllComments  data={data}/>
		{/* <Form holder={data.currentUser.username} /> */}
	</div>
  )
}

export default App
