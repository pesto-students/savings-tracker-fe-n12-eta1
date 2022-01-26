// component and styles
import BillboardChart from 'react-billboardjs';
import 'billboard.js/dist/billboard.css';

const LineChart =({columns}) =>{
    var to_date = new Date()//.toLocaleDateString()
    var d = new Date()
    d.setMonth(d.getMonth() - 1);
    var from_date = d//.toLocaleDateString()
    const CHART_DATA = {
        columns: columns,
        //type: 'line',
        types: {
          Expenses: "line",
          Incomes: "area-spline"
        },
        colors: {
          Expenses: "red",
          Incomes: "green"
        },
        regions: [
          {
            axis: "x",
            start: from_date,
            end: to_date,
            class: "region-1-4"
          }
        ]
      };
  return <BillboardChart data={CHART_DATA} />; 
}

export default LineChart