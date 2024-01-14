// Drawing function
export const drawHand = (predictions, ctx) =>{
    if (predictions.length > 0) {
        // Go through each prediction
        predictions.forEach(prediction => {
            // Get landmarks
            const landmarks = predictions.landmarks;

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