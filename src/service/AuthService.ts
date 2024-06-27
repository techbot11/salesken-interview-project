import { store } from "../store";
import { login, signup } from "../store/slices/AuthSlice";

export function Login(payload: any) {
  debugger;
  const registeredUsers = store.getState().auth.registeredUsers;
  const userData = registeredUsers.find(
    (user) => user.email === payload.email && user.password === payload.password
  );
  if (!!userData) {
    store.dispatch(login(userData));
    return true;
  } else {
    return false;
  }
}
export function Signup(payload: any) {
  debugger;
  store.dispatch(signup(payload));
}
