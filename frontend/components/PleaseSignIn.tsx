import SignIn from "./SignIn";
import { useUser } from "./User";

export default function PleaseSignIn({ children }: any) {
  const me = useUser();
  if (!me) return <SignIn />;
  return children;
}
