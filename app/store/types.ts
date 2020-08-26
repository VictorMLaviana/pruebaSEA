export interface Role {
    id: string,
    name: string,
    description: string
}

export interface RolesState {
    roles: Role[]
}

export const LIST_ROLES = 'LIST_ROLES'
export const LIST_ROLES_RESPONSE = 'LIST_ROLES_RESPONSE'

export interface ListRoles {
    type: typeof LIST_ROLES
}

export interface ListRolesResponse {
    type: typeof LIST_ROLES_RESPONSE
    payload: Role[]
}

export interface User {
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    roles: any[],
}

export interface UsersState {
    users: User[],
    page: number,
    count: number
}

export interface UserListResponse {
    users: User[],
    count: number
}

export const CREATE_USER = 'CREATE_USER'
export const CREATE_USER_RESPONSE = 'CREATE_USER_RESPONSE'
export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_USER_RESPONSE = 'UPDATE_USER_RESPONSE'
export const DELETE_USER = 'DELETE_USER'
export const DELETE_USER_RESPONSE = 'DELETE_USER_RESPONSE'
export const GET_USER = 'GET_USER'
export const GET_USER_RESPONSE = 'GET_USER_RESPONSE'
export const LIST_USERS = 'LIST_USERS'
export const LIST_USERS_RESPONSE = 'LIST_USERS_RESPONSE'

export interface CreateUser {
    type: typeof CREATE_USER
    payload: User
}

export interface CreateUserResponse {
    type: typeof CREATE_USER_RESPONSE
    payload: User
}

export interface UpdateUser {
    type: typeof UPDATE_USER
    payload: User
}

export interface UpdateUserResponse {
    type: typeof UPDATE_USER_RESPONSE
    payload: User
}

export interface DeleteUser {
    type: typeof DELETE_USER
    payload: User
}

export interface DeleteUserResponse {
    type: typeof DELETE_USER_RESPONSE
    payload: string
}

export interface GetUser {
    type: typeof GET_USER
    payload: string
}

export interface GetUserResponse {
    type: typeof GET_USER_RESPONSE
    payload: User
}

export interface ListUsers {
    type: typeof LIST_USERS
}

export interface ListUsersResponse {
    type: typeof LIST_USERS_RESPONSE
    payload: UserListResponse
}


export interface GlobalState {
    user: User
    users: User[]
    roles: Role[]
    page: number
    count: number
}

export const MODIFY_PAGE_BY = 'MODIFY_PAGE_BY'
export const SET_PAGE = 'SET_PAGE'

export interface modifyPageBy {
    type: typeof MODIFY_PAGE_BY
    payload: number
}

export interface setPage {
    type: typeof SET_PAGE
    payload: number
}


export type UsersActionTypes = CreateUser | UpdateUser | DeleteUser | GetUser | ListUsers | ListRoles | ListUsersResponse | DeleteUserResponse | GetUserResponse | UpdateUserResponse | CreateUserResponse | ListRolesResponse | modifyPageBy | setPage