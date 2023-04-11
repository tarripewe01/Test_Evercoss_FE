import axios from "axios";
import React, { useEffect, useState } from "react";

const Dashboard = () => {

  const [name, setName] = useState("");
  const [data, setdata] = useState();

  // console.log('data', data)

  useEffect(() => {
    const decoded = JSON.parse(localStorage.getItem('decoded'));
    // console.log('data',decoded)
    setName(decoded.name)

    loadData()
  }, [])
  
  const loadData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:4000/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setdata(response.data)
    } catch (error) {
      console.log(error);
    }
  };
  


  return (
    <div className="container mt-5 ml-5">
      <h1>Welcome Back: {name}</h1>
      {
        data?.map((item)=>{
          return(
            <div className="card mt-5" >
              <div className="card-content">
                <p className="title is-4">{item.name}</p>
                <p className="subtitle is-6">{item.email}</p>
              </div>
            </div>
          )
        })
      }
    </div>
  );
};

export default Dashboard;
