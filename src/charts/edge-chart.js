import * as posedetection from '@tensorflow-models/pose-detection';

// Reference
// https://developers.google.com/chart/interactive/docs/gallery/linechart

export class EdgeChart {
    constructor() {
        this.parts = {
            "left_hip": "-",
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
            document.getElementById("edge-chart")
        );
    }

    static async setupEdgeChart() {
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

        var chart = new EdgeChart();
        return chart;
    }

    addEdgePoint(edgePoint) {
        var newData = [];

        newData.push(this.dataCount++);
        //newData.push(keypoint.x * 100.0);
        newData.push(edgePoint * 100.0);

        if (this.data.getNumberOfRows() > 100)
        {
            this.data.removeRow(0);
        }

        this.data.addRow(newData);
        this.chart.draw(this.data, this.options);
    }
}

