import Modal from "../modal";
import { useCallback, useEffect, useState, useContext } from "react";
import AppOptionContext from "@/contexts/appOptions/context";

const AboutModal = () => {
  const { visibleAbout, setVisibleAbout } = useContext(AppOptionContext);

  return <Modal visible={visibleAbout}>AboutModal</Modal>;
};
export default AboutModal;
