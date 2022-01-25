// component and styles
import BillboardChart from 'react-billboardjs';
import 'billboard.js/dist/billboard.css';

const LineChart =({columns}) =>{
    const CHART_DATA = {
        columns: columns,
        type: 'line',
      };
  return <BillboardChart data={CHART_DATA} />; 
}

export default LineChart