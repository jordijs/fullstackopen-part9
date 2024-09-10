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

console.log(calculateBmi(170, 45));
console.log(calculateBmi(180, 74));
console.log(calculateBmi(182, 86));
console.log(calculateBmi(175, 92));