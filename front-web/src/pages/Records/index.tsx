import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RecordsResponse } from './types';
import { formatDate } from './helpers';
import Pagination from './Pagination';
import Filters from '../../components/Filters';
import './styles.css';


const BASE_URL = "http://localhost:8080";

/**
 * {recordsReponse?.content}
 * "?": Optional Chaining Operator, utilizado para não "quebrar" o componente caso o "content" for undefined.
 */

const Records = () => {

    const [recordsReponse, setRecordsResponse] = useState<RecordsResponse>();
    const [activePage, setActivePage] = useState(0); // Estado inicial 0, ou seja, primeira página.

    // Trata do ciclo de vida do componente
    /**
     * O que está dentro de [] é uma dependência que o "useEffect" tem.
     * [activePage]: sempre que for alterar o estado, será executado o useEffect novamente.
     */
    useEffect(() => {
        axios.get(`${BASE_URL}/records?page=${activePage}&linesPerPage=12&orderBy=moment&direction=DESC`)
            .then(reponse => setRecordsResponse(reponse.data));
    }, [activePage]);

    const handlePageChange = (index: number) => {
        setActivePage(index);
    }

    return (
        <div className="page-container">
            <Filters link="/charts" label="VER GRÁFICOS" />
            <table className="records-table" cellPadding="0" cellSpacing="0">
                <thead>
                    <tr>
                        <th>INSTANTE</th>
                        <th>NOME</th>
                        <th>IDADE</th>
                        <th>PLATAFORMA</th>
                        <th>GÊNERO</th>
                        <th>TÍTULO DO GAME</th>
                    </tr>
                </thead>
                <tbody>
                    {recordsReponse?.content.map(record => (
                        <tr key={record.id}>
                            <td>{formatDate(record.moment)}</td>
                            <td>{record.name}</td>
                            <td>{record.age}</td>
                            <td className="text-secondary">{record.gamePlatform}</td>
                            <td>{record.genreName}</td>
                            <td className="text-primary">{record.gameTitle}</td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
            <Pagination
                activePage={activePage}
                goToPage={handlePageChange}
                totalPages={recordsReponse?.totalPages}
            />
        </div>
    );
}

export default Records;