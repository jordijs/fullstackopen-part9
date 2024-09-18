import express from 'express';
import { calculateBmi, validateBmi } from './bmiCalculator';
import qs from 'qs';

const app = express();

app.set('query parser',
    (str: string) => qs.parse(str, { /* custom options */ }));

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    try {
        const heightCm = Number(req.query.height);
        const weightKg = Number(req.query.weight);
        validateBmi(heightCm, weightKg);
        res.send(calculateBmi(heightCm, weightKg));
    } catch (error: unknown) {
        let errorMessage = 'A problem ocurred. ';
        if (error instanceof Error) {
            errorMessage += ` Error: ${error.message}`;
        }
        console.error(errorMessage);
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});