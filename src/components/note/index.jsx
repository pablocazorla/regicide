import { motion, AnimatePresence } from "framer-motion";
import Icon from "../icon";
import { useState } from "react";
import clsx from "clsx";
import I18Ntext from "@/i18n";

const Note = ({ note, className }) => {
  const [disableButton, setDisableButton] = useState(false);

  return (
    <AnimatePresence>
      {note ? (
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          exit={{ opacity: 0, scaleY: 0 }}
          className={clsx(
            "bg-amber-400 text-amber-950 mb-1 px-2 pt-1 pb-3 shadow-[2px_0_10px_rgba(0,0,0,0.4)] rounded-md",
            className
          )}
        >
          <div className="flex gap-4">
            <div className="text-4xl pt-1">
              <Icon type={note.icon} />
            </div>
            <div className="grow text-[14px] font-medium pt-2 leading-5">
              <div
                dangerouslySetInnerHTML={{
                  __html: I18Ntext(note?.text, note?.values || []),
                }}
              />
              {note?.action ? (
                <div className="pt-2">
                  <button
                    className={clsx(
                      "flex items-center gap-2 bg-amber-700 py-2 px-6 text-white font-bold rounded-full",
                      {
                        "opacity-30": disableButton || note?.disabled,
                      }
                    )}
                    onClick={() => {
                      setDisableButton(true);
                      note.action();
                    }}
                    disabled={disableButton || note?.disabled}
                  >
                    {disableButton && <Icon type="loading" />}
                    {I18Ntext(note?.textButton || "btn.continue")}
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Note;
