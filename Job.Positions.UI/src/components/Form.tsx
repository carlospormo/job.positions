import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { departments, Position, recruiters, statuses } from "../types/position";

interface PositionFormProps {
    initialValues?:Position;
    onSubmit: (position: Position) => void;
}

const Form: React.FC<PositionFormProps> = ({ onSubmit, initialValues }) => {
  const [positionNumber, setPositionNumber] = useState(initialValues?.positionNumber || 0);
  const [title, setTitle] = useState(initialValues?.title || "");
  const [budget, setBudget] = useState(initialValues?.budget || 0);
  const [departmentId, setDepartment] = useState(initialValues?.departmentId || 0);
  const [statusId, setStatus] = useState(initialValues?.statusId || 0);
  const [recruiterId, setRecruiter] = useState(initialValues?.recruiterId || 0);
  const navigate = useNavigate();

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
        statusId,
        departmentId,
        recruiterId
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
          <label className="col-6">
            Position Number:
            <input
              type="number"
              readOnly={true}
              className="form-control"
              value={positionNumber}
              onChange={(e) => setPositionNumber(parseInt(e.target.value))}
              required
            />
          </label>
          <label className="col-6">
            Title:
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
      </div>
      <div className="row">
          <label className="col-6">
            Budget:
            <input
              type="number"
              className="form-control"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              required
            />
          </label>
          <label className="col-6">
            Department:
              <select
              id="department"
              value={departmentId || ""}
              onChange={(e) => setDepartment(parseInt(e.target.value))}
              className="form-control">
                <option value="" disabled>
                  -- Select a Department --
                </option>
                {departments.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                ))}
              </select>
          </label>
      </div>
      <div className="row mb-3">
          <label className="col-6">
            Status:
            <select
              id="status"
              value={statusId || ""}
              onChange={(e) => setStatus(parseInt(e.target.value))}
              className="form-control">
                <option value="" disabled>
                  -- Select a Status --
                </option>
                {statuses.map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.name}
                  </option>
                ))}
              </select>
          </label>
          <label className="col-6">
            Recruiter:
            <select
              id="recruiter"
              value={recruiterId || ""}
              onChange={(e) => setRecruiter(parseInt(e.target.value))}
              className="form-control">
                <option value="" disabled>
                  -- Select a Recruiter --
                </option>
                {recruiters.map((recruiter) => (
                  <option key={recruiter.id} value={recruiter.id}>
                    {recruiter.name}
                  </option>
                ))}
              </select>
          </label>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
      <a onClick={() => navigate("/")} className="btn btn-secondary">Cancel</a>
    </form>
  );
};

export default Form;
