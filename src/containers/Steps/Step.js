import React, {Component} from 'react';
import classes from './Step.module.scss';
import SearchCity from '../../components/Fields/SearchCity/SearchCity';
import Select from '../../components/Fields/Select/Select';
import RangeSlider from '../../components/Fields/RangeSlider/RangeSlider';

//import Aux from '../../components/hoc/Aux';

class Step extends Component {

    render() {

        let output = [];

        if (this.props.currentStep === this.props.stepData.step) {
            this.props.stepData.stepInfo.map((formData, index) => {

                if (formData.id === 'location') {
                    output.push(
                        <div key={index} className={`${classes.field_wrap} ${formData.className}`}>
                            <div key={index} className={classes.question}>{formData.question}</div>
                            <SearchCity
                                getLocationValue={this.props.getAnswer}
                                id={formData.id}
                                value={formData.answer}
                            />
                        </div>)
                }
                else if (formData.tag === 'input') {
                    output.push(
                        <div key={index} className={`${classes.field_wrap} ${formData.className}`}>
                            <div key={index} className={classes.question}>{formData.question}</div>
                            <input
                                className={classes.input_field}
                                type={formData.inputType}
                                min={formData.minValue ? formData.minValue : null}
                                max={formData.maxValue ? formData.maxValue : null}
                                step={formData.stepRange}
                                id={formData.id}
                                value={formData.answer}
                                onChange={(event) => this.props.getAnswer(event.target.value, formData.id)}
                            />
                        </div>)
                }
                else if (formData.tag === 'select') {
                    output.push(
                        <div key={index} className={classes.field_wrap}>
                            <div key={index} className={classes.question}>{formData.question}</div>
                            <Select
                                key={formData.id}
                                id={formData.id}
                                value={formData.answer}
                                formData={formData}
                                getAnswer={this.props.getAnswer}
                                secondQuestion={formData.secondQuestion}
                                secondAnswer={formData.secondAnswer}
                                horizontalStyle={formData.horizontalStyle}
                            />
                        </div>)
                }
                else if (formData.tag === 'slider') {
                    output.push(
                        <div key={index} className={classes.field_wrap}>
                            <RangeSlider
                                formData={formData}
                                id={formData.id}
                                key={formData.id}
                                getAnswer={this.props.getAnswer}
                            />
                        </div>)
                }

                return output;
            })
        }

        return (
            <div>
                {output}
            </div>
        )

    }
}

export default Step;