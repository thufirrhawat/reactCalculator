import { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
    const [displayValue, setDisplayValue] = useState("0");
    const [expression, setExpression] = useState("");
    const [isEvaluated, setIsEvaluated] = useState(false);

    const isOperator = (char) => ['+', '-', '*', '/'].includes(char);

    const handleInput = (value) => {
        const lastChar = expression.slice(-1);
        const secondLastChar = expression.slice(-2, -1);

        if (isEvaluated && isOperator(value)) {
            setIsEvaluated(false);
            setExpression(displayValue + value);
            setDisplayValue(displayValue + value);
            return;
        }

        if (isEvaluated && !isOperator(value)) {
            setIsEvaluated(false);
            setExpression(value);
            setDisplayValue(value);
            return;
        }

        if (displayValue === "0" && value === "0") return;

        if (value === "." && displayValue.includes(".")) return;

        if (lastChar === '-' && secondLastChar === '-' && value === '-') return;

        if (isOperator(lastChar) && isOperator(value)) {
            if (value !== '-') {
                setExpression(expression.slice(0, -1) + value);
                setDisplayValue(expression.slice(0, -1) + value);
                return;
            }
        }

        if (displayValue === "0" && value !== ".") {
            setDisplayValue(value);
            setExpression(value);
        } else {
            setDisplayValue(prev => prev + value);
            setExpression(prev => prev + value);
        }
    };

    const handleEvaluate = () => {
        try {
            let result = eval(expression);
            result = parseFloat(result.toFixed(10));
            setDisplayValue(String(result));
            setExpression(String(result));
            setIsEvaluated(true);
        } catch (error) {
            setDisplayValue("Error");
            setExpression("");
        }
    };

    const handleClear = () => {
        setDisplayValue("0");
        setExpression("");
        setIsEvaluated(false);
    };

    return (
        <div className="calculator-container">
            <div className="calculator">
                <div id="display">{displayValue}</div>
                <div className="buttons-container">
                    <button id="clear" onClick={handleClear}>Clear</button>
                    <button id="divide" onClick={() => handleInput("/")}>÷</button>
                    <button id="multiply" onClick={() => handleInput("*")}>×</button>
                    <button id="seven" onClick={() => handleInput("7")}>7</button>
                    <button id="eight" onClick={() => handleInput("8")}>8</button>
                    <button id="nine" onClick={() => handleInput("9")}>9</button>
                    <button id="subtract" onClick={() => handleInput("-")}>-</button>
                    <button id="four" onClick={() => handleInput("4")}>4</button>
                    <button id="five" onClick={() => handleInput("5")}>5</button>
                    <button id="six" onClick={() => handleInput("6")}>6</button>
                    <button id="add" onClick={() => handleInput("+")}>+</button>
                    <button id="one" onClick={() => handleInput("1")}>1</button>
                    <button id="two" onClick={() => handleInput("2")}>2</button>
                    <button id="three" onClick={() => handleInput("3")}>3</button>
                    <button id="decimal" onClick={() => handleInput(".")}>.</button>
                    <button id="equals" onClick={handleEvaluate}>=</button>
                    <button id="zero" onClick={() => handleInput("0")}>0</button>
                </div>
            </div>
        </div>
    );
};

export default Calculator;
