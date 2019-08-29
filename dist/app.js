window.addEventListener('load', () => {

  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let degreeSection = document.querySelector('.degree-section');
  let temperatureSpan = document.querySelector('.degree-section span.unit');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = 'https://cors-anywhere.herokuapp.com/';

      const api = `${proxy}https://api.darksky.net/forecast/a19869476c96717e6d28ed358aa3a14d/${lat},${long}`;

      fetch(api).then(res => {
        return res.json();
      }).then(data => {
        const {
          temperature,
          summary,
          icon
        } = data.currently;

        // SET DOM ELEMENTS FROM API
        temperatureDegree.textContent = temperature;
        temperatureDescription.textContent = summary;
        locationTimezone.textContent = data.timezone;

        // SET ICON
        setIcons(icon, document.querySelector('.icon'));

        // FORMULA FOR Celsius
        let celsius = (temperature - 32) * (5 / 9);

        // CHANGE TEMPERATURE TO Celsius/Fahrenheit
        degreeSection.addEventListener('click', () => {
          if (temperatureSpan.textContent === 'F') {
            temperatureSpan.textContent = 'C';
            temperatureDegree.textContent = Math.floor(celsius);
          } else {
            temperatureSpan.textContent = 'F';
            temperatureDegree.textContent = temperature;
          }
        });
      });
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({
      color: "white"
    });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }

});