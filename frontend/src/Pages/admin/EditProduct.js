import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { productUpdate } from "../../redux/productSlice";
import { PrimaryButton } from "./CommonStyled";

export const EditProduct = ({ prodId }) => {
  const [name, setName] = useState(null);
  const [brand, setBrand] = useState(null);
  const [desc, setDesc] = useState(null);
  const [price, setPrice] = useState(null);
  const [currentProduct, setCurrentProduct] = useState([]);
  const { items } = useSelector((state) => state.product);
  const [open, setOpen] = useState(false);

  const [currentProductImage, setCurrentProductImage] = useState([]);
  const [imgPreview, setImgPreview] = useState(null);
  const handleClickOpen = () => {
    let selectedProd = items.filter((item) => item._id === prodId);
    selectedProd = selectedProd[0];
    setCurrentProduct(selectedProd);
    setName(selectedProd.name);
    setDesc(selectedProd.desc);
    setPrice(selectedProd.price);
    setBrand(selectedProd.brand);
    setCurrentProductImage(selectedProd.image);
    setOpen(true)
  };
  console.log(currentProductImage);
  const handleClose = () => {
    setOpen(false);
  };

  //const dispatch  = useDispatch()
  const [img, setImg] = useState(undefined);
  const dispatch = useDispatch();
  const [imgperc, setImgPerc] = useState(0);

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "image" && setImgPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
           setCurrentProductImage(downloadURL);
        });
      }
    );
  };
  console.log(imgPreview);
  useEffect(() => {
    img && uploadFile(img, "image");
  }, [img]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      productUpdate({
         
        product: {
          ...currentProduct,
          name,
          brand,
          price,
          desc,
          image:currentProductImage,
          
        },
      })
    );
  };
  return (
    <div>
      <Edit variant="outlined" onClick={handleClickOpen}>
        Edit
      </Edit>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <StyledCreateProduct>
            <StyledForm onSubmit={handleSubmit}>
              <h3>Create a Product</h3>
              <input
                id="imgUpload"
                accept="image/*"
                type="file"
                onChange={(e) => setImg(e.target.files[0])}
                required
              />
              <select
                required
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              >
                <option disabled value="change Brand">change brand</option>
                <option value="iphone">iPhone</option>
                <option value="samsung">Samsung</option>
                <option value="xiomi">Xiomi</option>
                <option value="other">Other</option>
              </select>
              <input
                type="text"
                placeholder='name'
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="number"
                value={price}
                placeholder='price'
                required
                onChange={(e) => setPrice(e.target.value)}
              />
              <input
                type="text"
                placeholder='description'
                value={desc}
                required
                onChange={(e) => setDesc(e.target.value)}
              />

              <PrimaryButton onClick={handleSubmit} type="submit">
                submit
              </PrimaryButton>
            </StyledForm>
          
            <ImagePreview>
              <h5>Your product</h5>
                  <img src={currentProductImage} alt="error!" />
            </ImagePreview>
            <ImagePreview>
             <h5>Uploading products......</h5>
              {img ? (
                <>
                  <img src={imgPreview} alt="error!" />
                </>
              ) : (
                <p>Product image upload preview will appear here!</p>
              )}
            </ImagePreview>
          </StyledCreateProduct>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
const Edit = styled.button`
 border: none;
    outline: none;
    padding: 3px 5px;
    border-radius: 3px;
    cursor: pointer;
    padding: 10px;
  background-color: #4b70e2;
`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin-top: 2rem;
  select,
  input {
    padding: 7px;
    min-height: 30px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(182, 182, 182);
    margin: 0.3rem 0;
    &:focus {
      border: 2px solid rgb(0, 208, 255);
    }
  }
  select {
    color: rgb(95, 95, 95);
  }
`;

const StyledCreateProduct = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImagePreview = styled.div`
  margin: 2rem 0 2rem 2rem;
  padding: 2rem;
  border: 1px solid rgb(183, 183, 183);
  max-width: 300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: rgb(78, 78, 78);
  img {
    max-width: 100%;
  }
`;
