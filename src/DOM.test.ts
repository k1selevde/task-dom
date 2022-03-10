import { appendToBody, generateTree, replaceNodes } from './DOM';

describe('Работа с DOM', () => {
    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('Вставка элементов: 5 последовательных тегов P с содержимым и аттрибутами', () => {
        appendToBody('p', 'Привет, мир!', 5);
        expect(document.body).toMatchSnapshot();
    });

    it('Рекурсивное построение дерева тегов DIV с вложенностью 3, по 3 ветки в узле', () => {
        expect(generateTree(3, 3)).toMatchSnapshot();
    });

    it('Автозамена элементов дерева тегов с сохранением вложенной структуры', () => {
        expect(replaceNodes()).toMatchSnapshot();
    });
});
