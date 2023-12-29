import AfterAttackStep from "./afterAttack";
import ApplyAttackStep from "./applyAttack";
import EndAttackStep from "./endAttack";
import PayDamageStep from "./payDamage";
import PowerCStep from "./powerC";
import PowerDStep from "./powerD";
import PowerHStep from "./powerH";
import PowerSStep from "./powerS";
import SaveGame from "./saveGame";
import useAttackProcess from "./useAttackProcess";

const AttackProcess = () => {
  const { step, setNextStep } = useAttackProcess();

  if (!step) {
    return null;
  }

  switch (step) {
    case "H":
      return <PowerHStep setNextStep={setNextStep} />;
    case "D":
      return <PowerDStep setNextStep={setNextStep} />;
    case "C":
      return <PowerCStep setNextStep={setNextStep} />;
    case "APPLY_ATTACK":
      return <ApplyAttackStep setNextStep={setNextStep} />;
    case "AFTER_ATTACK":
      return <AfterAttackStep setNextStep={setNextStep} />;
    case "S":
      return <PowerSStep setNextStep={setNextStep} />;
    case "PAY_DAMAGE":
      return <PayDamageStep setNextStep={setNextStep} />;
    case "END_ATTACK":
      return <EndAttackStep setNextStep={setNextStep} />;
    case "SAVE_GAME":
      return <SaveGame />;
    default:
      return null;
  }
};
export default AttackProcess;
