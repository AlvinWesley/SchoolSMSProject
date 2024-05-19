document.getElementById('captureButton').addEventListener('click', function() {
    // Check if the browser supports the getUserMedia API
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Open the camera
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                // Create a video element to display the camera stream
                var video = document.createElement('video');
                video.srcObject = stream;
                video.play();

                // Create a canvas element to capture the image
                var canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                var context = canvas.getContext('2d');

                // Capture the current frame from the video stream
                video.addEventListener('loadedmetadata', function() {
                    context.drawImage(video, 0, 0, canvas.width, canvas.height);
                    
                    // Convert the captured image to a data URL
                    var imageDataURL = canvas.toDataURL('image/png');
                    
                    // Optionally, display the captured image
                    var imageElement = document.createElement('img');
                    imageElement.src = imageDataURL;
                    document.body.appendChild(imageElement);
                    
                    // Close the camera stream
                    stream.getTracks().forEach(function(track) {
                        track.stop();
                    });
                });
            })
            .catch(function(error) {
                console.error('Error accessing camera:', error);
            });
    } else {
        console.error('getUserMedia API not supported by this browser.');
    }
});
