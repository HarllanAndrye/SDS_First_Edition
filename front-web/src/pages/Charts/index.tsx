import React, { useEffect, useState } from 'react';
import Filters from '../../components/Filters';
import { barOptions, pieOptions } from './chart-options';
import Chart from 'react-apexcharts';
import axios from 'axios';
import { buildBarSeries, getPlatformChartData, getGenderChartData } from './helpers';
import './styles.css';


const BASE_URL = "http://localhost:8080";

// Criando os tipos para o PieChart
type PieChartData = {
    labels: string[];
    series: number[];
}

type BarChartdata = {
    x: string; // Nome do jogo
    y: number; // Quantidade de votos
}

const initialPieData = {
    labels: [],
    series: []
}

/**
 * div top-related: contém o gráfico de barras, à esquerda.
 */

const Charts = () => {

    /**
     * barChartData: é a variável a ser utilizada;
     * setBarChartData: é a "função" que irá ser utilizada para atualizar a variável barChartData.
     * 
     * useState é um React Hooks
     *      Entre <> é o tipo;
     *      Entre () é o valor a ser inicializado. Neste exemplo o componente irá iniciar com um array vazio.
     */
    const [barChartData, setBarChartData] = useState<BarChartdata[]>([]);

    const [platformData, setPlatformData] = useState<PieChartData>(initialPieData);
    const [genreData, setGenreData] = useState<PieChartData>(initialPieData);

    // O que está dentro do "useEffect" será executado assim que o componente "Charts" carregar.
    useEffect(() => {
        // Função assíncrona
        async function getData() {
            // await: faz com que a aplicação espere a execução (da linha que ele está) terminar para continuar o fluxo (ir para próxima linha).
            const recordsResponse = await axios.get(`${BASE_URL}/records`);
            const gamesResponse = await axios.get(`${BASE_URL}/games`);

            const barData =  buildBarSeries(gamesResponse.data, recordsResponse.data.content);
            setBarChartData(barData);

            const platformChartData = getPlatformChartData(recordsResponse.data.content);
            setPlatformData(platformChartData);

            const genreChartData = getGenderChartData(recordsResponse.data.content);
            setGenreData(genreChartData);
        }

        getData();
    }, []);

    return (
        <div className="page-container">
            <Filters link="/records" label="VER TABELA" />
            <div className="chart-container">
                <div className="top-related">
                    <h1 className="top-related-title">
                        Jogos mais Votados
                    </h1>
                    <div className="games-container">
                        <Chart
                            options={barOptions}
                            type="bar"
                            width="900"
                            height="650"
                            series={[{ data: barChartData }]}
                        />
                    </div>
                </div>
                <div className="charts">
                    <div className="platform-chart">
                        <h2 className="chart-title">Plataformas</h2>
                        <Chart
                            options={{ ...pieOptions, labels: platformData?.labels }}
                            type="donut"
                            series={platformData?.series}
                            width="350"
                        />
                    </div>
                    <div className="gender-chart">
                        <h2 className="chart-title">Gêneros</h2>
                        <Chart
                            options={{ ...pieOptions, labels: genreData?.labels }}
                            type="donut"
                            series={genreData?.series}
                            width="350"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Charts;