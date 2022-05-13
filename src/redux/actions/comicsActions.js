import axios from "axios";
import env from "react-dotenv";

export const GET_COMICS_BEGIN = "GET_COMICS_BEGIN";
export const GET_COMICS_SUCCESS = "GET_COMICS_SUCCESS";
export const GET_COMICS_FAILURE = "GET_COMICS_FAILURE";

const getComicsBegin = () => ({
   type: GET_COMICS_BEGIN,
});

const getComicsSuccess = (myComics) => ({
   type: GET_COMICS_SUCCESS,
   payload: myComics,
});

const getComicsFailure = (error) => ({
   type: GET_COMICS_FAILURE,
   payload: error,
});

export function getAllComics() {
   return (dispatch) => {
      let newDataObject = [];
      dispatch(getComicsBegin);
      let apiUrl = `https://gateway.marvel.com/v1/public/comics?ts=1&apikey=f0bb0ad1457c53c928d333e245ab9226&hash=63a07509201a80b78f98099542b9b048`;
      axios
         .get(apiUrl)
         .then((res) => {
            res.data.data.results.forEach((comic) => {
               newDataObject.push({
                  comicId: comic.id,
                  comicTitle: comic.title,
                  comicPrice: comic.prices[0].price,
                  comicImageUrl: `${comic.thumbnail.path}/portrait_xlarge.jpg`,
                  comicText:
                     comic.textObjects.length > 0
                        ? comic.textObjects[0].text
                        : "No text available",
               });
            });

            dispatch(getComicsSuccess(newDataObject));
         })
         .catch((error) => {
            dispatch(getComicsFailure(error));
         });
   };
}
