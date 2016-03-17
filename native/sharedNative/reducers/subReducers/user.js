import { combineReducers } from 'redux';

function user(state = {}, action) {
  console.log('action', action);
  switch (action.type) {
    case 'SET_USER': {
      return action.user || state;
    }
    default:
      return state;
  }
}

function allUsers(state = [], action) {
  console.log('action', action);
  switch (action.type) {
    case 'SET_ALL_USERS': {
      return action.allUsers || state;
    }
    default:
      return state;
  }
}

module.exports.user = user;
module.exports.allUsers = allUsers;
