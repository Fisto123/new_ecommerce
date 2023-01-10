import { Box, Card, Typography } from '@mui/material'
import axios from 'axios'
import { MDBSpinner } from 'mdb-react-ui-kit'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

const Order = () => {
    const [loading,setLoading] = useState(false)
     const [order,setOrder] = useState([])
    const id = useParams().id;
console.log(id);
    useEffect(()=>{
        const fetchData = async()=>{
                setLoading(true)
           try {
            setLoading(false)
            const res = await axios.get(`http://localhost:5000/orders/api/getOrder/${id}`)
            setOrder(res.data)
          } catch (error) {
            console.log(error);
             setLoading(false)
          }
        }
       fetchData()
    },[id])
    console.log(order);
  return (
    <>
    {loading? <MDBSpinner/>: <>
      <Card sx={{height:'auto',width:'520px',position:'absolute', top:'30%',left:'30%',padding:'30px'}}>
        <Box>
          <Typography sx={{color:'black',fontSize:'1.5rem'}}>Order Details</Typography>
          <Box sx={{display:'flex'}}> <Typography sx={{fontSize:'1.0rem'}}>Delivery status</Typography >:<DeliveryBtn >
            {order.delivery_status === 'pending'?(
                <Pending>Pending</Pending>
            )
            : order.delivery_status === 'dispatched'?(
                <Dispatched>Dispatched</Dispatched>
            ):
            order.delivery_status === 'delivered'?(
                <Delivered>Delivered</Delivered>
            ): ""
        }
            </DeliveryBtn>
          </Box>
        </Box>
           <Box>
          <Typography sx={{color:'black',fontSize:'1.5rem'}}>Order Products</Typography>
          {
            order.products?.map((product,index)=>(
                <>
                
                <Box sx={{display:'flex'}}> <Typography sx={{fontSize:'1.0rem'}}>{product?.description}</Typography >:<Typography >{(product.price.unit_amount/100).toLocaleString()} *{product.quantity}product(s)  </Typography>
                
          </Box>
          <Box sx={{display:'flex',color:'black'}}> <Typography sx={{fontSize:'1.0rem'}}>${(product?.amount_total/100).toLocaleString()}</Typography >
                
          </Box>
          </>
            ))
          }
         
        </Box>
           <Box>
          <Typography sx={{color:'black',fontSize:'1.5rem'}}>Total Price</Typography>
          <Box sx={{display:'flex'}}> <Typography sx={{fontSize:'1.0rem'}}>${(order?.total/100).toLocaleString()}</Typography >
          </Box>
        </Box>
        <Box> 
          <Typography sx={{color:'black',fontSize:'1.5rem'}}>Shipping Details</Typography>
           <Typography>Customer: {order?.shipping?.name}</Typography>
            <Typography>City: {order?.shipping?.address?.city}</Typography>
             <Typography>Email: {order?.shipping?.email}</Typography> 
          </Box>
     </Card>
    </>}
    
     </>
  )
}

export default Order

const DeliveryBtn = styled.div`
   background-color: purple;
   cursor: pointer;
   color:white;
   margin-left:5px
`;
const Pending = styled.div`
  color: rgb(253, 181, 40);
   background-color: rgb(253, 181, 40, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
  cursor: pointer;
`;
const Dispatched = styled.div`
  color: rgb(38, 198, 249);
   background-color: rgb(38, 198, 249, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;
const Delivered = styled.div`
  color: rgb(102, 108, 255);
   background-color: rgb(102, 108, 255, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;