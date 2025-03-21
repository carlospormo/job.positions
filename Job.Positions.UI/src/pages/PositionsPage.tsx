import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPositions, deletePosition } from "../services/api";
import Table from "../components/Table";
import { Position } from "../types/position";

const PositionsPage: React.FC = () => {
    const [positions, setPositions] = useState<Position[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredPositions, setFilteredPositions] = useState<Position[]>([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchPositions = async () => {
        try {
          const data = await getPositions();
          setPositions(data);
          setFilteredPositions(data); // Initialize with all positions
        } catch (error) {
          alert("Failed to fetch positions.");
        }
      };
  
      fetchPositions();
    }, []);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        const filtered = positions.filter((position) =>
            position.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredPositions(filtered);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this position?")) {
            try {
            await deletePosition(id);
            setPositions((prev) => prev.filter((p) => p.positionNumber !== id));
            setFilteredPositions((prev) =>
                prev.filter((p) => p.positionNumber !== id)
            );
            alert("Position deleted successfully.");
            } catch (error) {
            alert("Failed to delete position.");
            }
        }
    };

    const handleEdit = (id: string) => {
        navigate(`/edit/${id}`);
    };

    return (
        <div>
            <h1>Job Positions</h1>
            <input
                type="text"
                placeholder="Search by title..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
            />
            <Table
                positions={filteredPositions}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            <button onClick={() => navigate("/create")}>Create New Position</button>
        </div>
    );
};

export default PositionsPage;
    