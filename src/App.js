import React, { Component } from 'react';
import YouTube from 'react-youtube';
import search from 'youtube-search';

import logo from './logo.svg';
import './App.css';

import getBillboardSongs from './getBillboardSongs';

class App extends Component {
  componentDidMount() {
    getBillboardSongs('hot-100').then(items => {
      const { song, artist } = items[0];

      var opts = {
        maxResults: 10,
        key: 'AIzaSyD1J1tnUlAxa0WxO9-XY6AwsuoBc7Dso1w'
      };

      search(`${artist} ${song}`, opts, function(err, results) {
        if(err) return console.log(err);

        console.dir(results);
      });
    })
  }

  render() {
    return (
      <div className="App">
        <YouTube
          videoId="TyHvyGVs42U"
          opts={{
            height: '100%',
            width: '100%',
            playerVars: {
              autoplay: 1,
              controls: 0,
              fs: 0,
              showinfo: 0
            }
          }}
        />
      </div>
    );
  }
}

export default App;
