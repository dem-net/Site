## Where the elevation data comes from and what is the coverage area?

DEM Net uses publicly available DEMs from [https://opentopography.org/](OpenTopography) and [https://www.ngdc.noaa.gov/mgg/global](NOOA)

* **ETOPO1** has global coverage, including oceans. Resolution: approx 2km. *This dataset is best for large areas and bathymetry. It offers a great simplification of elevations*.

* **ALOS World 3D (AW3D30)** dataset coverage is within approx. 82 deg. of N/S latitudes. Resolution: 30m.
*This dataset has the better detail, but contains a lot of void areas with no data. In those cases, use SRTM_GL1 as a backup plan.*

* **SRTM** dataset coverage is within approx. 60 deg. of N/S latitudes. Resolution: 30m for SRTM_GL1 and 90m SRTM_GL3. *This dataset has no or very few voids. It appears more smoothed than the ALOS World 3D.*

## Can I use another imagery service ?

It is possible if the provider is a tile ZXY provider (no WMS), is public (ie: public facing URL), and if it can be freely usable. Please contact us via contact@elevationapi.com.

## How can I see my model once downloaded ?

| File format |    OS   | Viewers                                                       |
|-------------|:-------:|---------------------------------------------------------------|
| STL, GLB    | Windows | Native 3D Viewer app                                          |
| STL         |  MacOS  | "Preview" app                                                 |
| GLB         |  MacOS  | None. I use [https://gltf-viewer.donmccurdy.com](glTF Viewer) |
| STL, GLB    | Linux   |                                                               |

For STL models I also like [https://ultimaker.com/software/ultimaker-cura](Ultimaker Cura).
