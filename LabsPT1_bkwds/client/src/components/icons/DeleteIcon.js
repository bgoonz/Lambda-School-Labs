import React from "react"
import PropTypes from "prop-types"

const DeleteIcon = props => {
  const { width, height } = props
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width={width}
      height={height}
      viewBox="0 0 612 612"
    >
      <g>
        <g>
          <polygon
            points="424.032,443.7 443.7,424.032 325.667,306 443.7,187.967 424.032,168.3 306,286.333 187.967,168.3 168.3,187.967
                286.333,306 168.3,424.032 187.967,443.7 306,325.667 		"
          />
          <path
            d="M612,306C612,137.004,474.995,0,306,0C137.004,0,0,137.004,0,306c0,168.995,137.004,306,306,306
                C474.995,612,612,474.995,612,306z M27.818,306C27.818,152.36,152.36,27.818,306,27.818S584.182,152.36,584.182,306
                S459.64,584.182,306,584.182S27.818,459.64,27.818,306z"
          />
        </g>
      </g>
    </svg>
  )
}

DeleteIcon.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string
}

export default DeleteIcon
