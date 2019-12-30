import React from 'react';
import Aux from '../hoc/Aux';
import classes from './formSummary.module.scss';

const formSummary = (props) => {

    let output = [];

    props.formData.forEach(data => {
        output.push(
            <li key={data.id}>{data.question}:
                <span style={{fontWeight: 'bold'}}>{data.answer}</span>
                {data.thirdAnswer ? <div><br /> {data.secondQuestion} <span style={{fontWeight: "bold"}}>{data.thirdAnswer}</span></div> : null}
            </li>
        )
    });

    return (
        <Aux>
            <h4>Form Summary</h4>
            <ul className={classes.summary_wrap}>
                {output}
            </ul>
        </Aux>
    );
}

export default formSummary;
