// import React, { useState } from 'react';
import React, { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/";

function App() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
    state: ""
  });

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post("/create", formData);
    // console.log(data);
  
  }


  const [dataList, setdataList] = useState([]);
  const fetchData = async () => {
    const data = await axios.get("/");
    if (data.data.success) {
      setdataList(data.data.data);
      fetchData();
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  // console.log(dataList)

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }


  const handleDelete = async (id) => {
    const data = await axios.delete("/delete/" + id);
    // alert(data.data.message);
    fetchData();

  }


  return (
    <div >

      <form onSubmit={handleOnSubmit} >

        <input type="text" placeholder='Name' required name="name" onChange={handleOnChange} />

        <input type="email" placeholder='Email' required name="email" onChange={handleOnChange} />

        <input type="tel" placeholder='Mobile' required name="mobile" onChange={handleOnChange} />

        <input type="text" placeholder='City' required name="city" onChange={handleOnChange} />

        <input type="text" placeholder='State' required name="state" onChange={handleOnChange} />

        <button type='submit'>Submit</button>

      </form>

      <table>
        <thead>

          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>City</th>
            <th>State</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>

          {

            dataList.map((e1) => {

              return (
                <tr>
                  <td>{e1.name}</td>
                  <td>{e1.email}</td>
                  <td>{e1.mobile}</td>
                  <td>{e1.city}</td>
                  <td>{e1.state}</td>
                  <td className='bt'><button className='b1'>Edit</button></td>
                  <td className='bt'><button className='b2' onClick={()=> handleDelete(e1._id)}>Delete</button></td>
                </tr>
              )

            })

          }


        </tbody>

      </table>

    </div>
  );
}

export default App;
