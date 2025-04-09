import * as React from "react";
import DataTable from "./DataTable"; 
import Tabs from "./tabs";
import { useState } from "react";

// const demoTheme = extendTheme({
//   colorSchemes: { light: true, dark: true },
//   colorSchemeSelector: "class",
//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 600,
//       md: 600,
//       lg: 1200,
//       xl: 1536,
//     },
//   },
// });

// function useDemoRouter(initialPath) {
//   const [pathname, setPathname] = React.useState(initialPath);

//   const router = React.useMemo(() => {
//     return {
//       pathname,
//       searchParams: new URLSearchParams(),
//       navigate: (path) => setPathname(String(path)),
//     };
//   }, [pathname]);

//   return router;
// }

// const Skeleton = styled("div")(({ theme, height }) => ({
//   backgroundColor: theme.palette.action.hover,
//   borderRadius: theme.shape.borderRadius,
//   height,
//   content: '" "',
// }));

export default function PropertyManagement(props) {
  // const { window } = props;

  // const router = useDemoRouter("dashboard");

  const [property, setProperty] = useState(0);
  const [propertyName, setPropertyName] = useState("");

  return (
    <div 
    style={{padding:"21px"}}
    >
      <div
        className="headerDiv"
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h3 style={{margin:"10px",marginBottom:"0"}}>PROPERTY MANAGEMENT</h3>
        {propertyName === "" ? (
          ""
        ) : (
          <h3 style={{ color: "#106388", fontFamily: "sans-serif",margin:"10px",marginBottom:"0" }}>
            {propertyName}
          </h3>
        )}
      </div>
      {/* <br /> */}
      {property === 0 ? (
        <DataTable
          setProperty={setProperty}
          setPropertyName={setPropertyName}
        />
      ) : (
        <Tabs />
      )}
    </div>
  );
}
