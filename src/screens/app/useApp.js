import { useContext } from "react";
import AppOptionContext from "@/contexts/appOptions/context";

const useApp = () => {
  const { appStatus } = useContext(AppOptionContext);

  return {
    appStatus,
  };
};
export default useApp;
