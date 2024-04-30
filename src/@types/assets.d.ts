//это мы сделали чтобы TS не ругался на импортируемы медиа файлы
//также мы прикрутили ссылку на этот файл внутри tsconfig.json далее Вебпак сам будет его читать и глобально использует

declare module "*.svg" {
    const content: any;
    export default content;
}

declare module "*.png" {
    const content: any;
    export default content;
}

declare module "*.jpg" {
    const content: any;
    export default content;
}

declare module "*.scss" {
    const content: any;
    export default content;
}
