/* import { Container ,Typography,TextField,Button} from '@mui/material';
import { useState } from 'react';

function ResetPasswordForm () {
 
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormValues({
      ...formValues,
      [name]:{
        ...formValues[name],
        value
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const formFields = Object.keys(formValues);
    let newFormValues = {...formValues}

    for (let index = 0; index < formFields.length; index++) {
      const currentField = formFields[index];
      const currentValue = formValues[currentField].value;

      if(currentValue === ''){
        newFormValues = {
          ...newFormValues,
          [currentField]:{
            ...newFormValues[currentField],
            error:true
          }
        }
      }

    }

    setFormValues(newFormValues)
  }

  const [formValues, setFormValues] = useState({
    name:{
      value:'',
      error:false,
      errorMessage:'You must enter a name'
    },
    age:{
      value:'',
      errorMessage:'You must enter an age'
    },
    likes:{
      value:'',
      error:false,
      errorMessage:'You must enter your liked tech stacks'
    },

  })
  return (
    <>
    <Container  >
         <form noValidate onSubmit={handleSubmit} >
             <Typography 
               variant="h6">
                 Please enter your data
             </Typography>
   
            
              <TextField id="macAddress" label="MAC Address" name="name"
              value={formValues.name.value}
              onChange={handleChange}
              error={formValues.name.value !== "" && !formValues.name.value.match("([a-zA-Z])")}
              helperText={formValues.name.value !== "" && !formValues.name.value.match("([a-zA-Z])") ? 'MAC Address must be a 6-bytes string.' : ' '}
            />




             <TextField 
               placeholder="Enter your age"
               label="Age"
               name="age"
               variant="outlined"
               fullWidth
               required
               type="number"
             
               value={formValues.age.value}
               onChange={handleChange}
               error={formValues.age.error}
               helperText={formValues.age.error && formValues.age.errorMessage}
               />
   
             <TextField 
               placeholder="Describe the best tech stack you worked with and you like most?"
               label="Likes"
               name="likes"
               variant="outlined"
               fullWidth
               required
              
               value={formValues.likes.value}
               multiline
               rows={4}
               onChange={handleChange}
               error={formValues.likes.error}
               helperText={formValues.likes.error && formValues.likes.errorMessage}
             />
   
             
   
             <Button
               type="submit"
               variant="outlined"
               color="secondary"
          
             >
                 Submit
             </Button>
         </form>
       </Container>
       </>
  );
}
export default ResetPasswordForm ;
*/
import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, TextField, Button } from '@material-ui/core';

const ResetPasswordForm = () => {

  
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Name"
        name="name"
       
         {...register('name', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, })} 
        variant="outlined"
        margin="normal"
        
        error={errors.name}
        helperText={errors.name  ? 'verifier votre nom ' : ' '}
      />
      <TextField
        label="Email"
        name="email"

        {...register('email', { required: true , pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, })} 
        variant="outlined"
        margin="normal"
        error={errors.email}
       
        helperText={errors.email  ? 'verifier votre email ' : ' '}
     
        
      />

  
      <Button type="submit" variant="contained" color="primary" >
        Submit
      </Button>
    </Box>
  );
};

export default ResetPasswordForm;
