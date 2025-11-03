// Funções em Padrão Arrow 
const swap = (arr, i, j) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
};
// Bubble Sort ordena e retorna o prórpio vetor
const bubbleSort = (arr) => {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
            }
        }
    }
    return arr;
};

const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        swap(arr, i, j);   
    }
    return arr;
};

const selection_sort = (arr) => {
    const n = arr.length; 
    for (let i = 0; i < n - 1; i++) {
        let min = i;
        for let j = i + 1; j < n; j++) {
            if (arr[j] < arr[min]) min = j;
        }
        if (min !== i) swap(arr, i, min);
    }
    return arr;
}
