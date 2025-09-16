import apiFetcher from "@/api/api.instance";
import { SignInFormData } from "@/schemas/auth";
import { IUser } from "../../../../../../packages/shared/src/api/services/users/interface";
import { Methods } from "@/constants/methods";
import { signInRoute } from "./routes";

// API endpoints factory
export const authRepository = {
  signIn: (credentials: SignInFormData): Promise<IUser> =>
    apiFetcher<IUser>(signInRoute, {
      method: Methods.POST,
      body: JSON.stringify(credentials),
    }),
};
