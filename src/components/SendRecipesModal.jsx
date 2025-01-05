import React from "react";

const SendRecipesModal = ({
  isOpen,
  onClose,
  userName,
  setUserName,
  recipentEmail,
  setRecipentEmail,
  emailSubject,
  setEmailSubject,
  onSend,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Send Recipes</h2>
        <input
          type="text"
          placeholder="Enter your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter recipient's email"
          value={recipentEmail}
          onChange={(e) => setRecipentEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter email subject"
          value={emailSubject}
          onChange={(e) => setEmailSubject(e.target.value)}
        />
        <button className="share-button" onClick={onSend}>
          Share Selected Recipes
        </button>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default SendRecipesModal;
