import { Container } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import './App.css';



function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [Pagination, setPagination] = useState([]);
  // let [page, setPage] = useState(0);
  // let page = 0;
  const API_URL =
    `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`;

  // useEffect(() => {
  //    fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0`)


  useEffect(() => {
    setInterval(() => dataFatcher(API_URL), 5000);
  }, []);

  const dataFatcher = async (url) => {
    // let tempData = data;
    await fetch(url)
      .then((res) => res.json())
      .then((d) => {
        setData(d.hits)
        let temp = [...data];
        temp.push(d.hits);
        setPage(page + 1);
        let tempPaginition = [...Pagination];
        tempPaginition.push(page + 1);
        setPagination(tempPaginition);
      });
    // setData(tempData)

  }

  console.log(page);
  const handlePageClick = async (page) => {
    await fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`)
      .then((res) => res.json())
      .then((d) => setData(d.hits));
  }

  return (
    <div className="App">
      {
        <Container fixed>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>All Data</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.title}
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>

      }
      {
        <Container fixed>
          <Stack spacing={2}>
            {/* <Pagination count={page} variant="outlined" color="primary" onClick={() => handlePageClick(page)} /> */}
            <ul>{
              Pagination.map(i => <li>{i}</li>)
            }
            </ul>
          </Stack>
        </Container>
      }


    </div>

  );
}

export default App;
