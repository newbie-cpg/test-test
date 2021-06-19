// import Axios from 'axios';
import { useState } from 'react';
function App() {

  const [statusList, setStatusList] = useState([]); 
  const [statusData, setStatusData] = useState({
    des:'',status:'S'
  });

  const [editData, setEditData] = useState({
    des:'',status:'S'
  });

  const submitForm = (event) => {
    event.preventDefault();

    setStatusList((prevStatusList)=>{
      return [
        statusData,
        ...prevStatusList
      ]
    })
    setStatusData(()=>{
      return {
        des: '',
        status: 'S'
      }
    })
  }

  const ChangeData = (event) => {
    const {name,value} = event.target;
    setStatusData((prevStauts)=>{
      return {
        ...prevStauts,
        [name]:value
      }  
    })
  }

  const EditData = (event) => {
    const {name,value} = event.target;
    setEditData((prevStauts)=>{
      return {
        ...prevStauts,
        [name]:value
      }  
    })
  }


  const DeleteClick = (event) => {
    let array = [...statusList]; // make a separate copy of the array
    let indexid = event.target.dataset.id;
    array = array.filter(((item,index) => String(index) !== String(indexid)))
    setStatusList(array);
  }

  const EditClick = (event) => {
    let indexid = event.target.dataset.id;
    let des_ = event.target.dataset.des;
    let status_ = event.target.dataset.status;
    setDisplay(indexid);
    setEditData((prevEdit)=>{
      return {
        des:des_,
        status:status_
      }
    })
  }

  const SaveEdit = (event) => {
    let indexid = event.target.dataset.id;
    setStatusList((prevStatusList)=>{
      prevStatusList[indexid] = editData
      return [
        ...prevStatusList
      ]
    })
    setEditData(()=>{
      return {
        des: '',
        status: 'S'
      }
    })

    setDisplay(indexid);
  }

  const setDisplay = (id)=>{
    setButton(id);
    let x = document.getElementsByClassName('inputDes-'+id);
    for(let i = 0 ; i < x.length ; i ++){
      x[i].classList.add("inputActive");
        x[i].style.display = x[i].style.display === 'none' ? 'block' : 'none';
    }
  }

  const setButton = (id)=>{
    let x = document.getElementsByClassName('btn-'+id);
    for(let i = 0 ; i < x.length ; i ++){
      x[i].classList.add("inputActive");
        x[i].style.display = x[i].style.display === 'none' ? 'block' : 'none';
    }
  }

  return (
    <div className="container">

      <div className='d-flex justify-content-center'>
        <form className="col-lg-12 mt-3" name='frmTest' method="post"  onSubmit={submitForm} >
          <div className='d-flex'>
            <div className="col-lg-3">
              Input Description :
            </div>
            <div className="col-lg-4">
              <input type='test' 
                  className="form-control ml-3 mr-3" 
                  placeholder="Input description" 
                  id="des" 
                  name='des' 
                  value={statusData.des}
                  onChange={ChangeData}
                  required/>
            </div>
            <div className="col-lg-4">
              <select name='status' id='status' className='form-control' onChange={ChangeData} value={statusData.status}>
                <option value='S'>Success</option>
                <option value='F'>Fail</option>
              </select>
            </div>
            <div className="col-lg-3">
              <button className="btn btn-success" type="submit" >Save</button>
            </div>
          </div>
          
        </form> 
      </div>
      <hr />
      {statusList.map((val,key) => (
        <div className='card mb-3' key={key} id={key} data-id={key}>
          <div className='card-body'>
            <div className='d-flex justify-content-between'>
              <div className='col-lg-4 align-self-center'>
                <span className={'inputDes-'+key} style={{display: 'block'}}>{val.des}</span>
                <input  className={'form-control mr-3 inputDes-'+key}
                        style={{display: 'none'}}
                        name='des' 
                        placeholder="Input description"
                        value={editData.des}
                        data-id={key}
                        onChange={EditData}
                        required />
              </div>
              <div className='col-lg-4 align-self-center'>
                <span className={'inputDes-'+key}>{val.status === 'S'? 'SUCCESS' : 'FAIL'}</span>
                <select name='status' className={'form-control inputDes-'+key} data-id={key} onChange={EditData} value={editData.status} style={{display:'none'}}> 
                  <option value='S'>Success</option>
                  <option value='F'>Fail</option>
                </select>
              </div>
              <div className='d-flex'>
                <button className={'btn btn-success mr-3 btn-'+key} style={{display:'none'}} onClick={SaveEdit} data-id={key}>SAVE</button>
                <button className={'btn btn-warning mr-3 btn-'+key} style={{display:'block'}} onClick={EditClick} data-id={key} data-des={val.des} data-status={val.status}>EDIT</button>
                <button className={'btn btn-secondary mr-3 btn-'+key} style={{display:'none'}} onClick={()=>{setDisplay(key)}} data-id={key}>CLOSE</button>
                <button className={'btn btn-danger btn-'+key} style={{display:'block'}} onClick={DeleteClick} data-id={key}>DELETE</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
