import styled from "styled-components";


export const Container = styled.div`
    background-color: #EBE8E1;
    width: 1200px;
    height: 100%;
    max-width: 1200px;
    overflow-x: visible;
    @media(max-width: 600px){
        overflow-x: hidden;
        width: 100%;
        height: 100%;
    }
`;

export const Heading = styled.div`
    display: flex;
    margin-bottom: 40px;
    @media (max-width: 600px){
        justify-content: space-around;
        width: 100%;
        margin-bottom: 0;
    }
`;

export const DidactHeader = styled.h1`
    font-size: 40px;
    font-family: ITCGrouch;
    margin-top: 50px;
    font-weight: 800;
    @media (max-width: 600px){
        text-align: center; 
    }
`;

export const StyledButton = styled.button`
    height: 60px;
    width: 170px;
    opacity: 1;
    border: 1px solid #242424;
    margin-left: 840px;
    margin-top: 40px;
    background-color: #EBE8E1;
    border-radius: 3px;
    font-family: Open Sans;
    fontSize: 14px;
    &:hover {
        background-color: black;
        color: #EBE8E1;
    }
    &:focus {
        outline: 0;
        }
    @media (max-width: 600px){
        margin-left: 0;
    }
`;

export const Flex = styled.div`
    display: flex;
    @media (max-width: 600px){
        flex-direction: column;
    }
`;

export const LargeFont = styled.p`
    font-size: 48px;
    font-family: Open Sans;
    text-align: left;
    font-weight: 900;
    margin: 0;
    margin-top: 30px;
    letter-spacing: -1px;
    @media (max-width: 600px){
        font-size: 40px;
        margin-left: 12%;
    }
`;

export const LargeFont1 = styled.p`
    font-size: 48px;
    font-family: Open Sans;
    text-align: left;
    font-weight: 900;
    margin: 0;
    margin-top: -10px;
    letter-spacing: -1px;
    @media (max-width: 600px){
        font-size: 40px;
        margin-left: 12%;
    }

`;

export const SmallerFont = styled.p`
    font-size: 18px;
    text-align: left;
    width: 370px;
    margin-top: 20px;
    @media (max-width: 600px){
        font-size: 16px;
        width: 85%;
        margin-left: 7.5%;
        margin-bottom: 50px;
    }
   
`;

export const StyledImg = styled.img`
    height: 466px;
    width: 545px;
    margin-left: 5%;
    @media (max-width: 600px){
        width: 310px;
        height: 270px;
        margin-bottom: 30px;
        align-self: center;
    }
`;

export const Middle = styled.div`
    width: 433px;
    margin-top: 20px;
`;


export const BlackBox = styled.div`
    background-color: black;
    height: 320px;
    width: 1150px;
    border-radius: 10px;
    margin-bottom: 150px;
    margin-top: 60px;
    @media (max-width: 600px){
        width: 95%;
        margin-left: 2.5%;
        margin-bottom: 100px;
    }
`;

export const WhiteLargeText = styled.p`
    color: white;
    font-size: 36px;
    margin-left: 60px;
    margin-top: 100px;
    margin-bottom: 0;
    font-weight: 900;
    @media (max-width: 600px){
        font-size: 26px;
        margin-left: 2%;
        margin-top: 20px;
    }
`;
export const WhiteLargeText1 = styled.p`
    color: white;
    font-size: 36px;
    margin-left: 60px;
    margin-top: 0;
    font-weight: 900;
    @media (max-width: 600px){
        font-size: 26px;
        margin-left: 2%;
    }
`;

export const StyledInput = styled.input`
    width: 370px;
    height: 60px;
    margin-top: 123px;
    margin-left: 140px;
    border-radius: 5px;
    border: none;
    @media (max-width: 600px){
        width: 80%;
        margin-left: 10%;
        margin-top: 0;
        margin-bottom: 0;
    }
`;

export const StyledBlueButton = styled.button`
    width: 170px;
    height: 60px;
    color: white;
    background-color: #386581;
    border-radius: 5px;
    margin-top: 125px;
    margin-left: 30px;
    border: 1px solid #386581;
    &:focus {
        outline: 0;
        }
    @media (max-width: 600px){
        margin-top: 20px;
        margin-left: 0;
        align-self: center;
    }
`;

export const SmallText = styled.p`
    color: white;
    margin-left: 550px;
    font-size: 18px;
    font-weight: 700;
    margin-top: -20px;
    @media (max-width: 600px){
       display: none;
    }
`;

export const SecondImg = styled.img`
    width: 1116px;
    height: 519px;
    margin-bottom: 40px;
    @media (max-width: 600px){
        width: 350px;
        height: 175px;
    }
`;

export const StyledImgCircle = styled.img`
    height: 24px;
    width: 24px;
    margin-left: 10px;
    margin-top: -18px;
    @media (max-width: 600px){
       display: none;
    }
`;

export const Warning = styled.p`
    font-size: 14px;
    color: white;
    margin-left: 48%;
    margin-top: -50px;
    width: 360px;
    margin-bottom: 40px;
    height: 20px;
    @media (max-width: 600px){
       display: none;
    }
`

export const SocialImg = styled.img`
    width: 20px;
    margin-bottom: 20px;
    margin-left: 99%;
    @media (max-width: 600px){
        margin-left: 70%;
    }
    `;