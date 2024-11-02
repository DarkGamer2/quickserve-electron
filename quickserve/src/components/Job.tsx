interface JobProps{
    jobIcon: string;
};
const Job=(props:JobProps)=>{
return(
    <div>
    <img src={props.jobIcon} alt="jobIcon" />
    </div>
)
}

export default Job;