import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Container } from "@mui/system";
import { useState, useEffect } from "react";
import axios from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { removeTask, setTasks } from "../redux/TaskSlice";
import Header from "./Header";
import { Link } from "react-router-dom";
import Task from "../components/Task";
import Stack from "@mui/material/Stack";
const Home = () => {
  const dispatch = useDispatch();
  const [typeFilter, setTypeFilter] = useState("");
  const [dayFilter, setDayFilter] = useState("");
  const [page, setPage] = useState(0);
  const types = ["default", "personal", "shopping", "wishlist", "work"];
  const days = [
    { label: "Today", value: "today" },
    { label: "Last seven", value: "seven" },
    { label: "Last Thirty", value: "thirty" },
  ];
  useEffect(() => {
    axios.get(`/task?type=${typeFilter}&day=${dayFilter}`).then((res) => {
      dispatch(setTasks(res.data.tasks));
    });
  }, [typeFilter, dayFilter, page]);
  const { tasks } = useSelector((state) => state.task);
  const taskshown = tasks.filter(
    (element, index) => index >= page * 4 && index < (page + 1) * 4
  );

  const handleTypeChange = (e) => {
    setTypeFilter(e.target.value);
  };
  // Delete task from database
  const deleteTask = (id) => {
    axios
      .delete(`/task/${id}`)
      .then((result) => {
        dispatch(removeTask(id));
        setTasks(result.data.tasks);
      })
      .catch((err) => console.log(err));
  };
  return (
    <Box>
      <Header />
      <Container>
        <Box display="flex" justifyContent="space-between" mt="2rem">
          <FormControl style={{ minWidth: 150 }}>
            <InputLabel>Select Type</InputLabel>
            <Select value={typeFilter} onChange={handleTypeChange}>
              {types.map((type, idx) => (
                <MenuItem key={`${idx}-${type}`} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Stack direction="row" spacing={2}>
            {days.map((day, idx) => (
              <Button
                variant="contained"
                size="small"
                color={day.value === dayFilter ? "success" : "secondary"}
                key={`${idx}-${day.value}`}
                onClick={() => {
                  setDayFilter(day.value);
                }}
              >
                {day.label}
              </Button>
            ))}
          </Stack>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Button
            onClick={() => {
              setTypeFilter("");
              setDayFilter("");
            }}
          >
            Clear filters
          </Button>
        </Box>
        <Box display="flex" justifyContent="center">
          <Button
            onClick={() => {
              if (page > 0) setPage(page - 1);
            }}
          >
            Previous
          </Button>
          <Button size="large" disabled>
            {page}
          </Button>
          <Button
            onClick={() => {
              setPage(page + 1);
            }}
          >
            Next
          </Button>
        </Box>
        <Box mt="2rem">
          <Grid container spacing={2}>
            {taskshown.map((task, idx) => (
              <Grid item xs={12} md={3} key={`${idx}-${task.id}`}>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/task/${task._id}`}
                >
                  <Task task={task} />
                </Link>
                <Button onClick={() => deleteTask(task._id)}>Delete</Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};
export default Home;
