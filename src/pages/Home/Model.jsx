import React from "react";
import Loading from "react-loading";
import Modal from "../../shared/Modal";


const HomeModal = ({
  closeModal,
  titleInput,
  detailsInput,
  addBTN,
  submitBTN,
  taskTitle,
  subTask,
  array,
  showLoading,
}) => {
  return (
    <Modal closeModal={closeModal}>
      <div className="model-content">
        <input
          onChange={(eo) => {
            titleInput(eo);
          }}
          required
          placeholder=" Add title : "
          type="text"
        />

        <div>
          <input
            onChange={(eo) => {
              detailsInput(eo);
            }}
            placeholder=" details "
            type="text"
            value={subTask}
          />

          <button
            onClick={(eo) => {
              addBTN(eo);
            }}
          >
            Add
          </button>
        </div>

        <ol>
          {array.map((item) => (
            <li key={item}> {item} </li>
          ))}
        </ol>

        <button
          style={{ marginBottom: "22px" }}
          onClick={async (eo) => {
            submitBTN(eo);
          }}
        >
          {showLoading ? (
            <Loading type={"spin"} color={"white"} height={20} width={20} />
          ) : (
            "submit"
          )}
        </button>
      </div>
    </Modal>
  );
};

export default HomeModal;
