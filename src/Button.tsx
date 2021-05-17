import React from "react";


type ButtonType = {
    title: string
    error: boolean
    button: () => void
}

export const Button: React.FC<ButtonType> = ({title, button, error}) => {
    return (
        <button className={error ? title + "Error" : title} onClick={button}>{title}</button>)
}

export default Button;
