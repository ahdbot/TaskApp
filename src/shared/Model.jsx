import React from 'react';

const Model = () => {
    return (
        <div className="parent-of-model">
        <form className={`model`}>
          <div
            onClick={() => {
              setShowModel(false);
            }}
            className="close"
          >
            <i className="fa-solid fa-xmark"></i>
          </div>

          <input
            onChange={(eo) => {
              setresetPass(eo.target.value);
            }}
            required
            placeholder=" E-mail : "
            type="email"
          />
          <button
            onClick={(eo) => {
              eo.preventDefault();
              sendPasswordResetEmail(auth, resetPass)
                .then(() => {
                  console.log("Send Email");
                  setshowSendEmail(true);
                })
                .catch((error) => {
                  const errorCode = error.code;

                  console.log(errorCode);
                  // ..
                });
            }}
          >
            Reset email
          </button>
          {showSendEmail && (
            <p className="check-email">
              Please check your email to reset your password.
            </p>
          )}
        </form>
      </div>
    );
}

export default Model;
