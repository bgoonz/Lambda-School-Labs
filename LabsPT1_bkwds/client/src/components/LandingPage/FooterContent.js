import React from "react"
import styled from "styled-components"

import ButtonCTA from "./Button"

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-image: url(./images/hikerscontent2.png);
  background-size: cover;
  justify-content: center;
  height: 60vh;
  width: 100vw;
`

const BrandedContent = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: center;
  align-items: center;

  h3 {
    color: white !important;
    text-shadow: 1px 2px 5px rgba(0, 0, 0, 0.75);
  }

  a {
    color: white !important;
  }

  .accent {
    color: #f26a21 !important;
    font-weight: bold;
  }
`

const FooterContent = () => (
  <ContentContainer>
    <BrandedContent>
      <h3>
        Explore without boundaries<span className="accent">.</span>
      </h3>
      <ButtonCTA text="Join us!" to="/register" />
    </BrandedContent>
  </ContentContainer>
)

export default FooterContent
