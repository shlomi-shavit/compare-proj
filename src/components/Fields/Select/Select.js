import React from 'react';
import classes from './Select.module.scss';
import Aux from '../../hoc/Aux';

const Select = (props) => {

    const horizontal = props.horizontalStyle ? classes.select_wrapper_horizontal : null;
    return (
        <ul className={`${classes.select_wrapper} ${horizontal}`}>
            {props.formData.answerOption.map((answer, index) => (

                    <li
                        key={index}
                        className={
                            answer === props.value ||
                            answer.question === props.value
                                ? classes.highlight : null}
                        onClick={() => props.getAnswer(answer, props.id,null)}>

                        {typeof answer === 'object' ?
                            <Aux>
                                {answer.question}

                                <div key='radio-1' className={classes.select_content}>

                                    <span className={classes.select_content_title}>{props.secondQuestion}</span>

                                    <div className={classes.radio_wrapper}>
                                        {props.formData.thirdQuestion.map((subAnswer, index) => {

                                            return <div className={classes.radio_btn} key={index}>
                                                <input
                                                    name={props.id}
                                                    type='radio'
                                                    value={props.secondAnswer}
                                                    defaultChecked={props.formData.thirdQuestion[index] === props.secondAnswer}
                                                    onClick={() => props.getAnswer(answer, props.id, subAnswer)}/>
                                                <div className={classes.radio_cover}>{subAnswer}</div>
                                            </div>

                                        })}
                                    </div>
                                </div>
                            </Aux>

                            :
                            answer
                        }
                    </li>
            ))}
        </ul>
    )
}

export default Select;
