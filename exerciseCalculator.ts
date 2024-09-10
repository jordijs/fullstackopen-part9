interface ExerciseValues {
    exerciseHours: number[],
    target: number;
}

interface ExerciseReturn {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number;
}

const parseExerciseArguments = (args: string[]): ExerciseValues => {
    if (args.length < 3) throw new Error('Not enough arguments');
    if (args.length < 4) throw new Error('Training hours per day are required');

    const exerciseHours: number[] = process.argv.slice(3).map(element => Number(element));

    exerciseHours.forEach(element => {
        console.log(element);
        if (isNaN(element)) {
            throw new Error('Training hours per day must be numbers');
        } else if (element > 24) {
            throw new Error('At least one exercise day is too high');
        }
    });

    const target: number = Number(process.argv[2]);

    if (isNaN(target)) {
        throw new Error('Target must be a number');
    } else if (target > 24) {
        throw new Error('Target is too high');
    } else {
        return {
            exerciseHours, target
        };
    }
};

const calculateExercises = (exerciseHours: number[], target: number): ExerciseReturn => {

    const periodLength: number = exerciseHours.length;

    const trainingDays: number = exerciseHours.filter(day => day > 0).length;

    const sum: number = exerciseHours.reduce(
        (accumulator: number, currentValue: number) => accumulator + currentValue, 0
    );

    const average: number = sum / periodLength;

    let rating: number;
    let ratingDescription: string;
    let success: boolean;

    if (average >= target) {
        rating = 3;
        ratingDescription = 'great! you reached your goal';
        success = true;
    } else if (average > (target / 2)) {
        rating = 2;
        ratingDescription = 'not too bad but could be better';
        success = false;
    } else {
        rating = 1;
        ratingDescription = 'too far from your goal, you should train more!';
        success = false;
    }

    return {
        periodLength, trainingDays, success, rating, ratingDescription, target, average
    };
};

try {
    const { exerciseHours, target } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(exerciseHours, target));
} catch (error: unknown) {
    let errorMessage = 'A problem ocurred. ';
    if (error instanceof Error) {
        errorMessage += ` Error: ${error.message}`;
    }
    console.error(errorMessage);
}