import React, {useState} from 'react';
import './App.css';


function App() {
    let [counter, setCounter] = useState(0)
    let [errorCounter, setErrorCounter] = useState(false)
    let [errorInc, setErrorInc] = useState(false)
    let [errorReset, setErrorReset] = useState(true)

    const Counter = () => {
        if (counter === 0) {
            setErrorCounter(false)
            setErrorInc(false)
            setErrorReset(true)
        }
        if (counter === 5) {
            setErrorCounter(true)
            setErrorInc(true)
            setErrorReset(false)
        }
        if (counter > 0 && counter < 5) {
            setErrorCounter(false)
            setErrorInc(false)
            setErrorReset(false)
        }
    }

    const CounterInc = () => {
        if (counter > -1 && counter < 5) {
            setCounter(counter = counter + 1)
            Counter()
        } else {
            return {disabled: true}
        }
    }

    const CounterReset = () => {
        if (counter > 0) {
            setCounter(counter = 0)
            Counter()
        } else {
            return {disabled: true}
        }
    }


    return (

        <div className="App">
            <div className={errorCounter ? "CounterRed" : "Counter"}>{counter}</div>
            <Button title="inc" button={CounterInc} error={errorInc}/>
            <Button title="reset" button={CounterReset} error={errorReset}/>
        </div>
    )

}

type ButtonType = {
    title: string
    error: boolean
    button: () => void
}

const Button: React.FC<ButtonType> = ({title, button, error}) => {
    return (
        <button className={error ? title + "Error" : title} onClick={button}>{title}</button>)
}

export default App;