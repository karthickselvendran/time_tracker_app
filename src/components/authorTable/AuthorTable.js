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
import './authorTable.css';

const intialState = {
    name: "",
    email: ""
}

export const AuthorTable = () => {
    const [open, setOpen] = useState(false);
    const [authorDetails, setAuthorDetails] = useState(intialState);
    const [authorDetailsList, setAuthorDetailsList] = useState([]);
    const [editId, setEditId] = useState("");

    // const [email, setEmail] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setAuthorDetails(intialState);
        setEditId("")
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setAuthorDetails({ ...authorDetails, [id]: value })
    }

    const handleSaveAuthorDetails = () => {
        if (!authorDetails.name || !authorDetails.email) return alert("Please enter all fields")
        if (editId) {
            let editingIndex = authorDetailsList.findIndex(item => item.uniqueId === editId)
            console.log(editingIndex)
            let temp = [...authorDetailsList]
            temp.splice(editingIndex, 1, authorDetails)
            setAuthorDetailsList(temp)
        } else {
            let data = {
                ...authorDetails,
                uniqueId: uuidv4()
            }
            setAuthorDetailsList((arr) => [...arr, data]);
        }
        handleClose()
        setEditId("")
    }

    const deleteAuthor = (uniqueId) => {
        if (window.confirm("Are you sure want to delete this item?") === true) {
            setAuthorDetailsList((arr) => [...arr.filter(item => item.uniqueId !== uniqueId)]);
        }
    }

    const editAuthor = (uniqueId) => {
        setEditId(uniqueId)
        console.log(uniqueId)
        let user = authorDetailsList.find(item => item.uniqueId === uniqueId)
        setAuthorDetails(user)
        handleClickOpen()
    }

    console.log(authorDetails)
    console.log(authorDetailsList)
    return (
        <div>
            <div className='tableHeader bb1px'>
                <span className='tableTitle'>AUTHOR</span>
                <AddBoxIcon className='iconStyle' onClick={handleClickOpen} />
            </div>

            <div className='tableContents'>
                {
                    authorDetailsList?.length ?
                        authorDetailsList.map((item, i) => {
                            return (
                                <div className='eachRowDetails'>
                                    <span>
                                        {i + 1}
                                    </span>
                                    <span>
                                        {item.name}
                                    </span>
                                    <span>
                                        {item.email}
                                    </span>
                                    <span className='iconStyle'>
                                        <EditIcon onClick={() => editAuthor(item.uniqueId)} />
                                    </span>
                                    <span className='iconStyle'>
                                        <DeleteIcon onClick={() => deleteAuthor(item.uniqueId)} />
                                    </span>
                                </div>
                            )
                        })
                        : null
                }


                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>ADD AUTHOR</DialogTitle>
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
                            value={authorDetails.name}
                        />
                        <TextField
                            margin="dense"
                            id="email"
                            label="EMAIL"
                            type="email"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            value={authorDetails.email}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>CANCEL</Button>
                        <Button onClick={handleSaveAuthorDetails}>SAVE</Button>
                    </DialogActions>
                </Dialog>

            </div>
        </div>
    )
}
