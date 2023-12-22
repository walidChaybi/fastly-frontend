import { gql, useMutation } from "@apollo/client";
import logo from "../assets/logo.png";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";

import { UserRole } from "../__generated__/globalTypes";

export const CREATE_ACCOUNT_MUTATION = gql`
  mutation ($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

interface ICreateAccountForm {
  email: string;
  password: string;
  role: UserRole;
}

export const CreateAccount = () => {
  const navigate = useNavigate();

  const { register, getValues, handleSubmit, formState } =
    useForm<ICreateAccountForm>({
      defaultValues: {
        role: UserRole.Client,
      },
    });

  const onCompleted = (data) => {
    if (data.createAccount.ok) {
      navigate("/");
    }
  };

  const [createAccountMutation, { loading, data }] = useMutation(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted,
    }
  );

  const onSubmit = () => {
    if (!loading) {
      const { email, password, role } = getValues();
      createAccountMutation({
        variables: {
          createAccountInput: { email, password, role },
        },
      });
    }
  };

  return (
    <div className=" flex flex-col gap-12 items-center mt-16">
      <div className="w-full max-w-screen-sm flex flex-col gap-4 items-center">
        <img height={50} width={200} src={logo} />
        <h2 className="text-xl mt-16 w-full font-light">
          <span className="text-rose-500 font-semibold">Let's get</span> started
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">
          <input
            className="input"
            placeholder="Email"
            required
            {...register("email", {
              required: "Email is required",
              pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            })}
            name="email"
          />
          {formState.errors.email?.type && (
            <span className="text-red-600 font-medium mt-2">
              Please provide a valid email address
            </span>
          )}
          <input
            className="input"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: 8,
            })}
            type="password"
            name="password"
          />
          {formState.errors.password?.type === "minLength" && (
            <span className="text-red-600 font-medium mt-2">
              Password must be more than 8 characters
            </span>
          )}
          <select {...register("role", { required: true })} className="input">
            <option value={UserRole.Client}>Client</option>
            <option value={UserRole.Owner}>Owner</option>
            <option value={UserRole.Delivery}>Delivery</option>
          </select>
          <Button
            canClick={formState.isValid}
            actionText="Create account"
            loading={loading}
          />
          {data?.createAccount.error && (
            <p className="text-red-500">{data?.createAccount.error}</p>
          )}
        </form>
        <div className="w-full flex justify-between mt-2">
          <p>
            Already have an account?{" "}
            <span className="text-indigo-500 font-semibold hover:border-b-2 border-indigo-700 hover:text-indigo-700">
              <Link to="/">Log In</Link>
            </span>
          </p>
          <p>
            <Link to="/reset-password">
              <span className="text-indigo-500 font-semibold hover:border-b-2 border-indigo-700 hover:text-indigo-700">
                Forgot password?
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
