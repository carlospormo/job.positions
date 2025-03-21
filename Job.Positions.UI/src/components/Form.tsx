import React, { useState } from "react";
import { Position } from "../types/position";

interface PositionFormProps {
    initialValues?:Position;
    onSubmit: (position: Position) => void;
}

const Form: React.FC<PositionFormProps> = ({ onSubmit }) => {
  const [positionNumber, setPositionNumber] = useState("");
  const [title, setTitle] = useState("");
  const [budget, setBudget] = useState(0);
  const [department, setDepartment] = useState("0");
  const [status, setStatus] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (budget < 0) {
      alert("Budget must be non-negative!");
      return;
    }
    onSubmit({
        positionNumber,
        title,
        budget,
        status,
        department
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Position Number:
        <input
          type="text"
          value={positionNumber}
          onChange={(e) => setPositionNumber(e.target.value)}
          required
        />
      </label>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label>
        Budget:
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          required
        />
      </label>
      <label>
        Department:
        <input
          type="text"
          value={budget}
          onChange={(e) => setDepartment(e.target.value)}
          required
        />
      </label>
      <label>
        Status:
        <input
          type="text"
          value={budget}
          onChange={(e) => setStatus(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
