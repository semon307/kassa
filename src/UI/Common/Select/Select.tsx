import React, {SelectHTMLAttributes, DetailedHTMLProps, ChangeEvent, useState, useEffect, KeyboardEvent} from 'react'
import s from "./Select.module.css"
type DefaultSelectPropsType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

type SuperSelectPropsType = DefaultSelectPropsType & {
    id: string
    options: Array<string>
    onChangeOption: (id: string, option: string) => void
}

const Select: React.FC<SuperSelectPropsType> = (
    {
        id,
        options,
        onChange, onChangeOption,
        ...restProps
    }
) => {
    const selectedItem = options.find(i => i === restProps.value)
    const [active, setActive] = useState<boolean>(false)
    const [hoveredElementValue, setHoveredElementValue] = useState(restProps.value)
    const hoveredItem = options.find(i => i === hoveredElementValue)
    const showItems = () => {
        setActive(!active)
    }
    useEffect(() => {
        setHoveredElementValue(restProps.value);
    }, [restProps.value])
    const onItemClicked = (value: string) => {
        onChangeOption(id, value)
        showItems();
    }
    const onKeyUp = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "ArrowDown" || "ArrowUp") {


            for (let i = 0; i < options.length; i++) {
                if (options[i] === hoveredItem) {
                    const pretendentElement = e.key === "ArrowDown" ? options[i + 1] : options[i - 1]


                    if (pretendentElement) {
                        onChangeOption(id, pretendentElement)
                        return;
                    }
                }
            }
            if (!selectedItem){
                onChangeOption(id, options[0])
            }

        }
        if (e.key === "Enter" || e.key === "Escape"){
            setActive(false)
        }

    }
    const mappedOptions = options.map(i => <div

        onMouseEnter={() => {
            setHoveredElementValue(i)
        }}
        className={s.item + " " + (hoveredItem === i ? s.selected : "")}
        onClick={() => {
            onItemClicked(i)
        }}
        key={i + options.indexOf(i)}>{i}</div>); // map options with key

    return (
        <>
            <div className={s.select}
                 tabIndex={0}
                 onKeyUp={onKeyUp} onBlur={()=>{setActive(false)}}>
                <div className={s.main} onClick={showItems}>{selectedItem}<span className={s.triangle}></span></div>
                {active &&
                <div className={s.items}>
                    {mappedOptions}
                </div>
                }
            </div>
        </>
    )
}

export default Select
