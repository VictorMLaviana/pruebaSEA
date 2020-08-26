import {MODIFY_PAGE_BY, ListUsersResponse, UserListResponse, LIST_USERS_RESPONSE, User, CREATE_USER, LIST_USERS, DELETE_USER_RESPONSE, DELETE_USER, GET_USER, UpdateUser, UPDATE_USER, ListRoles, LIST_ROLES, GET_USER_RESPONSE, UPDATE_USER_RESPONSE, LIST_ROLES_RESPONSE, ListRolesResponse} from './types'

export function listRolesProcessor(): ListRoles{
    return {type: LIST_ROLES}
}

export function listRoles(): any{
    return function (dispatch: any) {
        dispatch(listRolesProcessor());
        return fetch("http://localhost:5000/api/roles?limit=10", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            mode: 'cors',
          }).then(response => response.json())
          .then(json =>{
              dispatch(listRolesResponse(json.roles))
          });
    }
}

export function listRolesResponse(response: any): ListRolesResponse{
    return {
        type: LIST_ROLES_RESPONSE,
        payload: response
      }
}


export function createUserLoading(newUser: User): any {
    return {
      type: CREATE_USER,
      payload: newUser
    }
}

export function createUser(user: User): any {
    
    return function (dispatch: any) {
        dispatch(createUserLoading(user));
        return fetch("http://localhost:5000/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            mode: 'cors',
            body: JSON.stringify(user) 
          }).then(response => response.json())
          .then(json =>{
              dispatch(createUserResponse(json.user))
              window.location.href=`http://localhost:3000/user/?id=${json.user.id}`;
          });
    }

}

export function createUserResponse(user: User){
    return {
        type: UPDATE_USER_RESPONSE,
        payload: user
    }
}

export function listUsersLoading(): any{
    return {
        type: LIST_USERS
      }
}

export function listUsers(): any {

    return function (dispatch: any, getState: any) {
        let actualState = getState();
        
        dispatch(listUsersLoading());
        return fetch("http://localhost:5000/api/users?limit=10&offset=" + (actualState.page * 10), {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            mode: 'cors',
          }).then(response => response.json())
          .then(json =>{
              dispatch(listUsersResponse(json))
          });
    }

}

export function listUsersResponse(response: UserListResponse): ListUsersResponse {
    return {
      type: LIST_USERS_RESPONSE,
      payload: response
    }
}

export function deleteUserLoading(){
    return {
        type: DELETE_USER
      }
}

export function deleteUser(user: User): any {
    return function (dispatch: any) {
        dispatch(deleteUserLoading());
        return fetch("http://localhost:5000/api/users/" + user.id, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            mode: 'cors',
          }).then(response => response.json())
          .then(json =>{
              dispatch(deleteUsersResponse(user.id))
          });
    }
}

export function deleteUsersResponse(response: string): any{
    return {
        type: DELETE_USER_RESPONSE,
        payload: response
      }
}

export function getUserLoading(){
    return {
        type: GET_USER,
    }
}

export function getUser(user_id: string): any {
    return function (dispatch: any) {
        dispatch(getUserLoading());
        return fetch("http://localhost:5000/api/users/" + user_id, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            mode: 'cors',
          }).then(response => response.json())
          .then(json =>{
              dispatch(getUserResponse(json.user))
          });
    }
}

export function getUserResponse(user : User){
    return {
        type: GET_USER_RESPONSE,
        payload: user
    }
}

export function updateUserLoading(user: User): UpdateUser {
    return {
        type: UPDATE_USER,
        payload: user
    }
}

export function updateUser(user: User): any {
    
    let u = {
        first_name: user.first_name,
        last_name: user.last_name,
        roles: user.roles
    }
    return function (dispatch: any) {
        dispatch(updateUserLoading(user));
        return fetch("http://localhost:5000/api/users/" + user.id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            mode: 'cors',
            body: JSON.stringify(u) 
          }).then(response => response.json())
          .then(json =>{
              dispatch(updateUserResponse(json.user))
          });
    }

}

export function updateUserResponse(user: User) {
    return {
        type: UPDATE_USER_RESPONSE,
        payload: user
    }
}

export function setPage(page: number){
    return {
        type: MODIFY_PAGE_BY,
        payload: page
    }
}

export function modifyPageBy(diff: number): any {
    return function (dispatch: any, getState: any) {
        let newPage = getState().page + diff;
        dispatch(setPage(newPage));
        return dispatch(listUsers())
    }
}