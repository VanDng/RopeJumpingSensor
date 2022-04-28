import * as posedetection from '@tensorflow-models/pose-detection';

export class PoseChart {
    constructor() {
        this.parts = {
            "left_hip": "Left Hip",
            "right_hip": "Right Hip"
        };

        var headerLine = [ 'Time' ];
        for (const part in this.parts) {
            headerLine.push(this.parts[part] + " H");
            headerLine.push(this.parts[part] + " V");
        }

        var sampleLine = [];
        for (const header in headerLine) {
            sampleLine.push(0);
        }

        this.dataCount = 1;
        this.data = google.visualization.arrayToDataTable([
            headerLine,
            sampleLine
        ]);

        // create options object with titles, colors, etc.
        this.options = {
            title: "",
            // hAxis: {
            //     title: "Time"
            // },
            // vAxis: {
            //     title: "Usage"
            // },
            legend: { position: 'bottom' }
        };

        // draw chart on load
        this.chart = new google.visualization.LineChart(
            document.getElementById("pose-chart")
        );
    }

    static async setupPoseChart() {
        // load current chart package
        google.charts.load("current", {
            packages: ["corechart", "line"]
        });

        var chartLoader = new Promise(resolve => {
            // set callback function when api loaded
            google.charts.setOnLoadCallback(() => {
                resolve();
            });
        });
        await chartLoader;

        var chart = new PoseChart();
        return chart;
    }

    drawPose(keypoints, imageSize) {
         var normalizedKeypoints = posedetection.calculators.keypointsToNormalizedKeypoints(keypoints, imageSize);

        var isValid = true;
        var newData = [];

        newData.push(this.dataCount++);

        for(const partName in this.parts) {
            isValid = false;

            for(const keypoint of normalizedKeypoints) {
                if (keypoint.name == partName) {
                    newData.push(keypoint.x * 10.0);
                    newData.push(keypoint.y * 10.0);

                    isValid = true;
                    break;
                }
            }

            if (!isValid) {
                break;
            }
        }

        if (isValid) {
            this.data.addRow(newData);
            this.chart.draw(this.data, this.options);
        }
    }
}

