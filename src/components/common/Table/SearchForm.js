import Button from "../Button/index";
import {SearchIcon} from "@heroicons/react/solid/esm";

const SearchForm = ({onKeyUp}) => {
    return <form className="row justify-content-start">
        <div className="col-5">
            <label className="visually-hidden">Search</label>
            <div className="input-group">
                <input autoComplete="off" onKeyUp={(e) => onKeyUp(e.target.value.trim())} name="search" type="text"
                       className="form-control"
                       placeholder="Search"/>
            </div>
        </div>
        <div className="col-2">
            <Button type="reset" text="Clear" onClick={() => onKeyUp('')}/>
        </div>
    </form>
};

export default SearchForm;