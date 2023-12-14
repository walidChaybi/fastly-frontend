import Button from "../../components/Button";
import { useMe } from "../../hooks/useMe";

function EditProfile() {
  const { data: userData } = useMe();

  return (
    <div className="h-[80vh] flex flex-col justify-center items-center">
      <h2 className="text-xl">Edit Profile</h2>
      <form className="mt-24 grid gap-4 w-full max-w-lg">
        <input className="input" type="email" placeholder="Email" />
        <input className="input" type="password" placeholder="Password" />
        <Button actionText="Update Profile" loading={false} canClick={true} />
      </form>
    </div>
  );
}

export default EditProfile;
