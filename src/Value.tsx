import React from "react";


type ValueType = {
    stile: string
    title: number | string
}

export const Value: React.FC<ValueType> = ({title, stile}) => {
    return (
        <div className={stile} >{title}</div>
    )
}
