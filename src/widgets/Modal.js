// Importing individual react components 
import React, { useEffect, useState } from 'react'; 
import { css } from "@emotion/react";
import FadeLoader from "react-spinners/FadeLoader";
import Newtrigger from "./forms/Newtrigger";
import './Modal.scss';

//Bootstrap Import
import { Modal, Button } from 'react-bootstrap';

//React Icon Import
import { GrAdd } from 'react-icons/gr';


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


const ModalTJustice = (props) => {
    const [show, setShow] = useState(false); 
    const [loading, setLoading] = useState(true);
    const [color] = useState("#FF0000");
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let formSubmit = () => {}

    const setformSubmitMethod = (newMethod) => {
      formSubmit = newMethod;
    }
    
    
    useEffect(()=>{
      if(!props.addrecord) {
       props.setModalHandlers(handleShow)
      }
    })
    
  
    return (
      <>
        {props.addrecord &&
        <div className='modalbutton'>
            <GrAdd className='modalplus' onClick={() => {handleShow(); setLoading(true)}}/>
            <br />
            Create New
        </div>
        }
        <Modal show={show} onHide={() => {handleClose(); setLoading(true); props.loader();}}>
          <Modal.Header closeButton>
            <Modal.Title>{props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {props.addrecord && <Newtrigger loader={props.loader} setLoading={setLoading} handleClose={handleClose} setformSubmitMethod={setformSubmitMethod} />}
          {!props.addrecord && <Newtrigger data={props.data} loader={props.loader} setLoading={setLoading} handleClose={handleClose} setformSubmitMethod={setformSubmitMethod} />}
          </Modal.Body>
          <Modal.Footer>
            <FadeLoader color={color} loading={!loading} css={override} size={50} />
            <Button variant="secondary" onClick={() => {handleClose(); setLoading(true); props.loader();}}>
              Close
            </Button>
            <Button variant="primary" onClick={() => {setLoading(false); formSubmit() }}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  export default ModalTJustice; 