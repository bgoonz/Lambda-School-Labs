import React, { Component } from "react"
import { connect } from "react-redux"
import moment from "moment"
import PropTypes from "prop-types"
import { TripPropTypes } from "./propTypes"
import { MAPS_KEY } from "../config"
import CopyTripLinkModal from "./CopyTripLinkModal"

import TripCardLoader from "./TripCardLoader"
import { Link } from "react-router-dom"
import { toggleArchive, repeatTrip, togglePublic } from "../redux/actions/trips"
import { Button, CardButton } from "../styles/theme/styledComponents"
import ChevronSvg from "./icons/ChevronSvg"

class Card extends Component {
  handleTogglePublic = tripId => {
    this.props.togglePublic(tripId)
  }

  render() {
    const {
      archived,
      isArchivedTripRoute,
      repeatTrip,
      toggleArchive,
      trip,
      userId
    } = this.props

    return (
      <>
        <Link to={`/app/trip/${trip.id}`}>
          <div className="card-image">
            <img
              className={archived ? "grayscale" : ""}
              src={
                trip.image
                  ? `${trip.image}${MAPS_KEY}`
                  : "https://staticmapmaker.com/img/google.png"
              }
              alt="Static Map"
            />
            {archived && <div className="text-overlay">ARCHIVED</div>}
          </div>
        </Link>
        <div className="card-content">
          <h5>{trip.name}</h5>
          <div>Start: {moment(trip.start).format("LL")}</div>
          <div>End:&nbsp;&nbsp;&nbsp;{moment(trip.end).format("LL")}</div>
          <div className="card-cta">
            <Button
              className={archived ? "btn-gray" : "btn-primary"}
              onClick={() => toggleArchive(trip.id, archived, userId)}
            >
              {archived ? "Unarchive" : "Archive"}
            </Button>
            <CopyTripLinkModal
              trip={trip}
              handleTogglePublic={this.handleTogglePublic}
            />
            {isArchivedTripRoute && (
              <Button className="btn-tertiary" onClick={() => repeatTrip(trip)}>
                Repeat
              </Button>
            )}
          </div>

          <Link to={`/app/trip/${trip.id}`}>
            <CardButton>
              <ChevronSvg
                width="2rem"
                height="2rem"
                transform="rotate(-90deg)"
              />
            </CardButton>
          </Link>
        </div>
      </>
    )
  }
}

const TripCard = props => (
  <div className="card">
    {props.loading ? <TripCardLoader /> : <Card {...props} />}
  </div>
)

Card.propTypes = {
  archived: PropTypes.bool.isRequired,
  isArchivedTripRoute: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  repeatTrip: PropTypes.func.isRequired,
  toggleArchive: PropTypes.func.isRequired,
  trip: TripPropTypes,
  userId: PropTypes.string,
  togglePublic: PropTypes.func.isRequired,
  tripId: PropTypes.string
}

const mapStateToProps = ({ auth, router, trips }) => ({
  userId: auth.user.id,
  isArchivedTripRoute: router.location.pathname === "/app/trips/archived",
  loading: trips.pending
})

export default connect(
  mapStateToProps,
  { toggleArchive, repeatTrip, togglePublic }
)(TripCard)
