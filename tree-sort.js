class TreeNode {
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
}

function insert(root, key) {
    if (!root) {
        return new TreeNode(key);
    }

    if (key < root.key) {
        root.left = insert(root.left, key);
    } else if (key > root.key) {
        root.right = insert(root.right, key);
    }

    return root;
}

function inorderTraversal(root, result) {
    if (root) {
        inorderTraversal(root.left, result);
        result.push(root.key);
        inorderTraversal(root.right, result);
    }
}

function treeSort(arr) {
    let root = null;

    // Constrói a árvore binária de busca
    for (let i = 0; i < arr.length; i++) {
        root = insert(root, arr[i]);
    }

    const result = [];

    // Realiza a travessia inorder para obter os elementos ordenados
    inorderTraversal(root, result);

    return result;
}


const unsortedArray = [38, 27, 43, 3, 9, 82, 10];
const sortedArray = treeSort(unsortedArray);

console.log("Array não ordenado:", unsortedArray);
console.log("Array ordenado:", sortedArray);
