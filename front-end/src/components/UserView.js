import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

const rows = [
    { secret: 'sample secret 1', dateAdded: '1/19/21' },
    { secret: 'sample secret 2', dateAdded: '6/7/20' }
];


export default function UserView () {
    const [id, setId] = useState(null)
    const [name, setName] = useState('Hillary')
    const [secrets, setSecrets] = useState(null)
    
    return (
        <>
            <Typography variant="h6">
                Hello {name}! Here are your secrets.
            </Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">Add a new secret</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text" fullWidth="true" type="text"/>
                <Button type="submit">Submit</Button>
            </FormControl>
            <TableContainer>
                <Table aria-label="secrets table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Secret</TableCell>
                            <TableCell align="right">Date Added</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.secret}>
                                <TableCell component="th" scope="row">
                                    {row.secret}
                                </TableCell>
                                <TableCell align="right">{row.dateAdded}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
