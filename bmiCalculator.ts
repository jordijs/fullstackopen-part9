interface BmiValues {
    heightCm: number,
    weightKg: number;
}

const parseBmiArguments = (args: string[]): BmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');

    const heightCm: number = Number(args[2]);
    const weightKg: number = Number(args[3]);

    if ((heightCm > 1000) || (weightKg > 1000)) throw new Error('Values are too high');

    if (!isNaN(heightCm) && !isNaN(weightKg)) {
        return { heightCm, weightKg };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

const calculateBmi = (heightCm: number, weightKg: number): string => {
    const heightM = heightCm / 100;

    const bmi = weightKg / (heightM * heightM);

    if (bmi < 18.5) {
        return 'Underweight';
    } else if ((bmi >= 18.5) && (bmi < 25)) {
        return 'Normal range';
    } else if ((bmi >= 25) && (bmi < 30)) {
        return 'Overweight';
    } else {
        return 'Obese';
    }
};

try {
    const { heightCm, weightKg } = parseBmiArguments(process.argv);
    console.log(calculateBmi(heightCm, weightKg));
} catch (error: unknown) {
    let errorMessage = 'A problem ocurred. ';
    if (error instanceof Error) {
        errorMessage += ` Error: ${error.message}`;
    }
    console.error(errorMessage);
}