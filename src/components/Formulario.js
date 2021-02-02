import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import Error from './Error';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66A2FE;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326AC0;
        cursor: pointer;
    }
`;

const Formulario = ({guardarMoneda, guardarCriptomoneda}) => {
    //state del lsitado de criptomonedas
    const [ listadocripto, guardarCriptomonedas ] = useState({});
    const [ error, guardarError ] = useState(false);

    const MONEDAS = [
       { codigo: 'EUR', nombre: 'Euro' },
       { codigo: 'USD', nombre: 'Dolar de Estados Unidos' },
       { codigo: 'GBP', nombre: 'Libra Esterlina' },
       { codigo: 'MXN', nombre: 'Peso Mexicano' }
    ];

    //Utilizar useMoneda
    const [ moneda, SelectMonedas ] = useMoneda('Elige tu Moneda', '', MONEDAS);

    //Utilizar useCriptomoneda
    const [ criptomoneda, SelectCripto ] = useCriptomoneda('Elige tu Criptomoneda', '', listadocripto);

    //Ejecutar llamado a la API
    useEffect(() => {
        const ConsultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USDx';

            const resultado = await axios.get(url);

            guardarCriptomonedas(resultado.data.Data);
        }
        ConsultarAPI();
    }, []);

    //cuando el usuario hace submit
    const cotizarMoneda = e => {
        e.preventDefault();

        //Validar si ambos campos estan llenos
        if(moneda === '' || criptomoneda === '') {
            guardarError(true);
            return;
        }

        //pasar los datos al componente principal
        guardarError(false);
        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);
    }

    return (
        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje="Todos los campos son obligatorios"/> : null}

            <SelectMonedas />

            <SelectCripto />

            <Boton
                type="submit"
                value="Calcular"
            />
        </form>
    );
}
 
export default Formulario;