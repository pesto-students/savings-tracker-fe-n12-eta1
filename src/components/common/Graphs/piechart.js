import {useState, useEffect} from 'react'
import "billboard.js/dist/theme/insight.css";
import bb, {pie} from "billboard.js";
import './index.css';


const PieChart = ({columns}) => {
    const [chart, setChart] = useState('')
    useEffect(() => {
        getData()
    }, []);

    const getData = () => {
        setChart(bb.generate({
                                 data: {
                                     columns: columns,
                                     type: pie(),
                                     onclick: function (d, i) {
                                     },
                                     onover: function (d, i) {
                                     },
                                     onout: function (d, i) {
                                     }
                                 },
                                 bindto: "#pieChart"
                             }))
    }

    setTimeout(function () {
        chart.load({
                       columns: columns
                   });
    }, 1500);

    setTimeout(function () {
        chart.unload({ids: "data1"});
        chart.unload({ids: "data2"});
    }, 2500);

    return (
        <>
            <div id="pieChart"></div>

        </>
    );
};

export default PieChart
