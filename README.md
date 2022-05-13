# Workout Assistant

A web-based application analyses your video (webcam) in realtime and counts each complete full motion while you are doing exercises.

# What I've done

*I have never worked on any project relating to AI, so that my approaches might not be the best.*

### Framework

I began the project with [Tensorflow.js](https://www.tensorflow.org/js) because it is designed to run on client side. I do not need to setup a complicated server and deal with server-client stuff.

As same as other AI frameworks, I have to feed Tensorflow.js a model and data that I want to predict.


If I do not want to do everything from scratch, there're [pre-trained models](https://www.tensorflow.org/js/models) created by others. Here, Tensorflow.js is hidden, I only work with simplified API provided by each pre-trained model.

### Pre-trained model




# Next steps

# How to Run

Follow these steps:

1. Remove cache etc. `.cache`, `dist`, `node_modules`

2. Install dependencies. `yarn`

3. Run the app. `yarn watch`

4. The app runs at `localhost:1234`.

# Credit

Code base was copied from here https://github.com/tensorflow/tfjs-models/tree/master/pose-detection/demos/live_video
