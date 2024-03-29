var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image
} = React;

var iconSource='http://openweathermap.org/img/w/';

var Forecast = require('./Forecast');
var WeatherProject = React.createClass({
  getInitialState: function() {
    return {
      zip: '',
      forecast: null
    };
  },
  _handleTextChange: function(event) {
    var zip = event.nativeEvent.text;
    this.setState({zip: zip});
    fetch('http://api.openweathermap.org/data/2.5/weather?q='
    + zip + '&units=metric&appid=7dde7bb476d674e5ea93cd95e0e7e0a8')
    .then((response) => response.json())
    .then((responseJSON) => {
      this.setState({
        forecast: {
          main: responseJSON.weather[0].main,
          description: responseJSON.weather[0].description,
          icon: iconSource + responseJSON.weather[0].icon + '.png',
          temp: responseJSON.main.temp,
          city: responseJSON.name
        }
      });
    })
    .catch((error) => {
      console.warn(error);
    });
  },
  render: function() {
    var content = null;
    if (this.state.forecast !== null) {
      content = <Forecast
        main={this.state.forecast.main}
        description={this.state.forecast.description}
        temp={this.state.forecast.temp}
        city={this.state.forecast.city}
        icon={this.state.forecast.icon}/>;
    }
    return (
      <View style={styles.container}>
        <Image source={require('./brittany.png')}
          resizeMode='stretch'
          style={styles.backdrop}>
          <View style={styles.overlay}>
            <View style={styles.row}>
              <Text style={styles.mainText}>
                Current weather for
              </Text>
              <View style={styles.zipContainer}>
                <TextInput
                style={[styles.zipCode, styles.mainText]}
                returnKeyType='go'
                onSubmitEditing={this._handleTextChange}/>
              </View>
            </View>
            {content}
          </View>
        </Image>
      </View>
    );
  }
});
var baseFontSize = 16;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30
  },
  backdrop: {
    flex: 1,
    flexDirection: 'column'
  },
  overlay: {
    paddingTop: 5,
    backgroundColor: '#000000',
    opacity: 0.5,
    flexDirection: 'column',
    alignItems: 'center'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
    padding: 30
  },
  zipContainer: {
    flex: 1,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    marginLeft: 5,
    marginTop: 3
  },
  zipCode: {
    width: 100,
    height: baseFontSize,
  },
  mainText: {
    flex: 1,
    fontSize: baseFontSize,
    color: '#FFFFFF'
  }
});

module.exports = WeatherProject;
