interface ObjectExercise {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number;
}

const calculateExercises = (exerciseHours: number[], target: number): ObjectExercise => {

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

const exerciseHours: number[] = process.argv.slice(3).map(element => Number(element))
const target: number = Number(process.argv[2])

console.log(calculateExercises(exerciseHours, target));


