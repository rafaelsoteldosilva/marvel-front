import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeartCrack } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../globals/auth";
import { useNavigate } from "react-router-dom";

import {
   getAllFavoriteComics,
   addFavoriteComic,
   deleteFavoriteComic,
} from "../redux/actions/favoriteComicsActions";

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
   color: ${(props) => (props.heartIsRed ? "red" : "black")};
   &:hover {
      color: red;
   }
`;

const cutDescription = (description) => {
   let ellipsis = `${description}`.length > 90 ? "..." : "";
   return `${description}`.substring(0, 90).concat(ellipsis);
};

const ComicCard = ({
   callFromFavorites,
   comicObject,
   index,
   favoriteComics,
   addFavoriteComicLocal,
   deleteFavoriteComicLocal,
}) => {
   const { user } = useAuth();

   let navigate = useNavigate();

   const handleClickOnComicCard = (comicObj, e) => {
      // navigate("/comicPath");
   };

   const handleHeartClick = (comicObj, e) => {
      if (user) {
         if (callFromFavorites) {
            deleteFavoriteComicLocal(user.id, comicObj.id);
         } else {
            // calling from Home page

            if (
               favoriteComics.find(
                  (favoriteComic) => favoriteComic.id === comicObj.id
               )
            ) {
               deleteFavoriteComicLocal(user.id, comicObj.id);
            } else {
               addFavoriteComicLocal(user._id, comicObj);
            }
         }
      }
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
            {user && (
               <ShowIcon
                  heartIsRed={false}
                  icon={callFromFavorites ? faHeartCrack : regularHeart}
                  onClick={(e) => handleHeartClick(comicObject, e)}
               />
            )}
         </CardActionButtons>
      </Card>
   );
};

function mapStateToProps(state) {
   return {
      favoriteComics: state.favoriteComicsReducer.favoriteComics,
   };
}

function mapDispatchToProps(dispatch) {
   return {
      addFavoriteComicLocal: (userId, comicObj) => {
         return dispatch(addFavoriteComic(userId, comicObj));
      },
      deleteFavoriteComicLocal: (userId, favoriteComicId) => {
         return dispatch(deleteFavoriteComic(userId, favoriteComicId));
      },
   };
}

export default connect(mapStateToProps, mapDispatchToProps)(ComicCard);
