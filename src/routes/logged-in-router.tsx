import { isLoggedInVar } from "../apollo";

export const LoggedInRouter = () => (
  <div>
    <h1>Logged in</h1>
    <button onClick={() => isLoggedInVar(false)}>Click to log out</button>
  </div>
);
