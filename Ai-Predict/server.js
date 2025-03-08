const express = require('express');
const path = require('path');
const { recommendInsurance } = require('./insuranceRecommender');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.post('/recommend', async (req, res) => {
    try {
        const recommendation = await recommendInsurance(req.body);
        res.send(recommendation);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Failed to generate recommendation');
    }
});

app.listen(port, () => {
    console.log(`Insurance recommendation system running at http://localhost:${port}`);
}); 