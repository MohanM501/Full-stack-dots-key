import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
let url=`https://busy-puce-adder-sock.cyclic.app`

const ManagerCustomer = ({handleClose,handleSave}) => {
    const [data,setData]=useState({});
    const [countries,setCountries]=useState([]);
    const [states,setStates]=useState([]);
    const [cities,setCities]=useState([]);
    const [checked,setChecked]=useState(false);

    useEffect(()=>{
        axios.get(`${url}/searchable/country`).then((r)=>{
            setCountries(r.data);
        }).catch((err)=>{
            console.log(err,"err")
        })
    },[])

    const handleChange=(e)=>{
        let {name,value}=e.target;
        if(name==="isActive"){
            if(e.target.defaultChecked==false){
                value=false;
                setChecked(true);
            }else{
                value=true;
                setChecked(false);
            }
        }
        setData({...data,[name]:value});
        if(name==="country"){
            axios.get(`${url}/searchable/state/${value}`).then((r)=>{
                setStates(r.data);   
            })
        }else if(name==="state"){
            axios.get(`${url}/searchable/city/${value}`).then((r)=>{
                setCities(r.data);
            })
        }
        
    }
   
    
    
  return (
    <div>
        <form>
            <input name="name" type="string" placeholder='Enter full name' onChange={handleChange}/>
            <br/>
            <input name="email" type="Email" placeholder='Enter you email' onChange={handleChange}/>
            <br/>
            <input name="password" type="password" placeholder='Enter your password' onChange={handleChange}/>
            <br/>
            <select name="country" onChange={handleChange}>
                <option value="">Select Your Country</option>
                {
                    countries.length>0 && countries.map((item,ind)=>{
                        return(
                            <option key={ind} value={`${item.name}`}>{item.name}</option>
                        )
                    })
                }
            </select>
            <br/>
            <select name="state" onChange={handleChange}>
                <option value="">Select your State</option>
                {
                    states.length>0 && states.map((item,ind)=>{
                        return(
                            <option key={ind} value={`${item.name}`}>{item.name}</option>
                        )
                    })
                }
            </select>
            <br/>
            <select name="city" onChange={handleChange}>
                <option value="">Select your City</option>
                {
                    cities.length>0 && cities.map((item,ind)=>{
                        return(
                            <option key={ind} value={`${item.name}`}>{item.name}</option>
                        )
                    })
                }
            </select>
            <br/>
            
            <input name="languages" type="string" placeholder='Enter languages' onChange={handleChange} />
            <br/>

            <input name="isActive" type="checkbox" defaultChecked={checked} onChange={handleChange}/>
            Active
            <br/>
            <button onClick={handleClose}>Cancel</button>
            <button onClick={(e)=>handleSave(e,data)}>Save</button>
        </form>
    </div>
  )
}

export default ManagerCustomer