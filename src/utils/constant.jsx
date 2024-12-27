export const App_Logo = "https://media.istockphoto.com/id/1642381175/vector/cinema.jpg?s=612x612&w=0&k=20&c=owIct55daWlWRwPbTYLI9Y1IsrgYiqJcpvvgycvxBhE="

export const USER_LOGO = "https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-dyrp6bw6adbulg5b.jpg"

export const BACK_PIC = "https://assets.nflxext.com/ffe/siteui/vlv3/cacfadb7-c017-4318-85e4-7f46da1cae88/e43aa8b1-ea06-46a5-abe3-df13243e718d/IN-en-20240603-popsignuptwoweeks-perspective_alpha_website_large.jpg"

export const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: "Bearer " + process.env.REACT_APP_TMDB_KEY,
    }
  };

  export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w780"

  
  export const SUPPORTED_LANGUAGES = [
    {identifier:"en", name: "English"},
    {identifier:"hindi", name: "Hindi"},
    {identifier:"spanish", name: "Spanish"},
  ]


export const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;