import Select from 'react-select'

import {useEffect, useState} from 'react';
import axios from 'axios';

import './style.css';

const CurrencySelect = ({name, onChange, value}) => {
    const [options, setOptions] = useState([]);
    const [selectedValue, setSelectedValue] = useState({});

    useEffect(() => {

        axios.get('https://openexchangerates.org/api/currencies.json').then((response) => {

            const currenciesObject = response.data;

            const optionsArray = Object.keys(currenciesObject).map(key => {
                return {label: currenciesObject[key], value: key}
            });

            setOptions(optionsArray);

            setSelectedValue({key: value, label: currenciesObject[value]});
        })

    }, []);

    const customStyles = {
        option: (provided, state) => {

            if (state.isFocused || state.isSelected) {

                return {
                    ...provided,
                    backgroundColor: '#e0296a',
                    color: 'white'
                }

            }
            return provided;
        },
        control: (provided, state) => {

            if (state.isFocused) {

                return {
                    ...provided,
                    borderColor: '#e0296a',
                    'boxShadow': '0 0 0 0.25rem rgba(224, 41, 106, 0.25)',
                    "&:hover": {
                        borderColor: "#e0296a"
                    }
                }
            }

            return provided;
        }

    };

    return <Select options={options} styles={customStyles} name={name} onChange={onChange}
                   value={selectedValue}/>
};

export default CurrencySelect;