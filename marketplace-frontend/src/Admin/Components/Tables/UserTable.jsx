import React, { useState ,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Container,
    InputAdornment,
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
}
    from '@mui/material'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AiOutlineSearch,AiFillDelete  } from 'react-icons/ai';
import AddUser from '../AddUser';

const UserTable = ({ user, getUser }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [open, setOpen] = useState(false); 
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        setFilteredUsers(filterUsers());
    }, [user, searchTerm]);

 
    const handleClickOpen = (id) => {
        console.log(id);
        setDeleteId(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirmDelete = async () => {
        if (deleteId !== null) {
            try {
                const { data } = await axios.delete(`http://localhost:8080/api/v1/users/${deleteId}`, {
                    withCredentials: true
                });
                if (data.code == 10000) {
                    toast.success("Product deleted successfully", { autoClose: 500, theme: 'colored' })
                    getUser();
                }
                else {
                    toast.error("Something went wrong", { autoClose: 500, theme: 'colored' })
                }
    
            } catch (error) {
    
                toast.error(error.response.data, { autoClose: 500, theme: 'colored' })
            }
            console.log(`Delete user with id: ${deleteId}`);
            
        }
        setOpen(false);
    };


    const columns = [
        {
            id: 'name',
            label: 'Name',
            minWidth: 100,
            align: 'center',
        },
        {
            id: 'surname',
            label: 'surname',
            minWidth: 100,
            align: 'center',
        },
        {
            id: 'username',
            label: 'Username',
            minWidth: 70,
            align: 'center',

        },
        {
            id: 'email',
            label: 'Email',
            minWidth: 70,
            align: 'center',

        },
    ];
    const handleSearchInputChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        const newFilteredData = filterUsers();
        setFilteredUsers(filteredUsers);
    };

    const filterUsers = () => {
        if (searchTerm === '') {
            console.log(user);
            return user;
        }
        return user.filter(
            (item) =>
            (item.name &&
                item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (item.description &&
                item.surname.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (item.price &&
                item.email.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
            (item.username &&
                item.username.toLowerCase().includes(searchTerm.toLowerCase())) 
        );
    };


    return (
        <>
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 5, marginTop: 5 }}>

                <TextField
                    id="search"
                    type="search"
                    label="Search Users"
                    value={searchTerm}
                    onChange={handleSearchInputChange}
                    className="placeholder-animation"
                    sx={{ width: { xs: 350, sm: 500, md: 800 }, }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <AiOutlineSearch />
                            </InputAdornment>
                        ),
                    }}
                />
            </Container>
            <AddUser getUser={getUser} user={user} />
            <Paper
                style={{overflow: "auto"}}>
                <TableContainer component={Paper} sx={{ maxHeight: '400px' }}>
                    <Table stickyHeader aria-label="sticky table" >
                        <TableHead sx={{ position: 'sticky', top: 0 }}>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth, color: "#1976d2",fontWeight:'bold' }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {filteredUsers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={columns.length}>
                                        <div style={{ display: "flex", justifyContent: "center" }}>
                                            <h4> User not found.</h4>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (filteredUsers.map((info) => (
                                <TableRow
                                    key={info.id}

                                >
                                    <TableCell component="th" scope="row" align="center">
                                        <Link to={`user/${info.id}`}>
                                            {info.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="center">
                                        <Link to={`user/${info.id}`}>
                                            {info.surname}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Link to={`user/${info.id}`}>
                                            {info.username}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Link to={`user/${info.id}`}>
                                            {info.email}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="center">
                                    <AiFillDelete
                                                color="red"
                                                onClick={() => handleClickOpen(info.id)}
                                                style={{ cursor: 'pointer' }}
                                            />
                                    </TableCell>
                                </TableRow>
                            ))
                            )
                            }
                        </TableBody>
                    </Table>
                </TableContainer >
            </Paper>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this user?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="secondary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>

    )
}

export default UserTable