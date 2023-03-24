import express from "express";
import leaveService from "./Leave_service.js";

const LeaveController = express.Router();

LeaveController.get("/", leaveService.getAllLeaves);
LeaveController.get("/filter", leaveService.getFilterLeave); //主管取得部門請假資料

LeaveController.post("/", leaveService.createLeave);
LeaveController.get("/:id", leaveService.getLeave);
LeaveController.put("/", leaveService.updateLeave);
LeaveController.delete("/:id", leaveService.deleteLeave);

export default LeaveController;
