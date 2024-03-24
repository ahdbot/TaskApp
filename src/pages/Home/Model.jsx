import React from "react";
import Loading from "react-loading";
import Modal from "../../shared/Modal";
import "./Home.css";
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
 

    <Modal closeModal={closeModal} backgroundColor={"red"}>
      <div className="model-content">
        <input
          required
          onChange={(eo) => {
            titleInput(eo);
          }}
          placeholder=" Add title : "
          type="text"
        />

        <div>
          <input
            required
            onChange={(eo) => {
              detailsInput(eo);
            }}
            placeholder=" details : "
            type="text"
            value={subTask}
          />

          <button
            style={{ marginLeft: 29 }}
            onClick={(eo) => {
              addBTN(eo);
            }}
          >
            Add
          </button>
        </div>

        <ul>
          {array.map((item) => (
            <li key={item}> {item} </li>
          ))}
        </ul>

        <button
          style={{ marginBottom: "22px" }}
          onClick={async (eo) => {
            submitBTN(eo);
          }}
        >
          {showLoading ? (
            <Loading type={"spin"} color={"blue"} height={20} width={20} />
          ) : (
            "submit"
          )}
        </button>
      </div>
    </Modal>
  );
};

export default HomeModal;
