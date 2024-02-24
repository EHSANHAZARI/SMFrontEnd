import * as React from "react";

function loadError(onError) {
  console.error(`Failed ${onError.target.src} didn't load correctly`);
}

function AppScript() {
  React.useEffect(() => {
    const LoadExternalScript = () => {
      const externalScript = document.createElement("script");
      externalScript.onerror = loadError;
      externalScript.id = "external";
      externalScript.async = true;
      externalScript.type = "text/javascript";
      externalScript.setAttribute("crossorigin", "anonymous");
      document.body.appendChild(externalScript);
      externalScript.src = `../../assets/admin/js/admindashboard.js`;
    };
    LoadExternalScript();
  }, []);

  return <></>;
}

export default AppScript;