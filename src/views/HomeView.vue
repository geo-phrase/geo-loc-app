<script>
import { Map, View } from 'ol';
import OSM from 'ol/source/OSM';
// import XYZ from 'ol/source/XYZ';
import TileLayer from 'ol/layer/Tile';
import ImageLayer from 'ol/layer/Image';
import VectorLayer from 'ol/layer/Vector';
import VectorTileLayer from 'ol/layer/VectorTile';
import { fromLonLat, toLonLat } from 'ol/proj';
// import Draw from 'ol/interaction/Draw';
// import Snap from 'ol/interaction/Snap';

import TileWMS from 'ol/source/TileWMS';

import { Fill, Icon } from 'ol/style';

import { AnimateTo } from '@/utils/utils';

export default {
  data() {
    console.log(this.$route.params);
    return {
      search: '',
    };
  },
  watch: {
    search(val) {
      this.$router.push({ name: 'location', params: { location: val } });
    }
  },
  mounted() {
    const washingtonLonLat = [-77.036667, 38.895];
    const source = new OSM();

    const layer = new TileLayer({
      source,
    });

    const map = new Map({
      target: 'map',
      layers: [layer],
      view: new View({
        center: fromLonLat(washingtonLonLat),
        zoom: 12
      }),
      controls: [],
    });

    const animateTo = AnimateTo(map);

    // map.on('moveend', event => {
    //   const view = map.getView();
    //   const newZoom = view.getZoom();
    //   // console.log(view.getState());
    //   // console.log(view.getResolutions());
    //   const [lon, lat] = toLonLat(view.getCenter());
    //   console.log(`${lat}, ${lon}`);
    //   // view.setCenter([x+Math.random()-0.5, y+Math.random()-0.5]);
    // });

    map.on('click', function (evt) {
      const view = map.getView();
      animateTo(evt.coordinate);
    });
  }
};

</script>

<template>
  <div class="home">
    <div id="map"></div>
    <div class="interface">
      <input
        class="search"
        type="search"
        placeholder="Search..."
        v-model="search"
        />
      {{ $route.params }}
    </div>
  </div>
</template>

<style scoped lang="scss">

.home {
  height: 100%;
}

#map {
  width: 100%;
  height: 100%;
  background-color: #aaa;
}

.interface {
  position: absolute;
  top: 0;
  width:  100%;
  // height:  100%;
  pointer-events: none;
  font-size: 2em;

  $searchMargin: 10px;

  input {
    color: #444;
    pointer-events: auto;
    background-color: rgba(255, 255, 255, 0.5);
    width: calc(100% - $searchMargin * 2);
    margin: $searchMargin;
    padding: 10px;
    border: 1px solid #999;
    border-radius: 10px;
    outline: none;
  }
}


</style>
