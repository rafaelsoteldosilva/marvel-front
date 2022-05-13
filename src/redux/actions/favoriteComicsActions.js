import axios from "axios";

export const GET_FAVORITE_COMICS_BEGIN = "GET_FAVORITE_COMICS_BEGIN";
export const GET_FAVORITE_COMICS_SUCCESS = "GET_FAVORITE_COMICS_SUCCESS";
export const GET_FAVORITE_COMICS_FAILURE = "GET_FAVORITE_COMICS_FAILURE";
export const FAVORITE_COMICS_RESTART = "SET_FAVORITE_COMICS_RESTART";

export const favoriteComicsReset = () => ({
   type: FAVORITE_COMICS_RESTART,
});

export const getFavoriteComicsBegin = () => ({
   type: GET_FAVORITE_COMICS_BEGIN,
});

export const getFavoriteComicsSuccess = (myFavoriteComicss) => ({
   type: GET_FAVORITE_COMICS_SUCCESS,
   payload: myFavoriteComicss,
});

export const getFavoriteComicsFailure = (error) => ({
   type: GET_FAVORITE_COMICS_FAILURE,
   payload: error,
});

export function getAllFavoriteComics(userId) {
   return (dispatch) => {
      dispatch(getFavoriteComicsBegin);
      let apiUrl = "http://localhost:3001/v1/favoritecomics/?userId=" + userId;
      axios
         .get(apiUrl)
         .then((res) => {
            let newDataObject = [];
            res.data.forEach((comic) => {
               newDataObject.push({
                  userId,
                  comicId: comic.comicId,
                  comicTitle: comic.comicTitle,
                  comicPrice: comic.comicPrice,
                  comicImageUrl: comic.comicImageUrl,
                  comicText: comic.comicText,
               });
            });
            dispatch(getFavoriteComicsSuccess(newDataObject));
         })
         .catch((error) => {
            dispatch(getFavoriteComicsFailure(error));
         });
   };
}

export function addFavoriteComic(userId, comicObject) {
   return (dispatch) => {
      let apiUrl = `http://localhost:3001/v1/favoritecomics/?userId=${userId}`;
      let newFavoriteComicObect = {
         comicId: comicObject.comicId,
         comicTitle: comicObject.comicTitle,
         comicPrice: comicObject.comicPrice,
         comicImageUrl: comicObject.comicImageUrl,
         comicText: comicObject.comicText,
      };

      axios
         .post(apiUrl, newFavoriteComicObect)
         .then(() => {
            dispatch(favoriteComicsReset());
            dispatch(getAllFavoriteComics(userId));
         })
         .catch((error) => console.log(error));
   };
}

export function deleteFavoriteComic(userId, favoriteComicId) {
   return (dispatch) => {
      let apiUrl = `http://localhost:3001/v1/favoritecomics/?userId=${userId}&favoriteComicId=${favoriteComicId}`;
      console.log(apiUrl);
      axios
         .delete(apiUrl)
         .then(() => {
            dispatch(favoriteComicsReset());
            dispatch(getAllFavoriteComics(userId));
         })
         .catch((error) => console.log(error));
   };
}
