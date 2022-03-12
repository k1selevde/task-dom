/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
  Необходимо, чтобы функция осуществила вставку на страницу указанный тег с указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, допускающий вставку текста в качестве своего содержимого (P, DIV, I и пр.).
*/
export function appendToBody(tag, content, count) {
    for (var i = 0; i < count; i++) {
        var element = document.createElement(tag)
        element.innerHTML = content;
        document.body.appendChild(element)
    }
}

/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида item_n, где n - глубина вложенности элемента. (Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве результата работы функции.
*/
export function generateTree(childrenCount, level) {

    const createTreeNodes = (parentNode, count, level) => {
        for (var i = 0; i < count; i++) {
            var elem = document.createElement('div')
            elem.classList.add(`item_${level}`);

            parentNode.appendChild(elem)
        }
    }

    // проверка по-хорошему, что childrenCount > 0, level > 0
    var root = document.createElement('div')
    root.classList.add('item_1');

    var bodyNode =  document.body
    bodyNode.appendChild(root)

    for (var i = 1; i < level; i++) {
        for (var j = 0; j < Math.pow(childrenCount, i - 1); j++) {
            var parent = bodyNode.getElementsByClassName(`item_${i}`)[j]
            createTreeNodes(parent, childrenCount, i + 1)
        }
    }

    return bodyNode.firstChild;
}

/*
  Используйте функцию для создания дерева тегов DIV из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом элементов в каждом узле 2.
  Далее замените все узлы второго уровня (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве результата работы функции.
*/
export function replaceNodes() {
    const tree = generateTree(2,3)

    var bodyNode = document.body
    document.body.appendChild(tree)

    //hard
    var level = 2
    var tagName = 'section'

    var replaceTags = bodyNode.getElementsByClassName(`item_${level}`);


    const insertChildrenToNode = (node, childrens) => {
        Array.from(childrens).forEach(child => {
            var clone = child.cloneNode(true)
            node.appendChild(clone)
        });
    }

    for (var elem of replaceTags) {
        var newTag = document.createElement(tagName);
        newTag.classList.add(`item_${level}`);

        var elemChildrens = elem.children;
        insertChildrenToNode(newTag, elemChildrens)

        elem.parentNode.replaceChild(newTag, elem);
    }

    return  bodyNode.firstChild;
}
