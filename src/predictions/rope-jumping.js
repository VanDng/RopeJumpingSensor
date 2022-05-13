const EdgeTypes = {
    Top: 'Top',
    Bottom: 'Bottom',
}

const TrendTypes = {
    Up: 'Up',
    Down: 'Down'
}

class EdgePoint {
    constructor() {
        this.value = null;
        this.type = null;
    }
}

class TrendPoint {
    constructor() {
        this.value = null;
        this.trend = null;
    }
}

const DECIMAL_ESL = 0.02

export class RopeJumping {
    constructor() {
        this.trending = null;
        this.edgePoints = [];

        this.onEdgepointAdded = null;
        this.onEdgepointRemoved = null;
    }

    predict(keypoints) {
        var trendingChanged = true;

        var keypointValue = 0.0;
        for (const keypoint of keypoints) {
            if (keypoint.name == 'left_shoulder') {
                keypointValue = keypoint.y;//keypoint.x.toFixed(2);
                break;
            }
        }

        if (keypointValue < 0.0) {
            return;
        }

        this.edgePoints.push(keypointValue);

        var edgePointCount = this.edgePoints.length;
        var firstValueIdx = edgePointCount -1;
        var secondValueIdx = edgePointCount -2;
        var thridValueIdx = edgePointCount -3;

        if (edgePointCount < 3) {
            return;
        }

        var firstValue = this.edgePoints[firstValueIdx];
        var secondValue = this.edgePoints[secondValueIdx];
        var thridValue = this.edgePoints[thridValueIdx];

        if ((firstValue > secondValue && secondValue > thridValue) ||
            (firstValue < secondValue && secondValue < thridValue)) {
            this.edgePoints.splice(secondValueIdx, 1);
            trendingChanged = false;
        }

        if (trendingChanged) {
            this.onEdgepointAdded?.(secondValue);
        }
    }
}