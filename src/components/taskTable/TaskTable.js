import React, { useState } from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { v4 as uuidv4 } from 'uuid';
import './taskTable.css';

const intialState = {
    name: "",
    description: ""
}

export const TaskTable = () => {
    const [open, setOpen] = useState(false);
    const [taskDetails, setTaskDetails] = useState(intialState);
    const [taskDetailsList, setTaskDetailsList] = useState([]);
    // const [description, setEmail] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setTaskDetails(intialState);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setTaskDetails({ ...taskDetails, [id]: value })
    }

    const handleSaveTaskDetails = () => {
        if (!taskDetails.name || !taskDetails.description) return alert("Please enter all fields")
        let data = {
            ...taskDetails,
            uniqueId: uuidv4()
        }
        setTaskDetailsList((arr) => [...arr, data]);
        handleClose()
    }

    const deleteTask = (uniqueId) => {
        if (window.confirm("Are you sure want to delete this item?") === true) {
            setTaskDetailsList((arr) => [...arr.filter(item => item.uniqueId !== uniqueId)]);
        }
    }

    console.log(taskDetails)
    console.log(taskDetailsList)
    return (
        <div>
            <div className='tableHeader bb1px'>
                <span className='tableTitle'>TASK</span>
                <AddBoxIcon className='iconStyle' onClick={handleClickOpen} />
            </div>

            <div className='tableContents'>
                {
                    taskDetailsList?.length ?
                        taskDetailsList.map((item, i) => {
                            return (
                                <div className='eachRowDetails'>
                                    <span>
                                        {i + 1}
                                    </span>
                                    <span>
                                        {item.name}
                                    </span>
                                    <span>
                                        {item.description}
                                    </span>
                                    <span className='iconStyle'>
                                        <EditIcon onClick={() => deleteTask(item.uniqueId)} />
                                    </span>
                                    <span className='iconStyle'>
                                        <DeleteIcon onClick={() => deleteTask(item.uniqueId)} />
                                    </span>
                                </div>
                            )
                        })
                        : null
                }

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>ADD TASK</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="NAME"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            value={taskDetails.name}
                        />
                        <TextField
                            margin="dense"
                            id="description"
                            label="DESCRIPTION"
                            type="description"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            value={taskDetails.description}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>CANCEL</Button>
                        <Button onClick={handleSaveTaskDetails}>SAVE</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}