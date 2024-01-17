const express = require('express');
const fs = require('fs');
const csv = require("fast-csv");
const path = require("path");

const app = express();
const PORT = 3001;
const apiCSVFilePath = path.join(__dirname, "dataset", "Category.csv" ) 


app.get('/api/category', async (req, res) => {
    try {
        const data = await getDataFromApi();
        console.log(data);
        return res.status(200).json(data);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

const getDataFromApi = () => {
    return new Promise((resolve, reject) => {
        const allRec = [];

        const stream = fs.createReadStream(apiCSVFilePath, { encoding: 'utf-8' })
            .pipe(csv.parse({ headers: true }))
            .on('error', (err) => {
                console.error(err.message);
                reject(err);
            })
            .on('data', (row) => {
                allRec.push(row);
            })
            .on('end', () => {
                resolve(allRec);
            });

        
        stream.on('error', (err) => {
            console.error(err.message);
            reject(err);
        });
    });
};


app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
