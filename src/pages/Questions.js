import React, { useState } from 'react';
import Layout from '../components/Layout';

export default function Questions() {
    const questions = [
        {
            number: 1,
            question: '¿Cuál es el resultado de `typeof NaN` en JavaScript?',
            type: 'radio',
            options: ['number', 'undefined', 'object', 'NaN'],
            correctAnswer: 'number'
        },
        {
            number: 2,
            question: '¿Qué método se utiliza para convertir un JSON a un objeto JavaScript?',
            type: 'radio',
            options: ['JSON.parse()', 'JSON.stringify()', 'JSON.object()', 'JSON.toObject()'],
            correctAnswer: 'JSON.parse()'
        },
        {
            number: 3,
            question: '¿Cuál es el valor de `undefined` en JavaScript?',
            type: 'radio',
            options: ['Una variable que no ha sido asignada', 'Un error de referencia', 'Un objeto nulo', 'Una función sin valor de retorno'],
            correctAnswer: 'Una variable que no ha sido asignada'
        },
        {
            number: 4,
            question: '¿Cuál es el propósito del método `bind` en JavaScript?',
            type: 'radio',
            options: ['Crear una copia de una función', 'Asociar una función a un contexto específico', 'Llamar a una función con un contexto específico', 'Ejecutar una función inmediatamente'],
            correctAnswer: 'Asociar una función a un contexto específico'
        },
        {
            number: 5,
            question: '¿Qué método se utiliza para agregar uno o más elementos al final de un array?',
            type: 'radio',
            options: ['push()', 'pop()', 'shift()', 'unshift()'],
            correctAnswer: 'push()'
        },
        {
            number: 6,
            question: '¿Cuál es el propósito de `use strict` en JavaScript?',
            type: 'radio',
            options: ['Hacer que el código se ejecute en modo estricto', 'Hacer que el código se ejecute más rápido', 'Desactivar errores en el código', 'Permitir el uso de variables globales'],
            correctAnswer: 'Hacer que el código se ejecute en modo estricto'
        },
        {
            number: 7,
            question: '¿Cuál es el resultado de `2 + "2"` en JavaScript?',
            type: 'radio',
            options: ['4', 'NaN', '"22"', 'undefined'],
            correctAnswer: '"22"'
        }
    ];

    const content = [
        {
            id: 1,
            nombre: 'Código Js'
        },
        {
            id: 2,
            nombre: 'HTML'
        },
        {
            id: 3,
            nombre: 'CSS'
        },
        {
            id: 4,
            nombre: 'React'
        },
        {
            id: 5,
            nombre: 'Bootstrap'
        },
        {
            id: 6,
            nombre: 'Tailwind CSS'
        },
        {
            id: 7,
            nombre: 'Node.js'
        }
    ];

    const [responses, setResponses] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [results, setResults] = useState([]);
    const [order, setOrder] = useState([]);
    const [ordenFinal, setOrdenFinal] = useState([]);
    const[objetFinal, setObjectFinal] = useState([]);
    
    const handleChange = (index, value) => {
        setResponses(prev => ({ ...prev, [index]: value }));
    };

    const handleSubmit = () => {
        const results = questions.map((question, index) => {
            const userAnswer = responses[index] || '';
            const correct = userAnswer === question.correctAnswer;
            return {
                question: question.question,
                correct
            };
        });

        setResults(results);
        determineOrder(results);
        setShowModal(true);
    };

    const determineOrder = (results) => {
        const veryGood = [];
        const good = [];
        const bad = [];

        results.forEach((result, index) => {
            if (result.correct) {
                veryGood.push(index + 1);
            } else {
                bad.push(index + 1);
            }
        });

        const order = [
            ...veryGood,
            ...bad,
            ...good
        ];

        setOrder(order);
        generateOrdenFinal(order);
    };

    const generateOrdenFinal = (order) => {
        const ordenFinal = order.map(num => {
            const contentItem = content.find(item => item.id === num);
            return contentItem;
        });

        setOrdenFinal(ordenFinal);
        setObjectFinal(ordenFinal);
        console.log("orden final ",objetFinal);
    };

    return (
        <Layout>
        <div className='flex justify-center items-start max-w-screen p-4'>
            <div className='w-full max-w-md'>
                <h1 className='text-center mb-4 text-xl font-semibold'>JavaScript Quiz</h1>
                {questions.map((question, index) => (
                    <div key={index} className='mb-6'>
                        <h2 className='text-lg font-medium mb-2'>{index + 1}. {question.question}</h2>
                        {question.options.map((option, idx) => (
                            <div key={idx} className='flex items-center mb-2'>
                                <input
                                    type="radio"
                                    id={`radio-${index}-${idx}`}
                                    name={`radio-${index}`}
                                    className="mr-2"
                                    onChange={() => handleChange(index, option)}
                                />
                                <label htmlFor={`radio-${index}-${idx}`} className="text-sm text-gray-900 dark:text-white">{option}</label>
                            </div>
                        ))}
                    </div>
                ))}
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
            {showModal && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                    <div className='bg-white p-6 rounded-lg'>
                        <h2 className='text-xl font-semibold mb-4'>Results</h2>
                        <ul>
                            {results.map((result, index) => (
                                <li key={index} className={`mb-2 ${result.correct ? 'text-green-500' : 'text-red-500'}`}>
                                    {index + 1}. {result.question} - {result.correct ? 'Correct' : 'Incorrect'}
                                </li>
                            ))}
                        </ul>
                        <h3 className='text-lg font-semibold mb-4'>Orden</h3>
                        <ul>
                            {ordenFinal.map((item, index) => (
                                <li key={index} className="mb-2">
                                    {index + 1}. {item.nombre} (ID: {item.id})
                                </li>
                            ))}
                        </ul>
                        <button
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
                            onClick={() => setShowModal(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
        </Layout>
    );
}
