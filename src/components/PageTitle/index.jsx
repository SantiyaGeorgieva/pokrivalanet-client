import { useEffect } from "react";

const PageTitle = (title) => {
    const defaultTitle = "Тенти и Брезенти Русе, Ветроупорни Завеси, Тир Покривала | Покривала НЕТ";

    useEffect(() => {
        document.title = title || defaultTitle;
    }, [defaultTitle, title]);
};

export default PageTitle;