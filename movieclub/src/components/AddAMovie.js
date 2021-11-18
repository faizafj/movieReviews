import React, {useState} from 'react';
import { Form, Input } from "semantic-ui-react";


function AddAMovie () {
	const [title, setTitle] = useState('');
const userId=localStorage.getItem('userid');
  if(userId==null){
window.location.href='/login'
}
  
	return (
		<Form.Field>
			<Input 
			placeholder="movie title"
			value={title}
			onChange={e => setTitle(e.target.value)}/>

		</Form.Field>
	)
}

export default AddAMovie

//need post request which deals with this