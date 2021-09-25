import React, {useEffect, useState} from 'react'; 

import DataTable , { createTheme } from 'react-data-table-component';
import ModalEdit from './Modal';

createTheme('solarized', {
  text: {
    primary: '#268bd2',
    secondary: '#2aa198',
  },
  background: {
    default: '#002b36',
  },
  context: {
    background: '#cb4b16',
    text: '#FFFFFF',
  },
  divider: {
    default: '#073642',
  },
  action: {
    button: 'rgba(0,0,0,.54)',
    hover: 'rgba(0,0,0,.08)',
    disabled: 'rgba(0,0,0,.12)',
  },
});

let callModal = () => {}
const getData = (selectedRows) => {
  console.log(selectedRows);
}

const setModalHandlers = (call) => {
  callModal = call;
}


const DTable = (props) => {
  
  const [selected, setSelected] = useState();

  return (
  <div>
  <DataTable
    title={props.datatitle}
    columns={props.datacolumns}
    data={props.datainput}
    highlightOnHover={true}
    pointerOnHover={true}
    onRowClicked={(selectedRows)=>{setSelected(selectedRows); callModal()}}
  />
  <ModalEdit title='Edit Trigger' data={selected} loader={props.loader} addrecord={false} setModalHandlers={setModalHandlers} />
  </div>
  );
};

export default DTable;