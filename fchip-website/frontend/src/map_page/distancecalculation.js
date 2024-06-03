const calculateDistance = async (origin, destination) => {
    console.log(origin)
    console.log(destination)
    const apiKey = 'AIzaSyCvA_66tIjHiQzM3K6xw-McFXlP8p-LiSQ';
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin}&destinations=${destination}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.status === 'OK') {
            const distanceText = data.rows[0].elements[0].distance.text;
            const distanceValue = data.rows[0].elements[0].distance.value;
            return { text: distanceText, value: distanceValue };
        } else {
            throw new Error(data.status);
        }
    } catch (error) {
        console.error('Error calculating distance:', error);
        return null;
    }
};

export default calculateDistance;
