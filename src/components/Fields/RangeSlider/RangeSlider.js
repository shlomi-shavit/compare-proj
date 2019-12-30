import React from 'react';
import classes from './RangeSlider.module.scss';

const Slider =(props) => {

    const setRangeValue = (val) => {
        props.getAnswer(val.target.value, props.id)
    };

    const addCommasToNums = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const removeCommasToNums = (number) => {
        return number.toString().replace(/,/g, "");
    };
    const propsData = props.formData;

    //console.log(props);

        return (
            <div className={classes.range_slider}>

                <div className={classes.range_slider_title}>
                    <div>{propsData.question}</div>

                    <input
                        type="text"
                        className={classes.range_slider_set_price}
                        value={propsData.rangeValue}
                        onChange={val => props.getAnswer(val.target.value, props.id)}
                        onFocus={val => val.target.value = ''}
                        onBlur={val => val.target.value = propsData.rangeValue}
                    />

                </div>

                <div className={classes.range_slider_wrapper}>
                    <div className={classes.price_box}>{addCommasToNums(propsData.maxValue)}</div>

                    <input
                        className={classes.range_slider_input}
                        type="range"
                        step={propsData.stepRange}
                        min={propsData.minValue}
                        max={propsData.maxValue}
                        value={removeCommasToNums(propsData.rangeValue)}
                        onChange={(e) => setRangeValue(e)}
                    />

                    <div className={classes.price_box}>{addCommasToNums(propsData.minValue)}</div>
                </div>
            </div>
        )


}

export default Slider;
