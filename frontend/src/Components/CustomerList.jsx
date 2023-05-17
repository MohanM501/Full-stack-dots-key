import React from 'react'
import { useEffect,useState } from 'react';
import axios from "axios";
import "./CustomerList.css";
import ManagerCustomer from './ManagerCustomer';
let url=`http://localhost:9001/customer`;

const CustomerList = () => {
    const [customer_data,setCustomerData]=useState([]);
    const [show,setShow]=useState(false);
    const [page,setPage]=useState(1);
    const [type,setType]=useState("post");

    const Get_Axios=()=>{
        axios.get(`${url}/${page}`).then((r)=>{
            console.log(r.data,'r.data');
            setCustomerData(r.data);
        }).catch((err)=>{
            console.log(err,"err")
        })
    }
   
    useEffect(()=>{
        Get_Axios();
    },[page])

    const handleAdd=()=>{
        setShow(!show);
        setType("post");
    }
    const handleClose=()=>{
        setShow(false);
    }

    const handlePage=(e)=>{
        if(e.target.innerText==="Prev"){
            if(page>1){
                setPage(page-1)
            }else{
                alert("page can't be zero")
            }
            
        }else{
            setPage(page+1);
        }
        
    }

    const PostData=(data)=>{
        axios.post(`${url}/create`,data).then((r)=>{
            console.log(r.data,"r data");
            alert("added succesfully");
        }).catch((err)=>{
            console.log(err,"err");
        })
    }

    const EditData=(data)=>{
        axios.patch(`${url}/create`,data).then((r)=>{
            console.log(r.data,"r data");
            alert("Edited succesfully");
        }).catch((err)=>{
            console.log(err,"err");
        })
    }
    const handleSave=(e,data)=>{
        
        e.preventDefault();
        console.log(data,"data");
        if(type==="post"){
            PostData(data);
        }else{
            EditData(data);
        }
        
    }

    const handleEdit=()=>{
        setShow(true);
        setType("edit");
    }

    const handleDelete=()=>{

    }


  return (
    <div className='container'>
        <div className='heading'>
            <h2>Customer List</h2>
            <button onClick={handleAdd}>Add New Customer</button>
        </div>
        <div id={show?"show":"hide"}>
            {<ManagerCustomer handleClose={handleClose}  handleSave={handleSave} />}
        </div>
        <div>
            <table border={"2"} cellPadding="8">
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Full Name</td>
                        <td>Email</td>
                        <td>Country</td>
                        <td>State</td>
                        <td>City</td>
                        <td>Languages</td>
                        <td>Date</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                   {
                       customer_data.length>0 && customer_data.map((item,ind)=>{
                           // index is not appropriate to use as key but time purpose I am using it.
                            return(<tr key={ind}>
                                <td>{page*(ind+1)}</td>
                                <td>{item.customer.name}</td>
                                <td>{item.customer.email}</td>
                                <td>{item.country}</td>
                                <td>{item.state}</td>
                                <td>{item.city}</td>
                                <td>{item.languages}</td>
                                <td>{item.customer.createdDate}</td>
                                <td><button onClick={handleEdit}>Edit</button><button onClick={handleDelete}>Delete</button></td>
                            </tr>)
                       })
                   }
                </tbody>
                <tfoot>
                    <tr>
                        <th onClick={handlePage}>Prev</th>
                        <th>{page}</th>
                        <th onClick={handlePage}>next</th>
                    </tr>
                </tfoot>
               
            </table>
        </div>


    </div>
  )
}

export default CustomerList