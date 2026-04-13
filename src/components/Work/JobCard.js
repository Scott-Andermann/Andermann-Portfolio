import React from 'react';
import yamaha from '../../images/webp/yamaha.webp'
import husqvarna from '../../images/webp/husqvarna.webp';
import wessol from '../../images/webp/flowzone.webp';
import webstaurant from '../../images/webp/webstaurant.webp';
import styled from 'styled-components';
import * as colors from '../colors';

const CardContainer = styled.div`
position: relative;
height: 350px;
display: flex;
margin-bottom: 3rem;
flex-direction: ${props => props.alignment};
@media (max-width: 900px) {
    justify-content: center;
}
`

const JobDescriptor = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
padding-bottom: 0;
padding-top: 0;
line-height: 1.25;
z-index: 1000;
padding-left: ${props => props.leftPad};
padding-right: ${props => props.rightPad};
@media (max-width: 900px) {
    width: 450px;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    padding-left: 2rem;
    padding-right: 2rem;
}
`

const JobImage = styled.img`
height: 350px;
width: 450px;
border-radius: 3px;
@media (max-width: 900px) {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    opacity: .25;
    width: 450px;
}
@media (max-width: 450px) {
    width: 100%;
}
`

const LinkButton = styled.button`
height: 40px;
width: 150px;
border: none;
background-color: ${colors.accentColor1}bf;
border-radius: 20px;
color: white;
font-weight: 500;
font-size: 1.2rem;
cursor: pointer;
`

const JobTitle = styled.span`
font-size: 1.17rem;
color: ${colors.accentColor1};
white-space: nowrap;
`

const JobCard = ({job}) => {

    const src = () => {
        switch (job.company) {
            case 'YAMAHA':
                return yamaha;
            case 'WESSOL, LLC':
                return wessol;
            case 'HUSQVARNA':
                return husqvarna;
            case 'WEBSTAURANT':
                return webstaurant;
            default:
                return <></>
        }
    }

    return (
        <CardContainer alignment={job.id % 2 !== 0 ? 'row' : 'row-reverse'}>
            <JobImage src={src()} alt='work image'/>
            <JobDescriptor leftPad={job.id % 2 !== 0 ? '2rem' : 0} rightPad={job.id % 2 !== 0 ? 0 : '2rem'}>
                <h2>{job.company} - <JobTitle>{job.title}</JobTitle></h2>
                {/* <h4>{job.title}</h4> */}
                <p style={{opacity: 0.6}}>{job.duration}</p>
                <ul style={{paddingInlineStart: '40px', opacity: 0.6}}>
                    {job.actions.length > 0 && job.actions.map((action, index) => <li key={index}>{action}</li>)}
                </ul>
                <LinkButton onClick={() => window.open(job.website)}>Learn More</LinkButton>
            </JobDescriptor>

        </CardContainer>
    )
}

export default JobCard;