import {
  Card,
  Box,
  CardContent,
  CardActionArea,
  Typography,
  Button,
} from "@mui/material";
const Task = ({ task }) => {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              {task.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Date: {task.date.split("T")[0]}
            </Typography>
            <Typography sx={{ p: 0 }}>{task.type}</Typography>
            <Typography component="p">{task.status}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};
export default Task;
