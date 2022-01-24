import { REMOVE_USER, SETUP_USER } from "../components/DataContext"
import { useDataContext, useDataDispatch } from "./context"

/**
 * @description gets student number of user
 * @returns student number
 */
export const useAuth = () => {
  const { user } = useDataContext();
  const dispatch = useDataDispatch()

  const setUser = (stuNum) => {
    if(!stuNum) return;
    if (isNaN(stuNum) || stuNum.length !== 9 || stuNum.substring(0, 2) !== '21') {
      dispatch({
        type: SETUP_USER,
        payload: {
          stuNum: ""
        }
      })
    } else {
      dispatch({
        type: SETUP_USER,
        payload: {
          stuNum
        }
      })
    }

  }

  // remove user's student number (dummy logout)
  const removeUser = () => {
    dispatch({ type: REMOVE_USER })
  }

  return {
    user,
    setUser,
    removeUser
  }
}
