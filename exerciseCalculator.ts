interface ObjectExercise {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number;
}

const calculateExercises = (exercise: number[], target: number): ObjectExercise => {

    const periodLength = exercise.length;

    const trainingDays = exercise.filter(day => day > 0).length;

    const sum = exercise.reduce(
        (accumulator: number, currentValue: number) => accumulator + currentValue, 0
    );

    const average = sum / periodLength;

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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
console.log(calculateExercises([3, 3, 2, 4.5, 5.5, 3, 1, 3, 3, 2, 4.5, 5.5, 3, 1], 2));
console.log(calculateExercises([1, 0, 1, 0, 1], 3));
