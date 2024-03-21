import { Helmet } from "react-helmet-async";
import "./editTask.css";

import React from "react";
import Header from "../../comp/Header";
import Footer from "../../comp/Footer";

const EditTask = () => {
  return (
    <div>
      <Helmet>
        <title>edit task Page</title>
      </Helmet>

      <Header />

      <div className="edit-task">
        {/* Title   */}

        <section className="title center">
          <h1>
            <input
              value={"Ali hassan"}
              className="title-input center"
              type="text"
            />
            <i className="fa-regular fa-pen-to-square"></i>
          </h1>
        </section>

        <section className="sub-task">
          <div className="parent-time">
            <p className="time"> created : 6 days ago </p>
            <div>
              <input id="checkbox" type="checkbox" />
              <label htmlFor="checkbox" for="pass">
                completed
              </label>
            </div>
          </div>

          <ul className="card-task">
            <li className="card-task flex">
              <p> sub-task</p>
              <i className="fa-solid fa-trash"></i>
            </li>
            <li className="card-task flex">
              <p> sub-task</p>
              <i className="fa-solid fa-trash"></i>
            </li>

            <li></li>
            <li></li>
          </ul>
        </section>
        <section className="center mtt">
          <button className="add-more-btn">
            add more <i class="fa-solid fa-plus"></i>
          </button>

          <div>
            <button className="delete">
           
            Delete task  <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </section>
        {/* sub-tasks section   */}

        {/* Add-More Button   */}
      </div>

      <Footer />
    </div>
  );
};

export default EditTask;
