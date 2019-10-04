## What are STL and GLTF/GLB file formats?

- [STL](https://en.wikipedia.org/wiki/STL_(file_format)) is for 3D printing. It cannot be textured and does not support color in DEM Net.
- [glTF](https://en.wikipedia.org/wiki/GlTF) is an open standard for 3D asset exchange. It supports Physical Base Rendering and is awesome. DEM Net uses binary-packed glTF files (.glb), where geometry and textures are encoded in a single file.

## How can I share my model?

- The best way (for now) is to upload it to [SketchFab](https://sketchfab.com), where you can setup the camera and 3D post processing effects, and share your model. See [DEM Net Elevation API gallery](https://sketchfab.com/xfischer).

## Can I get simple elevation data?

- Yes! This site is a user facing playground to use the advanced features of the API, but there is basic elevation APIs here : [api.elevationapi.com](https://api.elevationapi.com)

> This URL will give you the elevation near Notre-Dame de Paris (39 meters), using SRTM GL3 dataset :
<br/>
> [https://api.elevationapi.com/api/Elevation?lat=48.854624&lon=2.3436793&dataSet=SRTM_GL3](https://api.elevationapi.com/api/Elevation?lat=48.854624&lon=2.3436793&dataSet=SRTM_GL3)

## Is it really free?

*coming soon...*

## Is there limits in API usage ?

*coming soon...*

## Will other datasets be added in the future?

*coming soon...*

## What are the forthcoming features?

*coming soon...*

## Can I use this in my own software?

- OK for individuals or small businesses (< 100 K$ revenue)
- 100K+ companies, please support me on Patreon or make a donation, or contact me.

## Where the elevation data comes from and what is the coverage area?

DEM Net uses publicly available DEMs from [OpenTopography](https://opentopography.org/) and [NOOA](https://www.ngdc.noaa.gov/mgg/global).

* __ETOPO1__ has global coverage, including oceans. Resolution: approx 2km.
<br/>*This dataset is best for large areas and bathymetry. It offers a great simplification of elevations*.

* **ALOS World 3D (AW3D30)** dataset coverage is within approx. 82 deg. of N/S latitudes. Resolution: 30m.<br/>*This dataset has the better detail, but contains a lot of void areas with no data. In those cases, use SRTM_GL1 as a backup plan.*

* **SRTM** dataset coverage is within approx. 60 deg. of N/S latitudes. Resolution: 30m for SRTM_GL1 and 90m SRTM_GL3.<br/>*This dataset has no or very few voids. But it appears more smoothed than the ALOS World 3D.*

## Can I use another imagery service ?

It is possible if the provider is a tile ZXY provider (no WMS), is public (ie: public facing URL), and if it can be freely usable. Please contact us via contact@elevationapi.com.

## How can I see my model once downloaded ?

| File format |    OS   | Viewers                                                       |
|-------------|:-------:|---------------------------------------------------------------|
| STL, GLB    | Windows < 10 | I recommend [glTF Viewer](https://gltf-viewer.donmccurdy.com)                                          |
| STL, GLB    | Windows 10+ | Native 3D Viewer app                                          |
| STL         |  MacOS  | Native "Preview" app or space bar                                                 |
| GLB         |  MacOS/Linux  | I use [glTF Viewer](https://gltf-viewer.donmccurdy.com) |

> For STL models visualization I also like [Ultimaker Cura](https://ultimaker.com/software/ultimaker-cura), it is indeed recommended for 3D printing as well.

