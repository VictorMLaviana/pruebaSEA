import { UsersActionTypes, UsersState, RolesState, GlobalState, User } from './types'



const initialRolesState: RolesState = {
  roles: []
}

const initialState: UsersState = {
  users: [],
  page: 0,
  count: 0,
}

const initialUserState: User = {
  id: "",
  first_name: "",
  last_name: "",
  email: "",
  roles: []
}

const initialGlobalState: GlobalState = {
  user: initialUserState,
  users: initialState.users,
  roles: initialRolesState.roles,
  page: initialState.page,
  count: initialState.count
}


export function UsersReducer(state = initialGlobalState, action: UsersActionTypes): GlobalState {
  
  
  if (action.type == 'CREATE_USER') {
    return state

  } else if(action.type == 'CREATE_USER_RESPONSE'){
    
    return{
      ...state,
      user: action.payload
    }

  } else if (action.type == 'LIST_USERS') {
    
    return state

  } else if(action.type == 'LIST_USERS_RESPONSE'){

    
    let users = action.payload.users.map(user => {
      return {
        ...user,
        roles: user.roles.map(role=>{
          return role.description
        })
      };
    });
    
    return {
      ...state,
      users: users,
      count: action.payload.count
    };

  }else if (action.type == 'DELETE_USER') {

    return state


  } else if(action.type == 'DELETE_USER_RESPONSE'){

    return {
      ...state,
      users: state.users.filter(user=>{
        if(user.id != action.payload) return user;
      })
    }

  }else if (action.type == 'GET_USER') {

    return {
      ...state,
      user:initialUserState
    }

  } else if(action.type == 'GET_USER_RESPONSE'){
    
    let newUser = {
      ...action.payload,
      roles: action.payload.roles.map(role => {
        return role.id
      })
    };


    return {
      ...state,
      user: newUser
    }

  } else if (action.type == 'UPDATE_USER') {

    return state;

  } else if(action.type == 'UPDATE_USER_RESPONSE'){

    action.payload.roles = action.payload.roles.map(role => {
      return role.id
    });

    return {
      ...state,
      user: action.payload
    }

  } else if (action.type == 'LIST_ROLES') {
    
    return state

  } else if(action.type == 'LIST_ROLES_RESPONSE'){
    return {
      ...state,
      roles: action.payload
    }
  } else if(action.type == 'MODIFY_PAGE_BY'){
    
    return {
      ...state,
      page: action.payload
    }
  }else {
    return state
  }
}