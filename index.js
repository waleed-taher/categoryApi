const express = require('express');
const fs = require('fs');
const csv = require("fast-csv");
const path = require("path");
const connectToDatabase = require("./db/connection");
const CategoryReport = require("./models/category.model.js");

const app = express();
const PORT = 3001;
const apiCSVFilePath = path.join(__dirname, "dataset", "Category.csv" ) 

app.get('/', (req,res) => {
    res.send("Hello World");
})

app.get('/api/category', async (req, res) => {
    try {
        const data = await CategoryReport.find().lean();
        return res.status(200).json(data)
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

const getDataFromApi = async () => {
    const allRec = [];
  try {
    fs.createReadStream(csvFilePath, { encoding: "utf-8" })
      .pipe(csv.parse({ headers: true }))
      .on("error", (err) => console.error(err.message))
      .on("data", (row) => {
        allRec.push(row);
      })
      .on("end", async (rowCount) => {
        console.log(`Parsed ${rowCount} rows`);
        try {
          await CategoryReport.insertMany(allRec);
          console.log("All records inserted");
        } catch (error) {
          console.error("Error inserting records:", error);
        }
      });
  } catch (error) {
    console.error(`error is: ${error.message}`);
  }
};


app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    await connectToDatabase()
    await getDataFromApi()
});
