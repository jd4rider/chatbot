// Importing individual react components 
import React, { useState, useEffect } from 'react'; 
import { useAuthUser } from 'react-auth-kit'
import axios from 'axios';

//Bootstrap Import
import Form from 'react-bootstrap/Form';

const NewTrigger = (props) => {
    const auth = useAuthUser()
    let tid = '';
    let tname = '';
    let taction = '';
    if(props.data) {
      tid = props.data.id;
      tname = props.data.tname;
      taction = props.data.taction;
    }
    const [formData, setFormData] = useState({tid: tid,
                                              tname: tname,
                                              taction: taction,
                                              tusername: auth().username
                                              })


    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${auth().token}` 
    }
    
    const onSubmit = () => {
      if(!props.data)
      axios.post(`${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_TRIGGER}`, JSON.stringify(formData), {
             headers: headers
           })
           .then((res)=>{
             if(res.status == 200 || res.status == 201) {
               props.loader();
               setTimeout(()=>{
                  props.setLoading(true);
                  props.handleClose();
               }, 1000)
               
             }
           })
      else {
      console.log('YAY!!!!!!!!!!!!!!!!!!!!!!!')
      axios.put(`${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_TRIGGER}`, JSON.stringify(formData), {
        headers: headers
      })
      .then((res)=>{
        if(res.status == 200 || res.status == 201) {
          props.loader();
          setTimeout(()=>{
             props.setLoading(true);
             props.handleClose();
          }, 1000)
          
        }
      })
      }
    }

    useEffect( () => {
      props.setformSubmitMethod(onSubmit);
    });
  
    return (
  
            <Form>
            
                <Form.Group controlId="formGridName">
                  <Form.Label>Trigger Name</Form.Label>
                  {!props.data && <Form.Control placeholder="!example" onChange={(e)=>setFormData({...formData, tname: e.target.value})} />}
                  {props.data && <Form.Control value={formData.tname} onChange={(e)=>setFormData({...formData, tname: e.target.value})} />}
                </Form.Group>
                <br />
                <Form.Group controlId="formGridAction">
                  <Form.Label>Trigger Action</Form.Label>
                  {!props.data && <Form.Control as="textarea" rows={3} placeholder="Come follow us on Twitch" onChange={(e)=> {setFormData({...formData, taction: e.target.value})}}/>}
                  {props.data && <Form.Control as="textarea" rows={3} value={formData.taction} onChange={(e)=> {setFormData({...formData, taction: e.target.value})}}/>}
                </Form.Group>

            </Form> 
    );
  }

  export default NewTrigger; 