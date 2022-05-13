import * as favoriteComicsActionConsts from "../actions/favoriteComicsActions";

const initialState = {
   favoriteComics: [],
   favoriteComicsError: "",
   favoriteComicsLoading: false,
   favoriteComicsLoaded: false,
};

const favoriteComicsReducer = (state = initialState, action) => {
   switch (action.type) {
      case favoriteComicsActionConsts.FAVORITE_COMICS_RESTART:
         return initialState;

      case favoriteComicsActionConsts.GET_FAVORITE_COMICS_BEGIN:
         return {
            ...state,
            favoriteComics: [],
            favoriteComicsLoading: true,
         };

      case favoriteComicsActionConsts.GET_FAVORITE_COMICS_SUCCESS:
         return {
            ...state,
            favoriteComics: action.payload,
            favoriteComicsLoading: false,
            favoriteComicsLoaded: true,
         };

      case favoriteComicsActionConsts.GET_FAVORITE_COMICS_FAILURE:
         return {
            ...state,
            favoriteComicsLoading: false,
            favoriteComicsLoaded: false,
            favoriteComicsError: action.payload,
         };

      default:
         return state;
   }
};

export default favoriteComicsReducer;
