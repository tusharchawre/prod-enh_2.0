// Array of routes that are accessible for public

export const publicRoutes = [
    "/",
    "/new-verification"
    
]



// Array of routes that are accessible for after authentication

export const authRoutes = [
    "/login",
    "/register",
    "/error"
    


]

// Routes for api authentification
export const apiAuthPrefix = '/api/auth'

export const DEFAULT_LOGIN_REDIRECT = "/dashboard"