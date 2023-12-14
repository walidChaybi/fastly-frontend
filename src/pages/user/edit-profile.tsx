import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import { useMe } from "../../hooks/useMe";
import { gql, useApolloClient, useMutation } from "@apollo/client";
import { editProfileMutation } from "../../__generated__/editProfileMutation";

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfileMutation($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`;

interface IFormProps {
  email?: string;
  password?: string;
  confirm_password: string;
}

function EditProfile() {
  const { data: userData } = useMe();

  const client = useApolloClient();

  const [editProfile, { loading }] = useMutation(EDIT_PROFILE_MUTATION, {
    onCompleted(data: editProfileMutation) {
      if (data.editProfile.ok && userData) {
        const {
          me: { email: prevEmail, id },
        } = userData;
        const { email: newEmail } = getValues();
        if (prevEmail !== newEmail) {
          client.writeFragment({
            id: `User:${id}`,
            fragment: gql`
              fragment EditedUser on User {
                verified
                email
              }
            `,
            data: {
              eail: newEmail,
              verified: false,
            },
          });
        }
      }
    },
  });

  const { register, handleSubmit, formState, getValues } = useForm<IFormProps>({
    defaultValues: {
      email: userData?.me.email,
    },
  });

  const onSubmit = () => {
    const { email, password } = getValues();
    editProfile({
      variables: {
        input: {
          email,
          ...(password !== "" && { password }),
        },
      },
    });
  };

  return (
    <div className="h-[80vh] flex flex-col justify-center items-center">
      <h2 className="text-xl">Edit Profile</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-24 grid gap-4 w-full max-w-lg"
      >
        <input
          {...register("email", {
            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
          })}
          name="email"
          placeholder="Email"
          className="input"
        />
        {formState.errors.email?.type && (
          <span className="text-red-600 font-medium mt-2">
            Please provide a valid email address
          </span>
        )}
        <input
          {...register("password", {
            minLength: 8,
          })}
          name="password"
          type="password"
          placeholder="Password"
          className="input"
        />
        {formState.errors.password?.type === "minLength" && (
          <span className="text-red-600 font-medium mt-2">
            Password must be more than 8 characters
          </span>
        )}
        <input
          {...register("confirm_password", {
            minLength: 8,
            validate: (value) => {
              if (value !== getValues("password")) {
                return "Password confirmation doesn't match";
              }
            },
          })}
          name="confirm_password"
          type="password"
          placeholder="Password"
          className="input"
        />
        {formState.errors.confirm_password && (
          <span className="text-red-600 font-medium mt-2">
            {formState.errors.confirm_password?.message}
          </span>
        )}
        <Button
          actionText="Update Profile"
          loading={loading}
          canClick={!loading}
        />
      </form>
    </div>
  );
}

export default EditProfile;
