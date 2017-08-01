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
        const pointIndex = index || points.length;

        Math.sign = Math.sign || function(x) { return x > 0 ? 1 : -1; }

        return pointIndex < 2
            ? 0
            : Math.sign(points[pointIndex - 2].y - points[pointIndex - 1].y);
    }

    render() {
        const { index, points, width, height, size, style, spotColors } = this.props;

        const endX = index && points[index] ? points[index].x : points[points.length - 1].x;
        const endY = index && points[index] ? points[index].y : points[points.length - 1].y;

        const startSpot = <circle
                            cx={points[0].x}
                            cy={points[0].y}
                            r={size}
                            style={style} />

        const endSpot = <circle
                            cx={endX}
                            cy={endY}
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
