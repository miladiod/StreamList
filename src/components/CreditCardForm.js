import React, { useState } from "react";

function formatCardNumber(value) {
  // Only allow digits, format as 1234 5678 9012 3456
  return value.replace(/\D/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim()
    .slice(0, 19);
}

function CreditCardForm() {
  const [cardNumber, setCardNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save to localStorage
    localStorage.setItem("creditCard", JSON.stringify({ cardNumber, name, expiry }));
    setSaved(true);
  };

  return (
    <main>
      <h2>Enter Credit Card Information</h2>
      <form className="credit-card-form" onSubmit={handleSubmit}>
        <div>
          <label>Card Number:</label>
          <input
            type="text"
            value={cardNumber}
            onChange={e => setCardNumber(formatCardNumber(e.target.value))}
            placeholder="1234 5678 9012 3456"
            pattern="\d{4} \d{4} \d{4} \d{4}"
            required
            maxLength={19}
          />
        </div>
        <div>
          <label>Name on Card:</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Expiration date:</label>
          <input
            type="text"
            value={expiry}
            onChange={e => setExpiry(e.target.value)}
            placeholder="MM/YY"
            pattern="\d{2}/\d{2}"
            required
            maxLength={5}
          />
        </div>
        <button type="submit">Save Card</button>
      </form>
      {saved && <p style={{color: "green"}}>Card saved!</p>}
    </main>
  );
}

export default CreditCardForm;