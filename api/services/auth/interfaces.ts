import { IUser } from "@workspace/shared/api/services/users/interface"

export interface IAuth {
  status?: boolean
  message?: string
  access_token?: string
  token_type?: string
  expires_in?: number
  data?: IUser
}

export interface IRefreshToken {
  status?: boolean
  message?: string
  access_token?: string
  refresh_token?: string
  token_type?: string
  expires_in?: number
  data?: IUser
}