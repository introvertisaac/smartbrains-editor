/* We will require two actions:
    1. To push the data to the state
    2. To remove the data from the state 
*/


export const SET_USER = (user) => {
    return {
        type: "SET_USER",
        user: user,
    }
}

export const SET_USER_NULL = () => {
    return {
        type: "SET_USER_NULL",
    }
} 
