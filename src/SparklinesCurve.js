import PropTypes from 'prop-types';
import React from 'react';

export default class SparklinesCurve extends React.Component {

    static propTypes = {
        color: PropTypes.string,
        style: PropTypes.object
    };

    static defaultProps = {
        style: {}
    };

    render() {
        const { points, width, height, color, style, divisor = 0.5 } = this.props;
        let prev;
        const curve = (p) => {
            let res;
            if (!prev) {
                res = [p.x, p.y]
            } else {
                const len = (p.x - prev.x) * divisor;
                res = [ "C",
                    //x1
                    prev.x + len,
                    //y1
                    prev.y,
                    //x2,
                    p.x - len,
                    //y2,
                    p.y,
                    //x,
                    p.x,
                    //y
                    p.y
                ];
            }
            prev = p;
            return res;

        }
        const linePoints = points
            .map((p) => curve(p))
            .reduce((a, b) => a.concat(b));
        const closePolyPoints = [
            "L" + points[points.length - 1].x, height,
            0, height,
            0, points[0].y
        ];
        const fillPoints = linePoints.concat(closePolyPoints);

        return (
            <g>
                <path d={"M"+fillPoints.join(' ')} className="closed-path" />
                <path d={"M"+linePoints.join(' ')} className="line" />
            </g>
        )
    }
}
