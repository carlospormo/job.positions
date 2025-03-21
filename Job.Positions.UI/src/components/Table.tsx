import React from "react";
import { Position } from "../types/position";

interface TableProps {
  positions: Position[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const Table: React.FC<TableProps> = ({ positions, onEdit, onDelete }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Position Number</th>
        <th>Title</th>
        <th>Status</th>
        <th>Department</th>
        <th>Budget</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {positions.map((position) => (
        <tr key={position.positionNumber}>
          <td>{position.positionNumber}</td>
          <td>{position.title}</td>
          <td>{position.status}</td>
          <td>{position.department}</td>
          <td>{position.budget}</td>
          <td>
            <button onClick={() => onEdit(position.positionNumber)}>Edit</button>
            <button onClick={() => onDelete(position.positionNumber)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;
