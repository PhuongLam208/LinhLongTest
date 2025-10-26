import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InventoryTable from "../components/InventoryTable";
import "../css/InventoryPage.css"
import "../services/api.js"
import { viewItems } from "../services/api.js";

function InventoryPage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const fetchItems = async () => {
    try {
      const res = await viewItems();
      setItems(res.data);

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      navigate("/login");
    }
    fetchItems();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleCreate = () => {
    navigate("/form");
  }

  return (
    <div style={{ padding: "2rem" }}>
      <div class="title-container">
        <h1>Inventory Management</h1>
        <div style={{ display: "flex", marginTop: "1vh" }}>
          {user?.role === "Editor" && (
            <button onClick={handleCreate} class="create-btn">
              Create New
            </button>
          )}
          <button onClick={handleLogout} class="logout-btn">
            Log Out
          </button>
        </div>
      </div>
      <InventoryTable items={items} onReload={fetchItems}/>
    </div>
  );
}

export default InventoryPage;
