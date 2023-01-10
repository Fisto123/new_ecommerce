import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { PrimaryButton } from "./CommonStyled";
import { productCreate } from "../../redux/productSlice";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../firebase/firebase";
export const CreateProduct = () => {
  const initialState = {
    name: "",
    brand: "",
    desc: "",
    price: "",
  };
  //const dispatch  = useDispatch()
  const handleChange = (e) => {
    setInputs((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const [img, setImg] = useState(undefined);
  const dispatch = useDispatch();
  const [imgperc, setImgPerc] = useState(0);
  console.log(imgperc);
  const [inputs, setInputs] = useState(initialState);
  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    console.log(fileName);
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
          setInputs((prev) => {
            return {
              ...prev,
              [urlType]: downloadURL,
            };
          });
        });
      }
    );
  };

  useEffect(() => {
    img && uploadFile(img, "image");
  }, [img]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(productCreate(inputs))
    window.location.reload('/admin/products/productlist')
  };
  return (
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
        <select required onChange={handleChange} name="brand">
          <option value="">Select Brand</option>
          <option value="iphone">iPhone</option>
          <option value="samsung">Samsung</option>
          <option value="xiomi">Xiomi</option>
          <option value="other">Other</option>
        </select>
        <input
          type="text"
          placeholder="Name"
          onChange={handleChange}
          required
          name="name"
        />
        <input
          type="number"
          placeholder="price"
          onChange={handleChange}
          required
          name="price"
        />
        <input
          type="text"
          placeholder="Short Description"
          onChange={handleChange}
          required
          name="desc"
        />

        <PrimaryButton type="submit">submit</PrimaryButton>
      </StyledForm>
      <ImagePreview>
        {img ? (
          <>
            <img src={inputs.image} alt='loading image' />
          </>
        ) : (
          <p>Product image upload preview will appear here!</p>
        )}
      </ImagePreview>
    </StyledCreateProduct>
  );
};
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
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: rgb(78, 78, 78);
  img {
    max-width: 100%;
  }
`;
