import Note from "@/components/note";
import useStep from "./useStep";

const EndAttackStep = ({ setNextStep }) => {
  useStep(setNextStep);
  return null;
};

export default EndAttackStep;
