# Workout Assistant

A web-based application analyses video source (eg. webcam) in realtime and counts each complete full motion of the persin in the video while they are doing exercises.

# What I've done

*I have never worked on any project relating to AI, so that my approach here is the best I can do.

### Framework

I began the project with [Tensorflow.js](https://www.tensorflow.org/js) because it is designed to run on client side. I do not need to setup a complicated server and deal with server-client stuff.

As same as other AI frameworks, I have to feed Tensorflow.js a model and data that I want to predict.

 ![Ts_overall](/doc/ts_overall.png)

If I do not want to do everything from scratch, there're [pre-trained models](https://www.tensorflow.org/js/models) created by others. Here, Tensorflow.js is hidden, I only work with simplified API provided by each pre-trained model.

 ![Ts_overall](/doc/ts_overall-pretrainedmodel.drawio.png)

### Pre-trained model

I chose the pre-trained model [Pose Dection](https://github.com/tensorflow/tfjs-models/tree/master/pose-detection). The model helps to make a prediction on each frame from a video source, each prediction returns a collection of keypoints (joints) with a corresponding confident score.

### Keypoint processing

Because the pre-trained model does not directly counts a full motion but returns keypoints, I have to process the keypoints in order to determine whether a full motion is completed.

My very first step is to eliminate unnecessary prediction results, I call it noise reducing. I think it will be helpful for further step.

 ![Ts_overall](/doc/noise_reducing.png)
 
 What's next? I dont know haha. I will get back and think more. I jot everything down here mainly for myself, so later I will understand what is going on ~

# How to Run

Follow these steps:

1. Remove cache etc. `.cache`, `dist`, `node_modules`

2. Install dependencies. `yarn`

3. Run the app. `yarn watch`

4. The app runs at `localhost:1234`.

# Code base

Code base was copied from here https://github.com/tensorflow/tfjs-models/tree/master/pose-detection/demos/live_video
