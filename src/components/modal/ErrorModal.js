function ErrorModal({ closeModal, deletePortfolio, error }) {
  return (
    <>
      {error && error}
      <div
        className="fixed h-screen w-screen bg-gray-700 bg-opacity-75 z-20 flex justify-center items-center"
        onClick={closeModal}
      />

      <div className="fixed left-3/10 top-3/10 w-2/5 bg-white border-purple-800 border-4 rounded-2xl overflow-hidden z-30">
        <div className="bg-purple-500 text-white text-2xl px-6 py-3 flex justify-between">
          Confirm
          <div
            className="cursor-pointer text-gray-400 hover:text-white"
            onClick={closeModal}
          >
            X
          </div>
        </div>
        <div className="bg-white p-4 h-32">
          Deleting this portfolio will delete all stock transactions contained
          in this portfolio. This action cannot be undoned.
        </div>
        <div className="p-4 flex justify-end">
          <button
            className="bg-purple-300 rounded-2xl px-6 py-3 hover:bg-purple-700 hover:text-white"
            onClick={deletePortfolio}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default ErrorModal;
