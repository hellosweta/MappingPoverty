## Health Insurance Map Visualization

### Background

This visualization will show California Census data visualized in a choropleth map. A choropleth map is a thematic map in which different areas are shaded in relation to the variable displayed on the map.

### Functionality and MVP

- [] Users will be able to view population density by county
- [] Users will be able to also view poverty rate by county

Additionally, this project will include
- [] An about modal describing the data and collection technique used by the Census Bureau
- [] A production readme

### Wireframes

This app will consist of one screen with an about section. On entry, the user will see the population density map and the about section on the side. On the bottom, the user will be able to click additional maps.

![wireframe](images/DataViz.png)

### Architecture and Technologies

This project will be implemented with:

- Vanilla Javascript
- d3/d3-geo for map projections
- TopoJSON to encode topology (a GeoJSON extension)
- ndjson-cli to join geometry of stateshapes with the population data from the Census

### Implementation Timeline

**Day 1**: Set up all modules, get webpack up and running. Create webpack.config and package.json files if needed.
Goals for the day:
- Learn basics of d3/d3-geo to render a map on an html page
- Download and format necessary data

**Day 2**: Spend the day becoming proficient at d3

Goals for the day:
- Learn how to render population density data
- Learn how to allow for zoom

**Day 3**: Make Poverty Data map
Goals for the day:

- Allow for users to toggle between maps
- Write 'about' section

**Day 4**: Styling and cleaning up

- Make sure everything looks clean and is bug free

Bonus Features:

- Allow users to hover over data points and see data
- Display different poverty measure
- Add health insurance coverage to allow users to relate coverage and poverty  
- Add maps show population and poverty in 2010 to show change over time
- Add additional states
