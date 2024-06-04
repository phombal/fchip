const calculateDistance = async (origin, destination) => {
    console.log("origin", origin);
    console.log("destination", destination);

      const service = new window.google.maps.DistanceMatrixService();
      const request = {
        origins: [origin],
        destinations: [destination],
        travelMode: window.google.maps.TravelMode.DRIVING,
        unitSystem: window.google.maps.UnitSystem.IMPERIAL,
        avoidHighways: false,
        avoidTolls: false,
      };
      const responseData = null;
      // get distance matrix response
      service.getDistanceMatrix(request).then((response) => {
        // set response data
        responseData = JSON.stringify(response, null, 2)["rows"][0]["elements"]["duration"]["text"];
        console.log("response data:", response);
      });
    return responseData;
};

export default calculateDistance;
