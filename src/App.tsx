import React, {ChangeEvent, useState} from "react";
import "./App.css";
import Button from "./Button";
import {Value} from "./Value";

let errorMessages = "Incorrect value!";
let flag = true;
let flagSet = false;

function App() {
    let [minValue, setMinValue] = useState(Number(localStorage.getItem("min")))
    let [maxValue, setMaxValue] = useState(Number(localStorage.getItem("max")))
    let [counter, setCounter] = useState(Number(localStorage.getItem("counter")))
    let [errorCounter, setErrorCounter] = useState(false)
    let [error, setError] = useState(true)
    let [errorSet, setErrorSet] = useState(true)
    let [errorInc, setErrorInc] = useState(false)
    let [errorReset, setErrorReset] = useState(true)
    let [newMin, setNewMin] = useState(Number(localStorage.getItem("min")))
    let [newMax, setNewMax] = useState(Number(localStorage.getItem("max")))

    const ErrorSet = () => {
        if (newMin > -1 && newMin < newMax && counter !== maxValue){
            setErrorCounter(false)
        }
        else setErrorCounter(true)
    }

    const CounterError = () => {
        if (counter === minValue) {
            setErrorCounter(false)
            setErrorInc(false)
            setErrorReset(true)
        }
        if (counter === maxValue) {
            setErrorCounter(true)
            setErrorInc(true)
            setErrorReset(false)
        }
        if (counter > minValue && counter < maxValue) {
            setErrorCounter(false)
            setErrorInc(false)
            setErrorReset(false)
        }
    }

    const CounterMax = (e: ChangeEvent<HTMLInputElement>) => {
        flagSet=true
        flag = false
        setErrorInc(true)
        setErrorReset(true)
        newMax = Number(e.currentTarget.value)
        setNewMax(Number(e.currentTarget.value))
        setError(false)
        // setErrorSet(false)
        ErrorSet()
        if (newMin > -1 && newMin < newMax) {
            setErrorCounter(false)
            setErrorSet(false)
            errorMessages = "enter values and press 'set'"
        } else {
            setErrorCounter(true)
            setErrorSet(true)
            errorMessages = "Incorrect value!"
        }
    }

    const CounterMin = (e: ChangeEvent<HTMLInputElement>) => {
        flagSet=true
        flag = false
        setErrorInc(true)
        setErrorReset(true)
        newMin = Number(e.currentTarget.value)
        setNewMin(Number(e.currentTarget.value))
        setError(false)
        // setErrorSet(false)
        ErrorSet()
        if (newMin > -1 && newMin < newMax) {
            setErrorCounter(false)
            setErrorSet(false)
            errorMessages = "enter values and press 'set'"
        } else {
            setErrorCounter(true)
            setErrorSet(true)
            errorMessages = "Incorrect value!"
        }
    }

    const CounterSet = () => {
        if (flagSet === false)
            return;
        ErrorSet()
        if (newMin > -1 && newMin < newMax) {
            setMaxValue(newMax);
            setMinValue(newMin);
            setCounter(newMin);
            localStorage.setItem("min", newMin.toString())
            localStorage.setItem("max", newMax.toString())
            localStorage.setItem("counter", newMin.toString())
            errorMessages = "Incorrect value!"
            setError(true)
            setErrorInc(false)
            setErrorReset(true)
            flag = true
            setErrorSet(true)
            setErrorCounter(false)

        } else {
            return {disabled: true}
            setErrorCounter(true)
        }
    }

    const CounterInc = () => {
        if (flag === false)
            return;
        ErrorSet()
        if (counter > minValue - 1 && counter < maxValue) {

            setCounter(counter = counter + 1)
            CounterError()
        } else {
            return {disabled: true}
        }
    }

    const CounterReset = () => {
        if (flag === false)
            return;
        ErrorSet()
        if (counter > minValue) {
            setCounter(counter = minValue)
            CounterError()
        } else {
            return {disabled: true}
        }
    }

    return (
        <div className="App">
            <div>
                <span className="Value">max value:
                    <input type="number" id="max" value={newMax} onChange={CounterMax}/>
                </span>
                <span className="Value">start value:
                    <input type="number" id = "min" value={newMin} onChange={CounterMin}/>
                </span>
            </div>
            <Value stile={errorCounter ? "CounterRed" : "Counter"} title={error ? counter : errorMessages} />

            <Button title="set" button={CounterSet} error={errorSet}/>
            <Button title="inc" button={CounterInc} error={errorInc}/>
            <Button title="reset" button={CounterReset} error={errorReset}/>
        </div>
    )
}

export default App;



