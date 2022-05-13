import * as posedetection from '@tensorflow-models/pose-detection';

// Reference
// https://developers.google.com/chart/interactive/docs/gallery/linechart

export class KeypointChart {
    constructor() {
        this.parts = {
            "left_shoulder": "Left Shoulder",
            //"right_shoulder": "Right Shoulder",
            //"left_hip": "Left Hip",
            //"right_hip": "Right Hip"
        };

        var headerLine = [ 'Time' ];
        for (const part in this.parts) {
            //headerLine.push(this.parts[part] + " H");
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
            legend: { position: 'bottom' },
            height: 120,
            vAxis: { 
                title: "Percentage Uptime", 
                viewWindowMode:'explicit',
                viewWindow:{
                  max:100,
                  min:0
                }
            }
        };

        // draw chart on load
        this.chart = new google.visualization.LineChart(
            document.getElementById("keypoints-chart")
        );
    }

    static async setupKeypointChart() {
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

        var chart = new KeypointChart();
        return chart;
    }

    drawKeypoints(keypoints) {
        var isValid = true;
        var newData = [];

        newData.push(this.dataCount++);

        for(const partName in this.parts) {
            isValid = false;

            for(const keypoint of keypoints) {
                if (keypoint.name == partName) {
                    //newData.push(keypoint.x * 100.0);
                    newData.push(keypoint.y * 100.0);

                    isValid = true;
                    break;
                }
            }

            if (!isValid) {
                break;
            }
        }

        if (isValid) {
            if (this.data.getNumberOfRows() > 100)
            {
                this.data.removeRow(0);
            }

            this.data.addRow(newData);
            this.chart.draw(this.data, this.options);
        }
    }
}

