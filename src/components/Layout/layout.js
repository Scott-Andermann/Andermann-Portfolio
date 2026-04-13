import * as React from "react";
// import github from '../../images/github65ccb8.png';
// import email from '../../images/email.png';
// import phone from '../../images/phone.png';
// import linkedin from '../../images/linkedin.png';
import ContactForm from "../Contact/ContactForm";
import ContactOverlay from "../Contact/ContactOverlay";
import "./layout.css";

const contactModal = "contact-modal";

const Layout = ({ isShowing, setIsShowing, children }) => {
  const closeModal = () => {
    const dialog = document.getElementById(contactModal);
    if (dialog) {
      dialog.close();
    }
  };
  function exitButton(e) {
    e.preventDefault();
    setIsShowing(false);
    closeModal();
  }

  function closeForm() {
    setIsShowing(false);
    closeModal();
  }

  return (
    <div className="background">
      <title>Hello there! | Scott Andermann</title>
      <ContactForm
        isShowing={isShowing}
        exitButton={exitButton}
        closeForm={closeForm}
      />
      <ContactOverlay />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
