const express = require("express");
const bodyParser = require("body-parser");
const { exec } = require("child_process");
const fs = require("fs");
const path = require('path')

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(require("cors")());

app.get("/run", (req, res) => {
  const hey = "Hello mr. Dev";
   res.json({ hey });
});

app.post("/run", (req, res) => {
  const code = req.body.code;
  const currentDate = new Date();

const formattedDate = currentDate.toLocaleDateString(); // e.g., '12/6/2024'
const formattedTime = currentDate.toLocaleTimeString(); // e.g., '10:48:52 AM'

console.log("Formatted Date:", formattedDate);
console.log("Formatted Time:", formattedTime);
  console.log("new code come for run From",req.ip, formattedDate,"--",formattedTime)
  // Save the C code to a file
  const filePath = path.join(__dirname, "code.c");
  fs.writeFileSync(filePath, code);

  // Compile and run the C code using gcc
  exec(`gcc code.c -o code && ./code`, (error, stdout, stderr) => {
    if (error || stderr) {
      console.error("Compilation/Execution Error:", error || stderr);
      return res.json({ error: stderr || error.message });
    }

    // Send the program output as response

    res.json({ output: stdout });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
