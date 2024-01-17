require('dotenv').config();

const express = require('express');
const fs = require('fs');
const csv = require("fast-csv");
const path = require("path");
const connectToDatabase = require("./db/connection");
const CategoryDetailsReport = require("./models/category.model.js");

const app = express();
const port = process.env.PORT || 3000;
const apiCSVFilePath = path.join(__dirname, "dataset", "Category.csv" ) 

const MONGODB_URI = process.env.MONGODB_URI;


app.get('/', (req,res) => {
    res.send("Hello World");
})

app.get('/api/category', async (req, res) => {
    try {
        const data = await CategoryDetailsReport.find().lean();
        return res.status(200).json(data)
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

const getDataFromApi = async () => {
    const allRec = [];
  try {
    fs.createReadStream(apiCSVFilePath, { encoding: "utf-8" })
      .pipe(csv.parse({ headers: true }))
      .on("error", (err) => console.error(err.message))
      .on("data", (row) => {
        allRec.push(row);
      })
      .on("end", async (rowCount) => {
        console.log(`Parsed ${rowCount} rows`);
        try {
            await CategoryDetailsReport.deleteMany()
          await CategoryDetailsReport.insertMany(allRec);
          console.log("All records inserted");
        } catch (error) {
          console.error("Error inserting records:", error);
        }
      });
  } catch (error) {
    console.error(`error is: ${error.message}`);
  }
};

app.listen(port, "0.0.0.0", async () => {
    // ...
    await connectToDatabase(MONGODB_URI)
    await getDataFromApi()
  });


