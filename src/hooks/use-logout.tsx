import { gql, useMutation } from "@apollo/client";
import { isLoggedInVar } from "../apollo";
import { logout } from "../__generated__/logout";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

const LOGOUT = gql`
  mutation logout {
    logout {
      ok
      error
    }
  }
`;

export const useLogout = () => {
  const history = useHistory();
  const onCompleted = (data: logout) => {
    const {
      logout: { ok },
    } = data;
    if (ok) {
      isLoggedInVar(false);
      history.push("/");
      Cookies.remove("connect.sid");
    }
  };

  return useMutation<logout>(LOGOUT, { onCompleted });
};
