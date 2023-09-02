import React, { useState } from "react";
import { motion } from "framer-motion";
import { slideIn } from "../utils/motion";

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const formRef = React.createRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    // You can use the form data from the 'form' state

    // Set loading to true to show "Sending..." while the form is being submitted
    setLoading(true);

    // Example: Simulate a delay (remove this in your actual code)
    setTimeout(() => {
      // Reset form and loading state after submission
      setForm({
        name: "",
        email: "",
        message: "",
      });
      setLoading(false);
    }, 2000); // Simulated delay for 2 seconds
  };

  const containerStyles = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center", // Center horizontally
    alignItems: "center", // Center vertically
    height: "100vh", // Center vertically on the viewport height
  };

  const cardStyles = {
    backgroundColor: "#1a1a1a", // Dark background color
    padding: "24px",
    borderRadius: "16px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    width: "100%", // Full width of the card
    maxWidth: "500px", // Limit the maximum width of the card
  };

  const labelStyles = {
    display: "flex",
    flexDirection: "column",
  };

  const inputStyles = {
    backgroundColor: "white", // White background color for text boxes
    padding: "16px",
    paddingLeft: "24px",
    paddingRight: "24px",
    borderRadius: "12px",
    outline: "none",
    border: "none",
    fontSize: "16px",
    color: "var(--white-color)",
    marginBottom: "16px",
  };

  const buttonStyles = {
    backgroundColor: "white",
    padding: "12px",
    paddingLeft: "24px",
    paddingRight: "24px",
    borderRadius: "12px",
    outline: "none",
    border: "none",
    fontSize: "18px",
    color: "var(--white-color)",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div style={containerStyles}>
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] p-8 rounded-2xl"
        style={cardStyles}
      >
        <h3 style={{ color: "white" }}>Contact Us</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label style={labelStyles}>
            <span
              style={{
                color: "white",
                fontWeight: "medium",
                marginBottom: "16px",
              }}
            >
              Your Name
            </span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              style={inputStyles}
            />
          </label>
          <label style={labelStyles}>
            <span
              style={{
                color: "white",
                fontWeight: "medium",
                marginBottom: "16px",
              }}
            >
              Your email
            </span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email address?"
              style={inputStyles}
            />
          </label>
          <label style={labelStyles}>
            <span
              style={{
                color: "white",
                fontWeight: "medium",
                marginBottom: "16px",
              }}
            >
              Your Message
            </span>
            <textarea
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What is your message?"
              style={inputStyles}
            />
          </label>

          <button
            type="submit"
            style={buttonStyles}
            className="float-right"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default ContactForm;
