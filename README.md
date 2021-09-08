# Pharos Coding Exercise

## Approach
- Data is in a flat structure, converted to tree structure for navigation menu
- Used recursion for navigation structure with List component to handle hide / collapse capabilities 
- Created navigation filter based on business capability title
- Created spend filter based on user selection with min / max values taken from original data set
- Folder structure for components which includes styling (Used apropdite as used to this) + test files 
- Folder structure for utils, shared resources such as types

## Improvements
- Pagination for performance, rendering large data sets at once could hurt load times, even on re-render 
- Improve granularity of components e.g. split App into rendering sub components and manage state outside of App.tsx
- Custom component for Slider or Wrapper component to have more control, easier to test, minimize risk of inheriting errors
- Error boundaries to display a 'something went wrong' page if rendering phase fails 
- Log to dashboard system e.g. New relic / Kibana etc 
- Improve Recursive types, and keys for better reconciliation  

