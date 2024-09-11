import express from 'express';
// import bmiCalculator from './bmiCalculator';
import qs from 'qs';

const app = express();

app.set('query parser',
    (str: string) => qs.parse(str, { /* custom options */ }));

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    console.log(req.query);
    res.send('bmi calculator in progress');
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});