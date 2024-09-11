const redux = require('redux')
const thunkMiddleware = require('redux-thunk').default
const https = require('https');
const axios = require('axios')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware

const initialState = {
  loading: false,
  users: [],
  error: ''
}

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST
  }
}

const fetchUsersSuccess = users => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users
  }
}

const fetchUsersFailure = error => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error
  }
}

// const fetchUsers = () => {
//   return function (dispatch) {
//     dispatch(fetchUsersRequest())
//     axios
//       .get('https://jsonplaceholder.typicode.com/users')
//       .then(response => {
//         // response.data is the users
//         const users = response.data.map(user => user.id)
//         dispatch(fetchUsersSuccess(users))
//       })
//       .catch(error => {
//         // error.message is the error message
//         dispatch(fetchUsersFailure(error.message))
//       })
//   }
// }
// const fetchUsers = () => {
//     return function (dispatch) {
//       dispatch(fetchUsersRequest());
//       axios
//         .get('https://jsonplaceholder.typicode.com/users', {
//           httpsAgent: new https.Agent({ rejectUnauthorized: false })
//         })
//         .then(response => {
//           const users = response.data.map(user => user.id);
//           dispatch(fetchUsersSuccess(users));
//         })
//         .catch(error => {
//           dispatch(fetchUsersFailure(error.message));
//         });
//     };
//   };
const fetchUsers = () => {
    const agent = new https.Agent({
      rejectUnauthorized: false, // Don't reject self-signed certificates
    });
  
    return function (dispatch) {
      dispatch(fetchUsersRequest());
      axios
        .get('https://your-server-url.com/api/users', { httpsAgent: agent },{
            timeout: 10000 // Adjust timeout as needed (in milliseconds)
          })
        .then(response => {
          const users = response.data.map(user => user.id);
          dispatch(fetchUsersSuccess(users));
        })
        .catch(error => {
          dispatch(fetchUsersFailure(error.message));
        });
    };
  };
  
const reducer = (state = initialState, action) => {
  console.log(action.type)
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: ''
      }
    case FETCH_USERS_FAILURE:
      return {
        loading: false,
        users: [],
        error: action.payload
      }
  }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware))
store.subscribe(() => { console.log(store.getState()) })
store.dispatch(fetchUsers())