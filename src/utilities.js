// Points for fingers
const fingerJoints = {
    thumb: [0,1,2,3,4],
    index: [0,5,6,7,8],
    middle: [0,9,10,11,12],
    ring: [0,13,14,15,16],
    pinky: [0,17,18,19,20]
};

// Drawing function
export const drawHand = (predictions, ctx) =>{
    if (predictions.length > 0) {
        // Go through each prediction
        predictions.forEach(prediction => {
            // Get landmarks
            const landmarks = prediction.landmarks;

            // Loop through fingers
            for (let j=0; j<Object.keys(fingerJoints).length; j++) {
                // Loop through pairs of joints
                let finger = Object.keys(fingerJoints)[j];
                for (let k=0; k<fingerJoints[finger].length -1; k++) {
                    // Get pairs of joints
                    const firstJointIndex = fingerJoints[finger][k];
                    const secondJointIndex = fingerJoints[finger][k+1];

                    // Draw path
                    ctx.beginPath();
                    ctx.moveTo(
                        landmarks[firstJointIndex][0],
                        landmarks[firstJointIndex][1],
                    );
                    ctx.lineTo(
                        landmarks[secondJointIndex][0],
                        landmarks[secondJointIndex][1],
                    )
                    ctx.strokeStyle = "crimson"
                    ctx.lineWidth = 4
                    ctx.stroke();

                }

            }

            // Loop through landmarks and draw them
            for (let i=0; i<landmarks.length; i++) {
                // Get x point
                const x = landmarks[i][0]
                // Get y point
                const y = landmarks[i][1]
                // Draw
                ctx.beginPath()
                ctx.arc(x, y, 5, 0, 3*Math.PI)

                // Set line colour
                ctx.fillStyle = "indigo";
                ctx.fill();

            }
        });
    }
}