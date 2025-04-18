import { SignIn } from '@clerk/clerk-react';

function MyAuth() {
  return (
    <header>

      <SignIn routing="path" path="/sign-in" afterSignInUrl="/dashboard" />

    </header>
  );
}
export default MyAuth;