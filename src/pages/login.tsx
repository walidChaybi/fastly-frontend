import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { loginMutation } from "../__generated__/loginMutation";
import { Helmet } from "react-helmet-async";
import logo from "../assets/logo.png";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { authToken, isLoggedInVar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../constants";

interface ILoginForm {
  email: string;
  password: string;
}

const LOGIN_MUTATION = gql`
  mutation loginMutation($loginInput: loginInput!) {
    login(input: $loginInput) {
      ok
      error
      token
    }
  }
`;

function Login() {
  const { register, formState, handleSubmit, watch } = useForm<ILoginForm>();

  const onCompleted = (data: loginMutation) => {
    const {
      login: { ok, token },
    } = data;
    if (ok) {
      localStorage.setItem(LOCALSTORAGE_TOKEN, token!);
      authToken(token!);
      isLoggedInVar(true);
    }
  };

  const [loginMutation, { data, loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

  const onSubmit = () => {
    loginMutation({
      variables: {
        loginInput: {
          email: watch("email"),
          password: watch("password"),
        },
      },
    });
  };
  return (
    <div className=" flex flex-col gap-12 items-center mt-16">
      <Helmet>
        <title>Login | Fastly</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col gap-4 items-center">
        <img height={50} width={200} src={logo} />
        <h2 className="text-xl mt-16 w-full font-light">
          <span className="text-rose-500 font-semibold">Welcome</span> back
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
          <Button
            canClick={formState.isValid}
            actionText="Log In"
            loading={loading}
          />

          {data?.login.error && (
            <p className="text-red-600">{data.login.error}</p>
          )}
        </form>
        <div className="w-full flex justify-between mt-2">
          <p>
            New to Fastly?{" "}
            <span className="text-indigo-500 font-semibold hover:border-b-2 border-indigo-700 hover:text-indigo-700">
              <Link to="/create-account">Create an account</Link>
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
}

export default Login;
