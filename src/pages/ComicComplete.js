import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const ContentContainer = styled.div`
   display: flex;
   width: 100%;
   height: 95%;
   z-index: 1;
   flex-direction: column;
   flex-wrap: wrap;
   padding-top: 0.5em;
   padding-left: 2em;
   padding-bottom: 2em;
   justify-content: center;
   align-items: center;
   overflow-y: auto;
   margin-top: 1em;
   margin-bottom: 1em;
`;

export const ComicComplete = () => {
   const { state } = useLocation();
   const { id, image, price, text, title } = state;

   return (
      <ContentContainer>
         <img src={image} alt={title} />
         <h2>
            <strong>Title: </strong>
            {title}
         </h2>
         <p>
            <strong>Price: </strong>
            {price}
         </p>
         <p>{text}</p>
      </ContentContainer>
   );
};
