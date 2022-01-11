import {Watch, Oval} from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Spinner = () => {
  const style = { position: "fixed", top: "50%", left: "50%", zIndex: 999, transform: "translate(-50%, -50%)" };
  return (
    <div style={style} className="flex loader">
        <Oval arialLabel='loading' color="white" height={50} width={50}  />
    </div>
  )
}

export default Spinner;
