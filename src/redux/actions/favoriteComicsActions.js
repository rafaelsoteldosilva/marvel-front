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
      let apiUrl = "http://localhost:3000/v1/favoriteComics/?userId=" + userId;
      axios
         .get(apiUrl)
         .then((res) => {
            let newDataObject = [];
            console.log(
               "************** getAllFavoriteComics:: res.data: ",
               res.data
            );
            res.data.forEach((comic) => {
               newDataObject.push({
                  userId,
                  favoriteComicId: comic.favoriteComicId,
                  favoriteComicTitle: comic.favoriteComicTitle,
                  favoriteComicPrice: comic.favoriteComicPrice,
                  favoriteComicImageUrl: comic.favoriteComicImageUrl,
                  favoriteComicText: comic.favoriteComicText,
               });
            });
            dispatch(getFavoriteComicsSuccess(newDataObject));
         })
         .catch((error) => {
            dispatch(getFavoriteComicsFailure(error));
         });
   };
}

export function addFavoriteComic(userId, favoriteComicObject) {
   return (dispatch) => {
      let apiUrl = "http://localhost:3000/v1/favoriteComics/?userId=" + userId;
      axios
         .post(apiUrl, { favoriteComicObject })
         .then(() => {
            dispatch(favoriteComicsReset());
            dispatch(getAllFavoriteComics(userId));
         })
         .catch((error) => console.log(error));
   };
}

export function deleteFavoriteComic(userId, favoriteComicId) {
   return (dispatch) => {
      let apiUrl = `http://localhost:3000/v1/favoriteComics/?userId=${userId}&favoriteComicId=${favoriteComicId}`;
      axios
         .delete(apiUrl)
         .then(() => {
            dispatch(favoriteComicsReset());
            dispatch(getAllFavoriteComics(userId));
         })
         .catch((error) => console.log(error));
   };
}
