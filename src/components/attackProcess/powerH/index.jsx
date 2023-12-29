import Note from "@/components/note";
import useStep from "./useStep";

const PowerHStep = ({ setNextStep }) => {
  const note = useStep(setNextStep);
  return <Note note={note} />;
};

export default PowerHStep;
