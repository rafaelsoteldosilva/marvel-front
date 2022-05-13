import * as comicsActionsConsts from "../actions/comicsActions";

const initialState = {
   comics: [],
   comicsError: "",
   comicsLoading: false,
   comicsLoaded: false,
};

const comicsReducer = (state = initialState, action) => {
   switch (action.type) {
      case comicsActionsConsts.GET_COMICS_BEGIN:
         return {
            ...state,
            comics: [],
            comicsLoading: true,
         };

      case comicsActionsConsts.GET_COMICS_SUCCESS:
         return {
            ...state,
            comics: action.payload,
            comicsLoading: false,
            comicsLoaded: true,
         };

      case comicsActionsConsts.GET_COMICS_FAILURE:
         return {
            ...state,
            comicsLoading: false,
            comicsLoaded: false,
            comicsError: action.payload,
         };

      default:
         return state;
   }
};

export default comicsReducer;
