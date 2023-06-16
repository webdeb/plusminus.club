import React, { useState } from "react";
import axios from "axios";

const SubscriptionForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace 'YOUR_MAILCHIMP_API_KEY' with your Mailchimp API key
      const apiKey = "YOUR_MAILCHIMP_API_KEY";
      // Replace 'YOUR_MAILCHIMP_LIST_ID' with your Mailchimp List ID
      const listId = "YOUR_MAILCHIMP_LIST_ID";

      const data = {
        email_address: email,
        status: "subscribed",
      };

      const response = await axios.post(
        `https://<dc>.api.mailchimp.com/3.0/lists/${listId}/members`,
        data,
        {
          auth: {
            username: "apikey",
            password: apiKey,
          },
        }
      );

      console.log(response); // Optional: Handle success response

      // Clear the email input after successful subscription
      setEmail("");
    } catch (error) {
      console.error(error); // Optional: Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Subscribe</button>
    </form>
  );
};

export default SubscriptionForm;
