# RopeJumpingSensor

# How to Run a Demo

If you want to run any of the demos locally, follow these steps:

1. Go to the demo folder, e.g. `cd live_video`

2. Remove cache etc. `rm -rf .cache dist node_modules`

3. Build dependency. `yarn build-dep`

4. Install dependencies. `yarn`

5. Run the demo. `yarn watch`

6. The demo runs at `localhost:1234`. (Remember to provide URL model parameter e. g. `localhost:1234/?model=movenet`)

# Creadit

Code base was copied from here https://github.com/tensorflow/tfjs-models/tree/master/pose-detection/demos/live_video