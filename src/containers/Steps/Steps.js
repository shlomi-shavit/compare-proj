import React from 'react';
import classes from './Steps.module.scss';
import Step from './Step';

const Steps = (props) => {

    // console.log('props.wantedMortgage:');
    // console.log(props.wantedMortgage);
    // console.log(props.allSteps);
    // console.log(props.allSteps[props.currentStep-1]);

    //props.calculateMortgage();

    let stepTopContent = [];
    let stepButtomContent = [];

    if(props.currentStep === 1){
        stepTopContent.push(
            //<div className={classes.top_step_content} key={props.currentStep}>step 1</div>
        )
    }
    else if(props.currentStep === 4){
        stepButtomContent.push(
            <div
                className={`${classes.buttom_step_content} ${classes.wanted_mortgage}`}
                key={props.currentStep}>
                <span>משכנתא מבוקשת: </span>
                <span>{props.wantedMortgage}</span>
            </div>
        )
    }

    return (
        <div className={classes.steps_wrapper}>

            {stepTopContent}

            {Object.keys(props.allSteps).map(step => (
                <Step
                    stepData={props.allSteps[step]}
                    currentStep={props.currentStep}
                    key={step}
                    getAnswer={props.getAnswer}
                />
            ))}

            {stepButtomContent}

        </div>
    )
}

export default Steps;
