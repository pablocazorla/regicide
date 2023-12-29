const Modal = ({ visible, children }) => {
  return visible ? (
    <div className="fixed top-0 w-screen left-0 h-screen bg-black/20 backdrop-blur-sm">
      <div className="container flex flex-col justify-center items-stretch p-4">
        <div className="bg-teal-700 overflow-auto rounded-lg shadow-xl">
          <div>{children}</div>
        </div>
      </div>
    </div>
  ) : null;
};
export default Modal;
