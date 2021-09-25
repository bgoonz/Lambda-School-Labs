import React, { PureComponent } from "react"
import styled from "styled-components"

import { media } from "../../styles/theme/mixins"

const FeaturesContainer = styled.div`
  height: 100vh;
  padding: 3% 2% 2% 2%;

  ${media.tablet`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: auto;
    padding: 10% 2%;
  `}

  ${media.phone`
    margin-bottom: 10%;
  `}
`

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 5% 0;

  h1 {
    align-self: center;
  }

  div {
    margin-top: 1rem;
  }

  ${media.tablet`
     h1 {
       font-size: 1.75rem;
       text-align: center;
     }
  `}
`

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 500px;
  width: 80%;
  margin: 0 10%;

  ${media.tablet`
    height: auto;
    grid-template-columns: 1fr;
    grid-template-rows: 350px 1fr;
    grid-gap: 5%;
    width: 90%;
    margin: 0;
  `}
`

const Img = styled.img`
  display: flex;
  flex-direction: column;
  justify-self: center;
  height: 100%;
  -webkit-filter: drop-shadow(5px 10px 15px rgba(0, 0, 0, 0.35));
  -moz-filter: drop-shadow(5px 10px 15px rgba(0, 0, 0, 0.35));
  -ms-filter: drop-shadow(5px 10px 15px rgba(0, 0, 0, 0.35));
  -o-filter: drop-shadow(5px 10px 15px rgba(0, 0, 0, 0.35));
  filter: drop-shadow(5px 10px 15px rgba(0, 0, 0, 0.35));

  ${media.tablet`
    -webkit-filter: drop-shadow(2.5px 5px 7.5px rgba(0, 0, 0, 0.35));
    -moz-filter: drop-shadow(2.5px 5px 7.5px rgba(0, 0, 0, 0.35));
    -ms-filter: drop-shadow(2.5px 5px 7.5px rgba(0, 0, 0, 0.35));
    -o-filter: drop-shadow(2.5px 5px 7.5px rgba(0, 0, 0, 0.35));
    filter: drop-shadow(2.5px 5px 7.5px rgba(0, 0, 0, 0.35));
  `}
`

const Description = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-columns: 200px;
  grid-gap: 5%;
  padding: 5%;
  height: 100%;

  div {
    margin-top: 1rem;
    line-height: 1.25;
  }

  .accent {
    color: #f26a21;
    font-size: 35px;
  }

  .features-content {
    align-self: flex-start;
    margin-top: 0;
  }

  ${media.tablet`
    h4 {
      font-size: 1.25rem;
    }

    p {
      font-size: 0.9rem;
      margin-bottom: 0;
    }
  `}
`

class Features extends PureComponent {
  state = {
    image: "/images/features-plan.png"
  }

  handleMouseOver = ({ currentTarget: { id } }) => {
    this.setState({ image: `/images/features-${id}.png` })
  }

  render() {
    return (
      <FeaturesContainer id="features">
        <TitleContainer>
          <h1>Join our global community</h1>
        </TitleContainer>
        <Content>
          <Img src={this.state.image} />
          <Description>
            <div
              id="plan"
              onMouseEnter={this.handleMouseOver}
              className="features-content"
              src="/images/iphonelist.png"
            >
              <h4>
                Plan your trip<span className="accent">.</span>
              </h4>
              <p>
                Discover new trails and trek through the wilds with our trip
                planner.
              </p>
            </div>
            <div
              id="track"
              onMouseEnter={this.handleMouseOver}
              className="features-content"
            >
              <h4>
                Keep track<span className="accent">.</span>
              </h4>
              <p>
                Create hiking goals and track your progress over time. Share and
                compete with other hikers or mountain climbers.
              </p>
            </div>
            <div
              id="share"
              onMouseEnter={this.handleMouseOver}
              className="features-content"
            >
              <h4>
                Share your trip<span className="accent">.</span>
              </h4>
              <p>
                Connect with our growing community of climbers and hikers. Join
                a quest with members of your community or plan a trip with your
                friends.
              </p>
            </div>
            <div
              id="list"
              onMouseEnter={this.handleMouseOver}
              className="features-content"
            >
              <h4>
                Peace of mind<span className="accent">.</span>
              </h4>
              <p>
                Create waypoints, broadcast your location and alert others of
                your whereabouts — wander into the unknown with a peace of mind.
              </p>
            </div>
          </Description>
        </Content>
      </FeaturesContainer>
    )
  }
}

export default Features
