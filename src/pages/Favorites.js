import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllComics } from "../redux/actions/comicsActions";
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

const Home = ({ comics, comicsLoaded, getComics }) => {
   const auth = useAuth();

   useEffect(() => {
      getComics();
   }, []);

   return (
      <React.Fragment>
         {!comicsLoaded && (
            <ContentContainer>
               <p>Loading data...</p>
            </ContentContainer>
         )}
         {comicsLoaded && (
            <ContentContainer>
               {comics.map((comicInfo, ndx) => {
                  return <ComicCard comicObject={comicInfo} index={ndx} />;
               })}
            </ContentContainer>
         )}
      </React.Fragment>
   );
};

function mapStateToProps(state) {
   return {
      comics: state.comicsReducer.comics,
      comicsLoaded: state.comicsReducer.comicsLoaded,
   };
}

function mapDispatchToProps(dispatch) {
   return {
      getComics: () => {
         return dispatch(getAllComics());
      },
   };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
