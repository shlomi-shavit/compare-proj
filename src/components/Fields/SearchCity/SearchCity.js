import React, {Component} from 'react';
import classes from './SearchCity.module.scss';
import citiesJson from '../../../json/city_list.json';

class SearchCity extends Component {

    state = {
        citiesList: [],
        searhValue: this.props.value,
    }

    onTextChanged = (event) => {
        const value = event.target.value;
        let citiesList = [];
        let citiesArray = [];

        if(value.length > 1){
            const regex = new RegExp(`${value}`, `i`);
            citiesJson.map(citi => citiesArray.push(citi.name, citi.engName));//push hebrew & eng names
            citiesList = citiesArray.sort().filter(citi => regex.test(citi));
        }

        this.setState({
            citiesList: citiesList,
            searhValue: value,
        });
    }

    renderCitiesList() {
        const citiesList = this.state.citiesList;
        if (citiesList.length === 0) {
            return null;
        }
        return (
            <ul>
                {citiesList.map((citi, index) => <li key={index} onClick={() => this.citySelected(citi)}>{citi}</li>)}
            </ul>
        );
    }

    citySelected (value){
        this.props.getLocationValue(value, this.props.id);
        setTimeout(() => {
            this.setState({
                searhValue: value,
                citiesList: []
            });
        },!50)
    }


    saveCityOnBlur(){
        setTimeout(() => {
            this.setState({
                citiesList: []
            });
            this.props.getLocationValue(this.state.searhValue, this.props.id);
        }, 300)
    }

    render() {

        const searhValue = this.state.searhValue;
        return (
            <div className={classes.search_city_wrapper}>
                <input type="text"
                       className={classes.input_field}
                       onChange={this.onTextChanged}
                       onBlur={() => this.saveCityOnBlur(this)}
                       //onBlur={this.onTextChanged}
                       value={searhValue}/>
                {this.renderCitiesList()}
            </div>
        )
    }

}

export default SearchCity;