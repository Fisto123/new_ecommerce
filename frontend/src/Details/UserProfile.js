import axios from "axios";
import { MDBSpinner } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";

const UserProfile = () => {
   const id = useParams().id;
    const [user, setUser] = useState({
      name:"",
      email:"",
      isAdmin:false,
      password:""
    });
     const [updating, setUpdating] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const response = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/user/api/getUserId/${id}`,
        );
        setUser({
          ...res.data,
          password:""
        })
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    response();
  }, [id]);
  console.log(user);
  const handleSubmit = async (e) =>{
    e.preventDefault()
    setUpdating(true);
    try {
       const res = await axios.put(
          `http://localhost:5000/user/api/updateUser/${id}`,
          {
            ...user
          }
        );
        setUser({...res.data,password:''})
        toast.success('profile updated')
    } catch (error) {
      console.log(error);
    }
      setUpdating(false);
  }

  return <StyledProfile>
    <ProfileContainer>
      {
        loading ? <MDBSpinner/>
        : (
          <form onSubmit={handleSubmit}>
            <h3>User Profile</h3>
            {user.isAdmin ? (
              <Admin>Admin</Admin>
            ):(
             <Customer>Customer</Customer>
            )}
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={user?.name} onChange={(e)=>setUser({...user,name:e.target.value})} />
             <label htmlFor="email">Email:</label>
            <input type="text" id="email" value={user?.email} onChange={(e)=>setUser({...user,email:e.target.value})} />
             <label htmlFor="password">password:</label>
            <input type="password" id="email" value={user?.password} onChange={(e)=>setUser({...user,password:e.target.value})} />
            <button type="submit">{updating? 'updating' : "update profile"}</button>
          </form>
        )
      }
    </ProfileContainer>
  </StyledProfile>;
};

export default UserProfile;
const StyledProfile = styled.div `
  margin:3rem;
  display: flex;
  justify-content: center;
`
const ProfileContainer = styled.div `
max-width: 500px;
width: 100%;
height:auto;
box-shadow:rgba(100,100,111,0.2) 0px 7px 29px 0px;
border-radius:5px;
padding:2rem;
form {
  display:flex;
  flex-direction: column;
  align-items: flex-start;
  h3{
    margin-bottom: 0.5rem;
  }
  label{
     margin-bottom: 0.2rem;
     color:grey
  }
  input{
    margin-bottom:1rem;
    outline: none;
    border: none;
    border-bottom:1px solid grey
  }
  }
`
const Admin = styled.div`
  color: rgb(225, 181, 40);
   background-color: rgb(253, 181, 40, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;
const Customer = styled.div`
  color: rgb(35, 198, 249);
   background-color: rgb(38, 198, 249, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;
