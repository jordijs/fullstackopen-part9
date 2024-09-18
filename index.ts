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

        if(!req.query.height || !req.query.weight) throw new Error('Height and weight are required')

        const heightCm = Number(req.query.height);
        const weightKg = Number(req.query.weight);

        validateBmi(heightCm, weightKg);

        const bmi = calculateBmi(heightCm, weightKg);

        res.send({
            weight: weightKg,
            height: heightCm,
            bmi
        });

    } catch (error: unknown) {

        if (error instanceof Error) {
            res.status(400).send({
                error: error.message
            });
        }

    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});