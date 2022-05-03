// import { csrfFetch } from "./csrf";

// // ACTION VARIABLES ***************************************
// const LOAD_LIKES = 'likes/LOAD_LIKES';
// const LOAD_SONGS_LIKES = 'likes/LOAD_SONGS_LIKES'
// const LOAD_USERS_LIKES = 'likes/LOAD_USERS_LIKES'
// const ADD_LIKE = 'likes/ADD_LIKE';
// const REMOVE_LIKE = 'likes/REMOVE_LIKE';


// // ACTION CREATORS ****************************************
// const loadLikes = (likes) => {
//   return {
//     type: LOAD_LIKES,
//     likes
//   }
// }

// const loadSongsLikes = (likes) => {
//   return {
//     type: LOAD_SONGS_LIKES,
//     likes
//   }
// }

// const loadUsersLikes = (likes) => {
//   return {
//     type: LOAD_USERS_LIKES,
//     likes
//   }
// }

// const addLike = (like) => {
//   return {
//     type: ADD_LIKE,
//     like
//   }
// }

// const removeLike = (like) => {
//   return {
//     type: REMOVE_LIKE,
//     like
//   }
// }


// // THUNK ACTION CREATORS **********************************
// export const fetchLikes = () => async dispatch => {
//   const res = await fetch(`/api/likes`);

//   if (res.ok) {
//     const likes = await res.json();
//     dispatch(loadLikes(likes));
//   }
// }

// export const fetchSongsLikes = songId => async dispatch => {
//   const res = await fetch(`/api/likes/${songId}`);

//   if (res.ok) {
//     const likes = await res.json();
//     dispatch(loadSongsLikes(likes));
//   }
// }

// export const fetchUsersLikes = userId => async dispatch => {
//   const res = await fetch(`/api/users/${userId}/likes`);

//   if (res.ok) {
//     const likes = await res.json();
//     dispatch(loadUsersLikes(likes));
//     return likes;
//   }

// }

// export const postLike = (userId, songId) => async dispatch => {
//   const res = await csrfFetch(`/api/likes`, {
//     method: 'POST',
//     body: JSON.stringify({ userId, songId })
//   });

//   if (res.ok) {
//     const like = await res.json();
//     dispatch(addLike(like));
//     return like;
//   }
// }

// export const deleteLike = (userId, songId) => async dispatch => {
//   const res = await csrfFetch(`/api/likes/${userId}/${songId}`, {
//     method: 'DELETE',
//   });

//   if (res.ok) {
//     const like = await res.json();
//     dispatch(removeLike(like));
//     return like;
//   }
// }


// // REDUCER ************************************************
// const initialState = { allLikes: {}, songsLikes: {}, usersLikes: {}, usersLikes2: [] }
// const likesReducer = (state = initialState, action) => {
//   let newState;
//   switch (action.type) {
//     case LOAD_LIKES: {
//       const allLikes = {};
//       const songsLikes = {};
//       const usersLikes = {};
//       const usersLikes2 = [ ...state.usersLikes2 ];

//       action.likes.forEach(like => {
//         allLikes[like.id] = like;

//         if (!songsLikes[like.songId]) {
//           songsLikes[like.songId] = [like];
//         } else {
//           songsLikes[like.songId].push(like);
//         }

//         if (!usersLikes[like.userId]) {
//           usersLikes[like.userId] = [like];
//         } else {
//           usersLikes[like.userId].push(like);
//         }

//       });
      
//       return { allLikes, songsLikes, usersLikes, usersLikes2 };
//     }

//     case LOAD_SONGS_LIKES: {
//       newState = { ...state };
//       action.likes.forEach(like => {
//         newState.songsLikes[like.userId] = like;
//       });
//       return newState;
//     }

//     case LOAD_USERS_LIKES: {
//       const usersLikes2 = [...action.likes];
//       return { ...state, usersLikes2 };
//     }

//     case ADD_LIKE: {
//       const allLikes = { ...state.allLikes };
//       const songsLikes = { ...state.songsLikes };
//       const usersLikes = { ...state.usersLikes };
//       const like = action.like;

//       allLikes[like.id] = like;

//       if (!songsLikes[like.songId]) {
//         songsLikes[like.songId] = [like];
//       } else {
//         songsLikes[like.songId] = [...songsLikes[like.songId], like]
//       }

//       if (!usersLikes[like.userId]) {
//         usersLikes[like.userId] = [like];
//       } else {
//         usersLikes[like.userId] = [...usersLikes[like.userId], like];
//       }
      
//       const usersLikes2 = [ ...state.usersLikes2, action.like ];

//       return { allLikes, songsLikes, usersLikes, usersLikes2 };
//     }

//     case REMOVE_LIKE: {
//       const newState = { ...state };
//       const songsLikes = { ...state.songsLikes };
//       const usersLikes = { ...state.usersLikes };
//       const oldUsersLikes2 = [ ...state.usersLikes2 ];

//       delete newState.allLikes[action.like.id];

//       const newSongsLikes = songsLikes[action.like.songId].filter(like => like.id !== action.like.id);
//       songsLikes[action.like.songId] = newSongsLikes;

//       const newUsersLikes = usersLikes[action.like.userId].filter(like => like.id !== action.like.id);
//       usersLikes[action.like.userId] = newUsersLikes;

//       const usersLikes2 = oldUsersLikes2.filter(like => like.id !== action.like.id);
      
//       return { ...newState, songsLikes, usersLikes, usersLikes2 };
//     }

//     default: {
//       return state;
//     }
//   }
// }

// export default likesReducer;
