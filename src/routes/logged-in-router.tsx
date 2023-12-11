import { meQuery } from "../__generated__/meQuery";
import { isLoggedInVar } from "../apollo";
import { gql, useQuery } from "@apollo/client";

const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      role
    }
  }
`;

export const LoggedInRouter = () => {
  const { data, loading, error } = useQuery<meQuery>(ME_QUERY);

  if (loading || error || !data) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="custom-loader"></div>
        <span className="font-bold text-xl m-10">Loading ...</span>
      </div>
    );
  }

  return (
    <div>
      <h1>{data.me.role}</h1>
      <button onClick={() => isLoggedInVar(false)}>Click to log out</button>
    </div>
  );
};
