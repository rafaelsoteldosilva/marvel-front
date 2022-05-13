import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllFavoritesComics } from "../redux/actions/favoriteComicsActions";
import { useAuth } from "../globals/auth";
import styled from "styled-components";
import ComicCard from "../components/ComicCard";

const ContentContainer = styled.div`
   display: flex;
   position: fixed;
   width: 100%;
   height: 95%;
   z-index: 1;
   flex-direction: row;
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

const Favorites = ({ favoriteComics, favoriteComicsLoaded }) => {
   const auth = useAuth();

   return (
      <React.Fragment>
         {!favoriteComicsLoaded && (
            <ContentContainer>
               <p>Loading data...</p>
            </ContentContainer>
         )}
         {favoriteComicsLoaded && (
            <ContentContainer>
               {favoriteComics.map((comicInfo, ndx) => {
                  return (
                     <ComicCard
                        callFromFavorites={true}
                        comicObject={comicInfo}
                        index={ndx}
                     />
                  );
               })}
            </ContentContainer>
         )}
      </React.Fragment>
   );
};

function mapStateToProps(state) {
   return {
      favoriteComics: state.favoriteComicsReducer.favoriteComics,
      favoriteComicsLoaded: state.favoriteComicsReducer.favoriteComicsLoaded,
   };
}

// function mapDispatchToProps(dispatch) {
//    return {
//       getComics: () => {
//          return dispatch(getAllFavoritesComics());
//       },
//    };
// }

export default connect(mapStateToProps, null)(Favorites);
