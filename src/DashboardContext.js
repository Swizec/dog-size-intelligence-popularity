import React from 'react'

const DashboardContext = React.createContext({
    highlightBreed: () => {},
    highlightedBreed: null
});

export default DashboardContext;