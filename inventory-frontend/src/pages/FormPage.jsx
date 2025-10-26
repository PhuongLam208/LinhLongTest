import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../css/FormPage.css";
import { getManufacturers, getSuppliers, createItem, updateItem } from "../services/api.js";

function FormPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const isUpdated = location.state?.isUpdated || false;
    const itemData = location.state?.itemData || {};
    const [suppliers, setSuppliers] = useState([]);
    const [manufacturers, setManufacturers] = useState([]);
    const [errors, setErrors] = useState({});
    const [isRun, setIsRun] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);


    const [formData, setFormData] = useState({
        name: itemData.name || "",
        description: itemData.description || "",
        color: itemData.color || "",
        type: itemData.type || "",
        supplierId: itemData.supplierId || 0,
        manufacturerId: itemData.manufacturerId || 0,
    });

    useEffect(() => {
        fetchDropdownData();
    }, [])


    const fetchDropdownData = async () => {
        const SupplierRes = await getSuppliers();
        const ManufacturerRes = await getManufacturers();
        setSuppliers(SupplierRes.data);
        setManufacturers(ManufacturerRes.data);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            console.log(itemData)
            const payload = {
                name: formData.name,
                description: formData.description,
                color: formData.color,
                type: formData.type,
                supplierId: parseInt(formData.supplierId),
                manufacturerId: parseInt(formData.manufacturerId),
            };

            if (!isUpdated) {
                await createItem(payload);
            } else {
                await updateItem(itemData.id, payload)
            }

            setIsRun(true);
            setIsSuccess(true);
            setTimeout(() => {
                setIsRun(false);
                setIsSuccess(false);
                navigate("/inventory");
            }, 2000)

        } catch (err) {
            if (err.response && err.response?.data) {
                setErrors(err.response.data);
            } else {
                setIsRun(true);
                setTimeout(() => {
                    setIsRun(false);
                }, 2000)
            }
            console.log(err);
        }
    };

    const handleCancel = () => {
        navigate("/inventory");
    };

    const handleReset = () => {
        setFormData({
            name: itemData.name || "",
            description: itemData.description || "",
            color: itemData.color || "",
            type: itemData.type || "",
            supplierId: itemData.supplierId || 0,
            manufacturerId: itemData.manufacturerId || 0,
        });
        setErrors({})
    }

    return (
        <div>
            <div className="inventory-container">
                <div className="inventory-form">
                    <h2>{isUpdated ? "Update Item" : "Create New Item"}</h2>
                    <form onSubmit={handleSave}>
                        {/* Name */}
                        <div className="form-group">
                            <label>Name</label>
                            <input name="name" value={formData.name} onChange={handleChange} placeholder="Input Name" />
                            {errors?.Name && <p style={{ color: "red" }}>{errors.Name[0]}</p>}
                        </div>
                        {/* Description */}
                        <div className="form-group">
                            <label>Description</label>
                            <input
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Input Description"
                            />
                        </div>
                        {/* Color */}
                        <div className="form-group">
                            <label>Color</label>
                            <input name="color" value={formData.color} onChange={handleChange} placeholder="Input Color" />
                        </div>
                        {/* Type */}
                        <div className="form-group">
                            <label>Type</label>
                            <input name="type" value={formData.type} onChange={handleChange} placeholder="Input Type" />
                        </div>
                        {/* Supplier */}
                        <div className="form-group">
                            <label>Supplier</label>
                            <select name="supplierId" value={formData.supplierId} onChange={handleChange}>
                                <option value="0">-- Select Supplier --</option>
                                {suppliers.map(s => (
                                    <option key={s.id} value={s.id}>{s.name}</option>
                                ))}
                            </select>
                            {errors?.SupplierId && <p style={{ color: "red" }}>{errors.SupplierId[0]}</p>}
                        </div>
                        {/* Manufacturer */}
                        <div className="form-group">
                            <label>Manufacturer</label>
                            <select name="manufacturerId" value={formData.manufacturerId} onChange={handleChange}>
                                <option value="0">-- Select Manufacturer --</option>
                                {manufacturers.map(m => (
                                    <option key={m.id} value={m.id}>{m.name}</option>
                                ))}
                            </select>
                            {errors?.ManufacturerId && <p style={{ color: "red" }}>{errors.ManufacturerId[0]}</p>}
                        </div>

                        <div className="button-group">
                            <button type="button" className="cancel-btn" onClick={handleCancel}>
                                Cancel
                            </button>
                            <button type="button" className="reset-btn" onClick={handleReset}>
                                Reset
                            </button>
                            <button type="submit" className="save-btn">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {isRun && (
                <div className="alert-overlay">
                    <div className="alert-box" style={{}}>
                        <p style={{ 
                            color: isSuccess ? "green" : "red"
                        }}>
                            {isUpdated
                                ? "Update Item "
                                : "Create New Item "
                            }
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
            )
            }
        </div>
    );
}

export default FormPage;
