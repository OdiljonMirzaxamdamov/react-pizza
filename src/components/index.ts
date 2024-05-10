// Чтобы код читался легче, мы перенесём дефолтные ссылки на компоненты в один файл
// дальше подключая этот файл, будем вытаскивать нужные нам компоненты в одной строке. Это называется Re-Export.
export { default as Pagination } from "./Pagination";
export { default as PizzaBlock } from "./PizzaBlock";
export { default as Skeleton } from "./PizzaBlock/skeleton";
export { default as Search } from "./Search";
export { default as CartEmpty } from "./Cart-empty";
export { default as CartItem } from "./CartItem";
export { default as Categories } from "./Categories";
export { default as Header } from "./Header";
export { default as HomeEmpty } from "./Home-empty";
export { default as Sort } from "./Sort";


// Есть ещё один способ для Re-Export, она называется "Export Barrel" и выглядит как показано внизу.
// Работать будет как показано наверху один в один.
// Только в исходных файлах компонентов надо будет убрать "export default ...Component" и к самому рендеру прописать export.
// Таким образом код ещё больше сократиться за счёт того что убирается строка про default.
//
// export * from "./Pagination";
// export * from "./PizzaBlock";
// export * from "./PizzaBlock/skeleton";
// export * from "./Search";
// export * from "./Cart-empty";
// export * from "./CartItem";
// export * from "./Categories";
// export * from "./Header";
// export * from "./Home-empty";
// export * from "./Sort";
