import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../css/InventoryTable.css"
import "../services/api.js"
import { deleteItem } from "../services/api.js";

function InventoryTable({ items, onReload }) {
  const navigate = useNavigate();
  const [isDeleted, setIsDeleted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleUpdate = (item) => {
    navigate("/form", {
      state: { isUpdated: true, itemData: item },
    });
  }

  const handleDelete = (item) => {
    setSelectedItem(item);
    setConfirmDelete(true);
  };

  const confirmDeleteItem = async () => {
    try {
      await deleteItem(selectedItem.id);
      setIsDeleted(true);
      setIsSuccess(true);
      setConfirmDelete(false);
      setSelectedItem(null);
      setTimeout(() => {
        setIsDeleted(false);
        setIsSuccess(false);
      }, 2000)
      await onReload();
    } catch (err) {
      setIsDeleted(true);
      console.log(err);

      setTimeout(() => {
        setIsDeleted(false);
        setConfirmDelete(false);
        setSelectedItem(null);
      }, 2000)

    }
  }

  const cancelDelete = () => {
    setConfirmDelete(false);
    setSelectedItem(null);
  }

  if (!items.length) return <p>No items found.</p>;

  return (
    <div>
      <table
        border="1"
        cellPadding="10"
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Color</th>
            <th>Type</th>
            <th>Supplier</th>
            <th>Manufacturer</th>
            {user?.role === "Editor" && (<th>Action</th>)}
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.color}</td>
              <td>{item.type}</td>
              <td>{item.supplier}</td>
              <td>{item.manufacturer}</td>

              {user?.role == "Editor" && (
                <td style={{ width: "13vw" }}>
                  <button
                    onClick={() => handleUpdate(item)}
                    class="update-btn"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    class="delete-btn"
                  >
                    Delete
                  </button>
                </td>)
              }
            </tr>
          ))}
        </tbody>
      </table>
      {confirmDelete && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <p>
              Are you sure you want to delete{" "}
              <strong>{selectedItem?.name}</strong>?
            </p>
            <div className="confirm-buttons">
              <button onClick={confirmDeleteItem} className="confirm-yes">
                Yes
              </button>
              <button onClick={cancelDelete} className="confirm-no">
                No
              </button>
            </div>
          </div>
        </div>
      )}
      {isDeleted && (
        <div className="alert-overlay">
          <div className="alert-box" style={{}}>
            <p style={{
              color: isSuccess ? "green" : "red"
            }}>
              Delete Item
              {isSuccess
                ? "Successfully"
                : "Failed"
              }
            </p>
            <div>
              {isSuccess
                ? <img src="../../public/success.png" alt="success" style={{ width: "5vw" }} />
                : <img src="../../public/fail.png" alt="fail" style={{ width: "5vw" }} />
              }
            </div>
          </div>
        </div>
      )}
    </div >
  );
}

export default InventoryTable;
