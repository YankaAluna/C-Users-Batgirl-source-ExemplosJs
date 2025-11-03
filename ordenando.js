//* ordenando.js
   Versão limpa e organizada
   - Utilitários
   - Algoritmos de ordenação
   - Helpers DOM
   - Handlers de interação
   - Inicialização (event listeners)
*/

// --------------------
// Utilitários
// --------------------
const swap = (arr, i, j) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
};

const shuffle = (arr, qtdTrocas = arr.length) => {
    for (let k = 0; k < qtdTrocas; k++) {
        const i = Math.floor(Math.random() * arr.length);
        const j = Math.floor(Math.random() * arr.length);
        swap(arr, i, j);
    }
    return arr;
};

// --------------------
// Algoritmos de ordenação
// --------------------
const bubbleSort = (arr) => {
    const a = arr;
    const n = a.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (a[j] > a[j + 1]) swap(a, j, j + 1);
        }
    }
    return a;
};

const selectionSort = (arr) => {
    const a = arr;
    const n = a.length;
    for (let i = 0; i < n - 1; i++) {
        let min = i;
        for (let j = i + 1; j < n; j++) if (a[j] < a[min]) min = j;
        if (min !== i) swap(a, i, min);
    }
    return a;
};

const partition = (arr, low, high) => {
    const pivot = arr[high];
    let i = low;
    for (let j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            swap(arr, i, j);
            i++;
        }
    }
    swap(arr, i, high);
    return i;
};

const quickSort = (arr, low = 0, high = arr.length - 1) => {
    if (low < high) {
        const p = partition(arr, low, high);
        quickSort(arr, low, p - 1);
        quickSort(arr, p + 1, high);
    }
    return arr;
};

// --------------------
// Helpers DOM
// --------------------
const readListValues = (listElement) => {
    if (!listElement) return [];
    return Array.from(listElement.children)
        .map(li => parseInt(li.textContent, 10))
        .filter(n => !Number.isNaN(n));
};

const renderListValues = (listElement, arr) => {
    if (!listElement) return;
    listElement.innerHTML = arr.map(v => `<li>${v}</li>`).join('');
};

// --------------------
// Handlers de interação
// --------------------
const handleAdd = () => {
    const campoValor = document.getElementById('valor');
    const listaValores = document.getElementById('valores');
    if (!campoValor || !listaValores) return;
    const val = campoValor.value.trim();
    if (val === '') return;
    const li = document.createElement('li');
    li.textContent = val;
    listaValores.appendChild(li);
    campoValor.value = '';
    campoValor.focus();
};

const handleOrdenar = () => {
    const listaValores = document.getElementById('valores');
    const algoritmo = document.getElementById('algoritmo');
    const arr = readListValues(listaValores);
    if (arr.length === 0) return;
    switch (algoritmo.selectedIndex) {
        case 0:
            bubbleSort(arr);
            break;
        case 1:
            selectionSort(arr);
            break;
        case 2:
            quickSort(arr, 0, arr.length - 1);
            break;
        default:
            break;
    }
    renderListValues(listaValores, arr);
};

const handleMisturar = () => {
    const listaValores = document.getElementById('valores');
    const arr = readListValues(listaValores);
    if (arr.length === 0) return;
    shuffle(arr, arr.length);
    renderListValues(listaValores, arr);
};

const handleLimpar = () => {
    const listaValores = document.getElementById('valores');
    if (listaValores) listaValores.innerHTML = '';
};

// --------------------
// Inicialização: registra event listeners (melhora separação HTML/JS)
// --------------------
document.addEventListener('DOMContentLoaded', () => {
    const btnAdicionar = document.getElementById('btnAdicionar');
    const btnOrdenar = document.getElementById('btnOrdenar');
    const btnMisturar = document.getElementById('btnMisturar');
    const btnLimpar = document.getElementById('btnLimpar');

    if (btnAdicionar) btnAdicionar.addEventListener('click', handleAdd);
    if (btnOrdenar) btnOrdenar.addEventListener('click', handleOrdenar);
    if (btnMisturar) btnMisturar.addEventListener('click', handleMisturar);
    if (btnLimpar) btnLimpar.addEventListener('click', handleLimpar);
});

