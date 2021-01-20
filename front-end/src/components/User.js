import React from 'react';
import { 
    AppBar, 
    Button,
    Tab, 
    Tabs,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@material-ui/core';
import styled from 'styled-components';


const rows = [
    {secret: 'sample secret 1', dateAdded: '1/19/21'},
    {secret: 'sample secret 2', dateAdded: '6/7/20'}
];

class User extends React.Component {
    state = {
        id: '',
        name: '',
        secrets: {}
    };

    render() {
        return (
            <>
                <AppBar 
                    position="static"
                    colorPrimary="purple">
                    <Tabs  
                        aria-label="Nav Tabs">
                        <Tab label="Home" />
                        <Tab label="About" />
                    </Tabs>
                </AppBar>
                <DivContainer>
                    Hello {this.state.name}! Here are your secrets.
                </DivContainer>
                <Button variant="contained" color="primary"> Add Secret </Button>
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
}

const DivContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 6em;
`;

export default User;
