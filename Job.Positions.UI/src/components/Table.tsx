import React from "react";
import { departments, Position, statuses } from "../types/position";

interface TableProps {
  positions: Position[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
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
          <td>{statuses.find(x=>x.id===position.statusId)?.name}</td>
          <td>{departments.find(x=>x.id===position.departmentId)?.name}</td>
          <td>{position.budget}</td>
          <td>
            <button onClick={() => onEdit(position.positionNumber)} className="btn btn-success">Edit</button>
            <button onClick={() => onDelete(position.positionNumber)} className="btn btn-warning">Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;
