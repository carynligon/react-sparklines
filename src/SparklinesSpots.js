import PropTypes from 'prop-types';
import React from 'react';

export default class SparklinesSpots extends React.Component {

    static propTypes = {
        index: PropTypes.number,
        size: PropTypes.number,
        style: PropTypes.object,
        spotColors: PropTypes.object
    };

    static defaultProps = {
        index: null,
        size: 2,
        spotColors: {
            '-1': 'red',
            '0': 'black',
            '1': 'green'
        }
    };

    lastDirection(points) {
        const { index } = this.props;

        Math.sign = Math.sign || function(x) { return x > 0 ? 1 : -1; }

        return index < 2
            ? 0
            : Math.sign(points[index - 2].y - points[index - 1].y);
    }

    render() {

        const { index, points, width, height, size, style, spotColors } = this.props;

        const startSpot = <circle
                            cx={points[0].x}
                            cy={points[0].y}
                            r={size}
                            style={style} />

        const endSpot = <circle
                            cx={points[index].x}
                            cy={points[index].y}
                            r={size}
                            style={style || { fill: spotColors[this.lastDirection(points)] }} />

        return (
            <g>
                {style && startSpot}
                {endSpot}
            </g>
        )
    }
}
