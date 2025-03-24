import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPositions, deletePosition } from "../services/api";
import Table from "../components/Table";
import { Position } from "../types/position";
import * as signalR from "@microsoft/signalr";

const PositionsPage: React.FC = () => {
    const [positions, setPositions] = useState<Position[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredPositions, setFilteredPositions] = useState<Position[]>([]);
    const navigate = useNavigate();
  
    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .configureLogging(signalR.LogLevel.Information)
            .withUrl("http://localhost:8080/positionsHub")
            .withAutomaticReconnect()
            .build();

        connection.start().then(() => {
            console.log("Connected to SignalR Hub");            
        });

        connection.on("ReceiveUpdate", (message) => {
            console.log("Update received: ", message);
            fetchPositions();
        });
    }, []);

    const fetchPositions = async () => {
        try {
          const data = await getPositions();
          setPositions(data);
          setFilteredPositions(data);
        } catch (error) {
          alert("Failed to fetch positions.");
        }
    };

    useEffect(() => {
      fetchPositions();
    }, []);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        const filtered = positions.filter((position) =>
            position.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredPositions(filtered);
    };

    const handleDelete = async (id: number) => {
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

    const handleEdit = (id: number) => {
        navigate(`/edit/${id}`);
    };

    return (
        <div className="container">
            <h1>Job Positions</h1>
            <input
                type="text"
				className="form-control"
                placeholder="Search by title..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
            />
            <Table
                positions={filteredPositions}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            <button onClick={() => navigate("/create")} className="btn btn-primary">Create New Position</button>
        </div>
    );
};

export default PositionsPage;
    