import React from "react";
import { useEffect } from "react";
import  axios  from 'axios';

const Index = ({_id}) => {
  useEffect(() => {
      axios.get(`/recipe/${_id}`).then((res)=>{
          console.log(r