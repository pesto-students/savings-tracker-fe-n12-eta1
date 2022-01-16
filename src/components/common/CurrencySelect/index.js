import Select from 'react-select'

import {useEffect, useState} from 'react';
import axios from 'axios';

import './style.css';

const CurrencySelect = ({name = 'currency', onChange, value}) => {
    const [options, setOptions] = useState([]);
    const [selectValue, setSelectValue] = useState({label: '', value: ''});

    useEffect(() => {

        axios.get('https://openexchangerates.org/api/currencies.json').then((response) => {

            const currenciesObject = response.data;

            const optionsArray = Object.keys(currenciesObject).map(key => {
                return {label: currenciesObject[key] + ` - (${key})`, value: key}
            });
            setSelectValue({label: currenciesObject[value] + ` - (${value})`, value: value});
            setOptions(optionsArray);
        }).catch(err => {
            //todo
        });

    }, []);

    useEffect(() => {
        setSelectValue({label: options.find(option => option.value === value)?.label, value: value});
    }, [value]);


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

    function onSelect(option) {
        setSelectValue({label: option.label, value: option.value});
        if (onChange) {
            onChange({target: {value: option.value, name: name}});
        }
    }

    return <Select options={options} styles={customStyles} name={name} onChange={onSelect}
                   value={selectValue}/>
};

export default CurrencySelect;