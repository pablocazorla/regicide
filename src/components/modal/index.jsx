import { motion } from "framer-motion";

const Modal = ({ visible, children }) => {
  return visible ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed z-50 top-0 w-screen left-0 h-screen bg-black/40 backdrop-blur-sm"
    >
      <div className="container flex flex-col justify-center items-stretch p-4">
        <motion.div
          initial={{ translateY: 30 }}
          animate={{ translateY: 0 }}
          exit={{ translateY: 30 }}
          className="bg-teal-700 overflow-auto rounded-lg shadow-xl"
        >
          <div>{children}</div>
        </motion.div>
      </div>
    </motion.div>
  ) : null;
};
export default Modal;
