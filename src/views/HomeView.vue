<script>
import { Map, View } from 'ol';
import OSM from 'ol/source/OSM';
// import XYZ from 'ol/source/XYZ';
import TileLayer from 'ol/layer/Tile';
import ImageLayer from 'ol/layer/Image';
import VectorLayer from 'ol/layer/Vector';
import VectorTileLayer from 'ol/layer/VectorTile';

// import Click from 'module:ol/events/condition.click';

// console.log(Click);

import TileWMS from 'ol/source/TileWMS';

export default {
  data() {
    return {
      count: 0
    };
  },
  mounted() {
    const source = new OSM();
    const map = new Map({
      target: 'map',
      layers: [

        // new TileLayer({
        //   source: new TileWMS({
        //     projection: 'EPSG:4326', // here is the source projection
        //     url: 'https://ahocevar.com/geoserver/wms',
        //     params: {
        //       'LAYERS': 'ne:NE1_HR_LC_SR_W_DR',
        //     },
        //   }),
        // }),
        new TileLayer({ source }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2
      })
    });
  }
};

</script>

<template>
  <div class="home">
    <div id="map"></div>
  </div>
</template>

<style scoped>

.home {
  height: 100%;
}

#map {
  width: 100%;
  height: 100%;
  background-color: #aaa;
}
</style>
