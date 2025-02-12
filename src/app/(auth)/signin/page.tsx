import SigninForm from "../components/SignInForm/SigninForm";

export default function SignIn() {
  return (
    <div className="w-full h-full items-center flex justify-center">
      <div className="flex flex-col md:flex-row justify-center gap-10 md:justify-end w-full h-full items-center max-w-[1024px] px-4 md:px-0">
        <SigninForm />
      </div>
    </div>
  );
}
