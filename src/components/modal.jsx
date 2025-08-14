import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "./button";

const Modal = ({ show, title, message, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop fade show" style={{ zIndex: 1040 }}></div>

      {/* Modal */}
      <div
        className="modal fade show"
        style={{
          display: "block",
          zIndex: 1050,
        }}
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <Button
                type="button"
                className="btn-close"
                onClick={onCancel}
              ></Button>
            </div>
            <div className="modal-body">
              <p>{message}</p>
            </div>
            <div className="modal-footer">
              <Button
                title="Cancel"
                className="btn btn-secondary"
                onClick={onCancel}
              ></Button>
              <Button
                title="Delete"
                className="btn btn-danger"
                onClick={onConfirm}
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
