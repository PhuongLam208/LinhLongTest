import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5133/api"
});

export const login = (username, password) => API.post("/auth/login", {username, password});

export const viewItems = () => API.get("/item/view-all");
export const createItem = (data) => API.post("/item/create", data);
export const updateItem = (id,data) => API.put(`/item/update/${id}`, data);
export const deleteItem = (id) => API.delete(`/item/delete/${id}`);

export const getSuppliers = () => API.get("/supplier/view-all");
export const getManufacturers = () => API.get("/manufacturer/view-all");
