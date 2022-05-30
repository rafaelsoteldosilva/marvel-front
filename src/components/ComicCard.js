import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
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

const ShowIconFavorite = styled(FontAwesomeIcon)`
   margin: 5px;
   font-size: 16px;
   color: rgb(128, 128, 128);
   &:hover {
      color: black;
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

   // comicId: 82965;
   // comicImageUrl: "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/portrait_xlarge.jpg";
   // comicPrice: 0;
   // comicText: "No text available";
   // comicTitle: "Marvel Previews (2017)";

   const handleClickOnComicCard = (comicObj, e) => {
      navigate("/comicComplete", {
         state: {
            id: comicObj.comicId,
            image: comicObj.comicImageUrl,
            title: comicObj.comicTitle,
            text: comicObj.comicText,
            price: comicObj.comicPrice,
         },
      });
   };

   const isFavorite = (favoriteComics, comicObject) => {
      let isFavorite = false;
      if (favoriteComics.length > 0) {
         favoriteComics.forEach((favoriteComic) => {
            if (parseInt(favoriteComic.comicId) === comicObject.comicId) {
               isFavorite = true;
            }
         });
      }
      return isFavorite;
   };

   const isfavorite = (favoriteComics, comicObject) => {
      let isFavorite = false;
      if (favoriteComics.length > 0) {
         favoriteComics.forEach((favoriteComic) => {
            if (parseInt(favoriteComic.comicId) === comicObject.comicId) {
               isFavorite = true;
            }
         });
      }
      return isFavorite;
   };

   const handleHeartClick = (comicObj, e) => {
      if (user) {
         if (isFavorite(favoriteComics, comicObj)) {
            deleteFavoriteComicLocal(user._id, comicObj.comicId);
         } else {
            addFavoriteComicLocal(user._id, comicObj);
         }
      }
   };

   const handleBrokenHeartClick = (comicObj, e) => {
      if (user) {
         deleteFavoriteComicLocal(user._id, comicObj.id);
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
            {user && callFromFavorites && (
               <ShowIconFavorite
                  icon={faHeartCrack}
                  onClick={(e) => handleBrokenHeartClick(comicObject, e)}
               />
            )}
            {user && !callFromFavorites && (
               <ShowIcon
                  heartIsRed={isFavorite(favoriteComics, comicObject)}
                  isFavorite={callFromFavorites}
                  icon={
                     callFromFavorites
                        ? faHeartCrack
                        : isFavorite(favoriteComics, comicObject)
                        ? solidHeart
                        : regularHeart
                  }
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
