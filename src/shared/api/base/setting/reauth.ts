import { getCookie, getErrorMessage, setCookie } from "@/shared/utils";
import { baseQuery } from "./base-query";
import { toast } from "sonner";
import { logout } from "@/entities/account";
import { redirect } from "@/entities/navigation";
import { router } from "@/app/router";

type Verify = {
  success: boolean;
}

interface VerifyResponse {
  data: Verify;
}

interface ReauthResponse {
  data: {
    access_token: string;
  }
}

export const reauthQuery: typeof baseQuery = async (args, api, opt) => {
  let res = await baseQuery(args, api, opt);
  
  // if (isDev) {
  //   await sleep(2000);
  // }

  if (res.error?.status === "FETCH_ERROR") {
    const currentPath = router.state.location.pathname;
    api.dispatch(redirect({ to: "/network/server", from: currentPath }));
    return res;
  }

  if (res.error?.status === 401) {
    const verify = await baseQuery({ url: "/v1/check/auth", method: "GET" }, api, opt) as VerifyResponse;

    if (verify.data) {
      res = await baseQuery(args, api, opt);
    } else {
      const refresh_token = getCookie("refresh_token");
      const access_token = getCookie("access_token");

      if (refresh_token && access_token) {
        const refresh = await baseQuery({ url: "/v1/auth/refresh", method: "POST", body: { refresh_token, old_token: access_token } }, api, opt) as ReauthResponse;

        if (refresh.data && "access_token" in refresh.data) {
          const token = refresh.data.access_token;
          setCookie("access_token", token, { path: "/", sameSite: "Strict" });

          res = await baseQuery(args, api, opt);
          // console.log(`refresh.data && "access_token" in refresh.data ${refresh.data && "access_token" in refresh.data}`);
        } else {
          api.dispatch(logout());
        }
      } else {
        api.dispatch(logout());
      }
    }

    if (res.error) {
      toast.error(getErrorMessage(res.error));
    }
  }

  return res;
};
