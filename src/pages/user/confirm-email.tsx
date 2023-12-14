import { gql, useApolloClient, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { verifyEmail } from "../../__generated__/verifyEmail";
import { useNavigate } from "react-router-dom";
import { useMe } from "../../hooks/useMe";

const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      ok
      error
    }
  }
`;

function ConfirmEmail() {
  const navigate = useNavigate();
  const { data: userData } = useMe();
  const client = useApolloClient();
  const [verifyEmail] = useMutation<verifyEmail>(VERIFY_EMAIL_MUTATION, {
    onCompleted: (data) => {
      if (data.verifyEmail.ok && userData?.me.id) {
        client.writeFragment({
          id: `User:${userData.me.id}`,
          fragment: gql`
            fragment VerifiedUser on User {
              verified
            }
          `,
          data: {
            verified: true,
          },
        });
      }
      navigate("/");
    },
  });

  useEffect(() => {
    const [_, code] = location.search.split("?code=");
    verifyEmail({
      variables: {
        input: {
          code,
        },
      },
    });
  }, []);
  return (
    <div className="mt-52 flex flex-col items-center justify-center">
      <h2 className="text-lg mb-2 font-medium">Confirming email...</h2>
      <h3 className="text-slate-600 font-light text-sm">
        Please wait, don't close this page...
      </h3>
    </div>
  );
}

export default ConfirmEmail;
