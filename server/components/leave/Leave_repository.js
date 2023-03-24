import LeaveRecord from "../../model/LeaveRecord_model.js";
import Employee from "../../model/Employee_model.js";
import Department from "../../model/Department_model.js";
import LeaveType from "../../model/LeaveType_model.js";

const createLeave = async (data) => {
    return LeaveRecord.create(data);
};

const getFilterLeave = async ({ department_id, employee_id, leave_type_id }) => {
    const where = {};

    if (department_id) {
        where['$department_id$'] = department_id;
    }

    if (employee_id) {
        where['$employee_data.employee_id$'] = employee_id;
    }

    if (leave_type_id) {
        where['leave_type_id'] = leave_type_id;
    }

    return LeaveRecord.findAll({
        where,
        include: [
            {
                model: Employee,
                as: 'employee_data',
                attributes: ['name', 'department_id'],
            },
        ],
    });
};


const getAllLeaves = async () => {
    return LeaveRecord.findAll();
};

const getLeaveById = async (employee_id) => {
    return LeaveRecord.findAll({ where: { employee_id } });
};
const getSupervisorEmailById = async (employee_id) => {
    const supervisor_id = await Employee.findOne({
        where: { employee_id },
        include: {
            model: Department,
            as: 'department',
            attributes: ['supervisor_id'],
        },
    }).then((employee) => employee.department.supervisor_id);

    const supervisor_email = await Employee.findOne({
        where: { employee_id: supervisor_id },
        attributes: ['email'],
    }).then((employee) => employee.email);

    return supervisor_email;
};


const updateLeave = async (seq, data) => {
    const updateResult = await LeaveRecord.update(data, { where: { seq }, returning: true });
    return updateResult[1][0];
};

const deleteLeave = async (seq) => {
    return LeaveRecord.destroy({ where: { seq } });
};

export default { getAllLeaves, getLeaveById, createLeave, updateLeave, deleteLeave, getFilterLeave, getSupervisorEmailById };
