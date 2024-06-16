// app/services/auth.server.ts
import { Authenticator } from "remix-auth";
import { sessionStorage } from "./session.server";
import { FormStrategy } from "remix-auth-form";

// Tell the Authenticator to use the form strategy

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export let authenticator = new Authenticator<{
  email: string;
  password: string;
}|null>(sessionStorage);


authenticator.use(
  new FormStrategy(async ({ form }) => {
    let email = form.get("email")?.toString();
    let password = form.get("password")?.toString();
    //   let user = await login(email, password);
    if (!(email == "admin@integrations.com" )&& !(password == "Welcome@123")) {
        
        return null;
      }
      return { email: email!, password: password! };
    
    // the type of this user must match the type you pass to the Authenticator
    // the strategy will automatically inherit the type if you instantiate
    // directly inside the `use` method

  }),
  // each strategy has a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  "user-pass"
);
