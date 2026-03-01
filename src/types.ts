export interface Job {
  _id?: string
  title: string
  companyName: string
  location: string
  jobType: string
  salary?: string
  category: string
  description?: string
  tag2?: string
}

export interface ApplicationPayload {
  name: string
  email: string
  resumeLink: string
  coverLetter: string
  job?: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload extends LoginPayload {
  name: string
}

export interface UserInfo {
  _id?: string
  name: string
  email: string
  isAdmin?: boolean
  token?: string
}

export interface ApiError {
  message?: string
}

export interface JobQueryParams {
  title?: string
  location?: string
  category?: string
}
