export const getToken = () => localStorage.getItem("jwt_token")
export const getRefreshToken = () => localStorage.getItem("refresh_token")
export const setToken = (token) => {
    if (token) {
        localStorage.setItem("jwt_token", token);
        } else {
        localStorage.removeItem("jwt_token");
        }
    };
export const setRefreshToken = (token) => localStorage.setItem("refresh_token", token)
export const checkToken = async () => {
    try {    
        const resp = await fetch("/check", {
            headers: {
            //! NOTICE HERE I send the refresh token since I know the access token is expired
                "Authorization": `Bearer ${getToken()}`
            }
        })
        if (!resp.ok) {
            const followResp = await postRefreshToken()
            if (followResp.ok) {
                const { jwt_token } = await followResp.json()
                setToken(jwt_token)
                return followResp
            } else {
                
                const { msg, message } = await followResp.json()
                throw Error(msg || message)
            }
        } else {
            return resp
        }
    } catch (error) {
        
        return error
    }
}
export const postRefreshToken = async () => {
    const resp = await fetch("/refresh", {
        method: "POST",
        headers: {
            //! NOTICE HERE I send the refresh token since I know the access token is expired
            "Authorization": `Bearer ${getRefreshToken()}`
        }
    })
    return resp 
}

export const getSpotifyToken = () => localStorage.spotify_refresh_token
export const setSpotifyToken = (token) => {
    if (token) {
        localStorage.setItem("jwt_token", token);
        } else {
        localStorage.removeItem("jwt_token");
        }
    };
export const setSpotifyRefreshToken = (token) => localStorage.setItem("refresh_token", token)
export const checkSpotifyToken = async () => {
    try {    
        const resp = await fetch("/check", {
            headers: {
            //! NOTICE HERE I send the refresh token since I know the access token is expired
                "Authorization": `Bearer ${getToken()}`
            }
        })
        if (!resp.ok) {
            const followResp = await postRefreshToken()
            if (followResp.ok) {
                const { jwt_token } = await followResp.json()
                setToken(jwt_token)
                return followResp
            } else {
                
                const { msg, message } = await followResp.json()
                throw Error(msg || message)
            }
        } else {
            return resp
        }
    } catch (error) {
        
        return error
    }
}
// export const postRefreshToken = async () => {
//     const resp = await fetch("/refresh", {
//         method: "POST",
//         headers: {
//             //! NOTICE HERE I send the refresh token since I know the access token is expired
//             "Authorization": `Bearer ${getRefreshToken()}`
//         }
//     })
//     return resp 