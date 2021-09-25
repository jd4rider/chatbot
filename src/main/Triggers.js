//Importing individual react components
import React, { useEffect, useState } from 'react';

//Bootstrap Import
import { Row, Col, Container, Button } from 'react-bootstrap'
  
//Widget import
import Datatable from '../widgets/Datatable';
import { useAuthUser } from 'react-auth-kit'
import axios from 'axios';
import ModalT from '../widgets/Modal';
import { css } from "@emotion/react";
import FadeLoader from "react-spinners/FadeLoader";
import { MdDeleteForever } from 'react-icons/md'
import { IconContext } from "react-icons";
import { render } from '@testing-library/react';

import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'



const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Triggers = () => {
    const [triggers, setTriggers] = useState([]);
    const auth = useAuthUser();
    const [loading, setLoading] = useState(true);
    const [color] = useState("#FF0000");

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${auth().token}` 
    }

    const loadData = () => {
        setLoading(false)
        axios.get(`${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_TRIGGER}?authuser=${auth().username}`, {headers: headers})
            .then(response => {
                setLoading(true)
                setTriggers(JSON.parse(response.data))
            })
    }
     
    const onDelete = (row) => {
        setLoading(false)
        axios.delete(`${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_TRIGGER}`, {headers: headers, data:{"tid" : row.id, "tusername" : row.tusername}})
        .then((res)=>{
            if(res.status == 200 || res.status == 201) {
            loadData();
            setTimeout(()=>{
                setLoading(true);
            }, 1000)
            
            }
        })
    }

    const submitDelete = (row) => confirmAlert({
        title: 'Confirm delete',
        message: 'Are you sure you want to delete this trigger?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => onDelete(row)
          },
          {
            label: 'No',
            onClick: () => loadData()
          }
        ]
      })

    const columns = [
        {
            name: 'Trigger Id',
            selector: 'id',
            sortable: true,
            omit: true,
        },
        {
            name: 'Trigger Name',
            selector: 'tname',
            sortable: true,
        },
        {
            name: 'Trigger Action',
            selector: 'taction',
            sortable: true,
        },
        {
            name: "Delete",
            cell: (row) => <IconContext.Provider value={{color: "red"}} ><span onClick={()=>{submitDelete(row)}}><MdDeleteForever size={40} /></span></IconContext.Provider>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }
    ]

    useEffect(() => {
        setLoading(false)
        loadData();
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);


    return (
        <>
        <Container fluid>
        <Row>
            <Col>
            <FadeLoader color={color} loading={!loading} css={override} size={50} />
            <Datatable datainput={triggers} datacolumns={columns} loader={loadData} datatitle='Manage My Trigger Actions'/>
            </Col>
            <Col md="auto">
            <ModalT title='New Trigger' loader={loadData} addrecord={true} />
            </Col>
        </Row>   
        </Container>
        </>
    )
}

export default Triggers;