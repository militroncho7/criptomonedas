import React from 'react';
import styled from '@emotion/styled';

const ResultadoDiv = styled.div`
    color: #FFF;
    font-family: Arial, Helvetica, sans-serif;
`;

const Infor = styled.p`
    font-size:18px;
    span {
        font-weight:bold;
    }
`;

const Precio = styled.p`
    font-size:30px;
    span {
        font-weight:bold;
    }
`;

const Cotizacion = ({resultado}) => {
    if(Object.keys(resultado).length === 0) return null;

    console.log(resultado);
    return (
        <ResultadoDiv>
            <Precio>El precios es: <span>{resultado.PRICE}</span></Precio>
            <Infor>Precio más alto del día: <span>{resultado.HIGHDAY}</span></Infor>
            <Infor>Precio más bajo del día: <span>{resultado.LOWDAY}</span></Infor>
            <Infor>Variación últimas 24 horas: <span>{resultado.CHANGEPCT24HOUR}</span></Infor>
            <Infor>Última actualización: <span>{resultado.LASTUPDATE}</span> </Infor>
        </ResultadoDiv>
    );
}
 
export default Cotizacion;