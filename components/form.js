import AddRegistry from './addRegistry';
import UpdateRegistry from './updateRegistry'
import { useSelector } from 'react-redux';
import { useReducer } from 'react';

const formReducer = (state, event) => {
    return{
        ...state,
        [event.target.name]: event.target.value
    }
}

export default function Form() {

    const [formData, setFormData]=useReducer(formReducer,{})
    const formId = useSelector((state) => state.app.client.formId)

    return(
        <div>
            { formId ? UpdateRegistry({formId, formData, setFormData}) : AddRegistry({formData, setFormData})}
        </div>
        
    )
    
}