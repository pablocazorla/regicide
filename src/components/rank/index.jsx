import Modal from "../modal";
import { useContext, useMemo } from "react";
import AppOptionContext from "@/contexts/appOptions/context";
import List from "./list";

const RankModal = () => {
  const { visibleRank, setVisibleRank } = useContext(AppOptionContext);

  return (
    <Modal visible={visibleRank}>
      <List setVisibleRank={setVisibleRank} />
    </Modal>
  );
};

export default RankModal;
