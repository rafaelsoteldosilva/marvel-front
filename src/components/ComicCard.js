import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as heartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as heartSolid } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../globals/auth";
import { useNavigate } from "react-router-dom";

const Card = styled.div`
   position: relative;
   border-bottom: none;
   margin-bottom: 0.5em;
   margin: 1em;
   display: flex;
   flex-direction: column;
   align-items: center;
`;

const CardContent = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   width: 250px;
   height: 400px;
   border: 1px solid black;
   &:hover {
      filter: brightness(80%);
      border: 1px solid lightgray;
   }
   &:active {
      border: 1px solid red;
   }
`;

const CardImage = styled.img`
   width: 150px;
   height: 225px;
   border: 1px solid black;
`;

const CardNoImageContent = styled.div`
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   justify-content: flex-start;
   padding: 0.5em;
   height: 100px;
`;

const CardTitle = styled.p`
   pointer-events: none;
   font-weight: bold;
   text-align: left;
`;

const CardText = styled.div`
   pointer-events: none;
   font-weight: regular;
   text-align: left;
`;

const CardActionButtons = styled.div``;

const ShowIcon = styled(FontAwesomeIcon)`
   margin: 5px;
   font-size: 16px;
   color: ${(props) => (props.heartClicked ? "red" : "black")};
   &:hover {
      color: red;
   }
`;

const cutDescription = (description) => {
   let ellipsis = `${description}`.length > 90 ? "..." : "";
   return `${description}`.substring(0, 90).concat(ellipsis);
};

const ComicCard = ({ comicObject, index }) => {
   const auth = useAuth();
   const [heartClicked, setHeartClicked] = useState(false);

   let navigate = useNavigate();

   useEffect(() => {
      // if (auth.user) {
      //    const user = auth.user;
      //    if (user.favorites.includes(comicObject.id)) {
      //       setHeartClicked(true);
      //    }
      // }
   }, []);

   const handleClickOnComicCard = (comicObj, e) => {
      // navigate("/comicPath");
   };

   const handleHeartClick = (comicObj, e) => {
      setHeartClicked(!heartClicked);
   };

   return (
      <Card>
         <CardContent onClick={(e) => handleClickOnComicCard(comicObject, e)}>
            <CardImage src={comicObject.comicImageUrl} alt="Comic Thumbnail" />
            <CardNoImageContent>
               <CardTitle>{comicObject.comicTitle}</CardTitle>
               <CardText>{cutDescription(comicObject.comicText)}</CardText>
            </CardNoImageContent>
         </CardContent>
         <CardActionButtons>
            {auth.user && (
               <ShowIcon
                  heartClicked={heartClicked}
                  icon={heartClicked ? heartSolid : heartRegular}
                  onClick={(e) => handleHeartClick(comicObject, e)}
               />
            )}
         </CardActionButtons>
      </Card>
   );
};

export default ComicCard;
