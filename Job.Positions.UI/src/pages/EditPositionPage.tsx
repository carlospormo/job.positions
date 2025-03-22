import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createPosition, getPositions, updatePosition } from "../services/api";
import Form from "../components/Form";
import { createDefaultPosition, Position } from "../types/position";

const EditPositionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [position, setPosition] = useState<Position | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosition = async () => {
      try {
        if(id){
            const data = await getPositions();
            const selectedPosition = data.find((p: Position) => p.positionNumber === parseInt(id));
            if (selectedPosition) {
            setPosition(selectedPosition);
            } else {
            setError("Position not found.");
            }
        }else{
            setPosition(createDefaultPosition())
        }
      } catch (err) {
        setError("Failed to fetch position.");
      } finally {
        setLoading(false);
      }
    };
    fetchPosition();
  }, [id]);

  const handleSubmit = async (updatedPosition: Position) => {
    try {
      if(id){
        await updatePosition(parseInt(id), updatedPosition);
        alert("Position updated successfully!");
      } else {
        await createPosition(updatedPosition);
        alert("Position created successfully!");
      }
      navigate("/");
    } catch (err) {
      alert("Failed to update position. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <h1>{id?"Edit":"Create"} Position</h1>
      {position && (
        <Form
          onSubmit={handleSubmit}
          initialValues={position}
        />
      )}
    </div>
  );
};

export default EditPositionPage;
