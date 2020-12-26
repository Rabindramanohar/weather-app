import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
    { id: 'city', label: 'Cities', minWidth: 170 },
    { id: 'temp', label: 'Temperature', minWidth: 100 },
    { id: 'minTemp', label: 'Min Temp', minWidth: 100 },
    { id: 'maxTemp', label: 'Max Temp', minWidth: 100 },
    {
        id: 'pressure',
        label: 'Pressure',
        minWidth: 150,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'humidity',
        label: 'Humidity',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'wind',
        label: 'Wind Pressure',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2),
    },
];

function createData(city, temp, minTemp, maxTemp, pressure, humidity, wind) {
    return {city, temp, minTemp, maxTemp, pressure, humidity, wind};
}

function compare(a, b) {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
}


const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

export default function AllCities() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [weather, setWeather] = useState([]);

    const rows = weather.map(item => {
        let city = item.name;
        let temp = item.main.temp;
        let minTemp = item.main.temp_min;
        let maxTemp = item.main.temp_max;
        let pressure = item.main.pressure;
        let humidity = item.main.humidity;
        let wind = item.wind.speed;
    
        return createData(city, temp, minTemp, maxTemp, pressure, humidity, wind);
    });

    
    useEffect(() => {
        fetch('https://api.openweathermap.org/data/2.5/find?lat=22.80&lon=86.20&cnt=50&appid=c58eb7f7b64c9ad1f5a7e0868abfb8ea')
        .then(res => res.json())
        .then(r => {
            const tempArr = r.list;
            tempArr.sort(compare);
            setWeather(tempArr);
            // console.log(tempArr);
            // console.log(tempArr.map(item => item.main.temp_min));
        });
    }, []);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div>
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.city}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            // console.log(column);
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}
