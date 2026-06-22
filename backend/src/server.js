import app from "./app.js";
import connectDB from "./config/db.js";


connectDB();// should print re_xxxxx

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});