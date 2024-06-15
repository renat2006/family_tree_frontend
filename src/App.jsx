import React, { useState, useEffect } from 'react';
import Header from "./components/Header/Header.jsx";
import Tree from "./components/MainTree/MainTree.jsx";
import {Button} from "baseui/button";
import {ArrowDown} from "baseui/icon";

const App = () => {
    const [nodes, setNodes] = useState([]); // Состояние для хранения данных
    const [loading, setLoading] = useState(true); // Состояние для отслеживания процесса загрузки
    const [error, setError] = useState(null); // Состояние для отслеживания ошибок

    useEffect(() => {
        // Выполняем запрос к бэкенду после монтирования компонента
        fetch('/get_data')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched data:', data); // Вывод данных в консоль
                setNodes(data);
                setLoading(false); // Завершаем процесс загрузки
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError(error);
                setLoading(false); // Завершаем процесс загрузки даже в случае ошибки
            });
    }, []); // Пустой массив зависимостей означает, что эффект выполнится только один раз после монтирования

    const handleSaveNodes = (updatedNodes) => {
        setNodes(updatedNodes);
    };

    const saveDataToServer = () => {
        // Отправляем обновленные данные обратно на сервер
        fetch('/update_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nodes),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Updated data saved successfully:', data);
            })
            .catch(error => {
                console.error('Error updating data:', error);
            });
    };

    if (loading) {
        return <div>Loading...</div>; // Отображаем индикатор загрузки
    }

    if (error) {
        return <div>Error loading data: {error.message}</div>; // Отображаем сообщение об ошибке, если данные не были загружены
    }

    return (
        <div style={{ height: '100%' }}>
            <Header />
            <Tree nodes={nodes} onSaveNodes={handleSaveNodes} />
            <div style={{
                display: "flex", justifyContent: "center"
            }}><Button onClick={saveDataToServer} startEnhancer={() => <ArrowDown size={24} title=""/>}>
                Сохранить древо
            </Button></div>
        </div>
    );
};

export default App;
